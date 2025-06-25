'use client';

import { useState, useRef } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Progress } from './components/ui/progress'; 
import { useAuth } from '../contexts/AuthContext';
import { useAuthToken } from '../hooks/useAuthToken';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UploadResult {
  success: boolean;
  message?: string;
  fileName?: string;
  filePath?: string;
  downloadURL?: string;
  resumeId?: string;
  error?: string;
}

export default function ResumeChat() {
  const { currentUser } = useAuth();
  const { idToken, loading: tokenLoading } = useAuthToken();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [indexed, setIndexed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{
    fileName: string;
    filePath: string;
    downloadURL: string;
    resumeId: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setIndexed(false);
      setMessages([]);
      setUploadedFileInfo(null);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const uploadAndIndex = async () => {
    if (!file || !currentUser || !idToken) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData to upload the file
      const formData = new FormData();
      formData.append('file', file);

      // Upload and index the resume with authentication
      setUploadProgress(30);
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload resume');
      }

      const data: UploadResult = await response.json();
      setUploadProgress(100);
      setIndexed(true);
      
      // Store uploaded file info
      if (data.filePath && data.downloadURL && data.resumeId) {
        setUploadedFileInfo({
          fileName: data.fileName || file.name,
          filePath: data.filePath,
          downloadURL: data.downloadURL,
          resumeId: data.resumeId,
        });
      }
      
      // Add a welcome message
      setMessages([{
        id: 'welcome',
        text: data.message || `Resume "${file.name}" has been uploaded to Firebase Storage and indexed successfully! You can now ask questions about it.`,
        isUser: false,
        timestamp: new Date(),
      }]);

    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload and index resume. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || !indexed) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setSending(true);

    try {
      const response = await fetch('/api/resume-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: currentMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setFile(null);
    setIndexed(false);
    setMessages([]);
    setCurrentMessage('');
    setUploadedFileInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Show login prompt if not authenticated
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to upload and chat with your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              You need to be logged in to use the Resume Chat feature.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading while getting auth token
  if (tokenLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Chat Assistant (Firebase Storage + Context 7)</CardTitle>
          <CardDescription>
            Welcome, {currentUser.email}! Upload your resume to Firebase Storage and chat with an AI assistant using Context 7 retrieval
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!indexed ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="resume-upload" className="text-sm font-medium">
                  Upload Resume (PDF)
                </label>
                <Input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  disabled={uploading}
                />
              </div>

              {file && (
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm">
                    <strong>Selected file:</strong> {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              {uploading && (
                <div className="space-y-2">
                  <p className="text-sm">Uploading to Firebase Storage and indexing resume...</p>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  onClick={uploadAndIndex} 
                  disabled={!file || uploading || !idToken}
                  className="flex-1"
                >
                  {uploading ? 'Processing...' : 'Upload & Index Resume'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-green-600">
                  ✓ Resume uploaded to Firebase Storage and indexed successfully
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetChat}
                >
                  Upload New Resume
                </Button>
              </div>

              {uploadedFileInfo && (
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">File Information:</p>
                  <p className="text-xs text-blue-600">Name: {uploadedFileInfo.fileName}</p>
                  <p className="text-xs text-blue-600">Storage Path: {uploadedFileInfo.filePath}</p>
                  <p className="text-xs text-blue-600">Resume ID: {uploadedFileInfo.resumeId}</p>
                  <a 
                    href={uploadedFileInfo.downloadURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View in Firebase Storage
                  </a>
                </div>
              )}

              {/* Chat Messages */}
              <div className="border rounded-lg h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question about your resume..."
                  rows={2}
                  disabled={sending}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!currentMessage.trim() || sending}
                >
                  {sending ? 'Sending...' : 'Send'}
                </Button>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What are my key skills?",
                    "Summarize my work experience",
                    "What are my educational qualifications?",
                    "What projects have I worked on?"
                  ].map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMessage(question)}
                      disabled={sending}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 