'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthToken } from '@/hooks/useAuthToken';
import { ResumeDocument } from '@/lib/firestoreService';

export default function UserResumes() {
  const { currentUser } = useAuth();
  const { idToken } = useAuthToken();
  const [resumes, setResumes] = useState<ResumeDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = async () => {
    if (!idToken) return;

    try {
      setLoading(true);
      const response = await fetch('/api/user-resumes', {
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }

      const data = await response.json();
      setResumes(data.resumes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idToken) {
      fetchResumes();
    }
  }, [idToken]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'indexed':
        return 'text-green-600 bg-green-50';
      case 'uploaded':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to view your resumes
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Resumes</CardTitle>
          <CardDescription>
            Manage your uploaded resumes and their indexing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p>Loading your resumes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
              <Button onClick={fetchResumes} className="mt-2">
                Try Again
              </Button>
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No resumes uploaded yet.</p>
              <p className="text-sm text-gray-500 mt-2">
                Upload your first resume to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {resume.originalFileName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Uploaded: {formatDate(resume.uploadDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: {formatFileSize(resume.fileSize)}
                      </p>
                      {resume.documentsIndexed && (
                        <p className="text-sm text-gray-500">
                          Documents indexed: {resume.documentsIndexed}
                        </p>
                      )}
                      {resume.lastIndexed && (
                        <p className="text-sm text-gray-500">
                          Last indexed: {formatDate(resume.lastIndexed)}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          resume.status
                        )}`}
                      >
                        {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                      </span>
                      <div className="flex space-x-2">
                        <a
                          href={resume.downloadURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View
                        </a>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-gray-400">
                          ID: {resume.id}
                        </span>
                      </div>
                    </div>
                  </div>
                  {resume.error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs text-red-600">
                        <strong>Error:</strong> {resume.error}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 