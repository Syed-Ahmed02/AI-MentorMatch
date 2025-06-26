import ResumeChat from '../../components/ResumeChat';
import UserResumes from '../../components/UserResumes';
import { AuthProvider } from '../../contexts/AuthContext';

export default function TestResumePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Resume AI Assistant
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Upload your resume and chat with an AI assistant powered by Pinecone Vector Database
            </p>
            <p className="text-sm text-gray-500">
              Your resume is processed using advanced AI embeddings and stored securely in Pinecone for intelligent retrieval
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  📄 Resume Management
                </h2>
                <p className="text-gray-600 mb-4">
                  View and manage your uploaded resumes. Track indexing status and access your files.
                </p>
                <UserResumes />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  💬 AI Chat Assistant
                </h2>
                <p className="text-gray-600 mb-4">
                  Upload a resume and ask questions about your experience, skills, and qualifications.
                </p>
                <ResumeChat />
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🚀 How it works
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
                  <p>Upload your PDF resume</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
                  <p>AI processes and indexes content</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
                  <p>Chat with your resume data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
} 