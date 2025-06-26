import InterviewHeader from '@/src/components/interviews/InterviewHeader'
import InterviewSidebar from '@/src/components/interviews/InterviewSidebar'
import InterviewHistory from '@/src/components/interviews/InterviewHistory'
import StartNewInterview from '@/src/components/interviews/StartNewInterview'

export default function InterviewsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <InterviewHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <InterviewSidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Interview Practice
              </h1>
              <p className="text-slate-600">
                Practice with AI mentors and improve your interview skills
              </p>
            </div>

            {/* Start New Interview Section */}
            <StartNewInterview />

            {/* Interview History */}
            <InterviewHistory />
          </div>
        </main>
      </div>
    </div>
  )
} 