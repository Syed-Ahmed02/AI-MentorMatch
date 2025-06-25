import InterviewSessionHeader from '@/components/interviews/InterviewSessionHeader'
import InterviewChat from '@/components/interviews/InterviewChat'
import InterviewControls from '@/components/interviews/InterviewControls'
import InterviewProgress from '@/components/interviews/InterviewProgress'

export default function InterviewSessionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <InterviewSessionHeader />
      
      <div className="flex h-screen">
        {/* Main Interview Area */}
        <div className="flex-1 flex flex-col">
          {/* Progress Bar */}
          <InterviewProgress />
          
          {/* Chat Interface */}
          <div className="flex-1 p-6">
            <InterviewChat />
          </div>
          
          {/* Controls */}
          <InterviewControls />
        </div>
        
        {/* Sidebar - Interview Info */}
        <div className="w-80 bg-white border-l border-slate-200 p-6">
          <div className="space-y-6">
            {/* Interview Info */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Interview Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-slate-500">AI Mentor:</span>
                  <div className="font-medium text-slate-900">Sarah (Friendly)</div>
                </div>
                <div>
                  <span className="text-sm text-slate-500">Difficulty:</span>
                  <div className="font-medium text-slate-900">Intermediate</div>
                </div>
                <div>
                  <span className="text-sm text-slate-500">Duration:</span>
                  <div className="font-medium text-slate-900">12:45 remaining</div>
                </div>
                <div>
                  <span className="text-sm text-slate-500">Current Score:</span>
                  <div className="font-medium text-green-600">8.5/10</div>
                </div>
              </div>
            </div>
            
            {/* Question History */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Question History</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium">
                    ✓
                  </div>
                  <span className="text-sm text-slate-600">Q1: Behavioral - Team Conflict</span>
                  <span className="text-xs text-green-600 font-medium">9/10</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium">
                    ✓
                  </div>
                  <span className="text-sm text-slate-600">Q2: Technical - System Design</span>
                  <span className="text-xs text-yellow-600 font-medium">7/10</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                    🔄
                  </div>
                  <span className="text-sm text-slate-900 font-medium">Q3: Current Question</span>
                </div>
              </div>
            </div>
            
            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Speak clearly and at a steady pace</li>
                <li>• Use specific examples from your experience</li>
                <li>• Structure your answers with STAR method</li>
                <li>• Ask clarifying questions if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 