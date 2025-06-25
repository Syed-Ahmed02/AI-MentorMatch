import ResumeChat from '../../components/ResumeChat';
import UserResumes from '../../components/UserResumes';
import { AuthProvider } from '../../contexts/AuthContext';

export default function TestResumePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Resume Management System
            </h1>
            <p className="text-gray-600">
              Upload, manage, and chat with your resumes using Firebase Storage, Authentication, and Context 7 retrieval
            </p>
          </div>
          
          <div className="space-y-8">
            <UserResumes />
            <ResumeChat />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
} 