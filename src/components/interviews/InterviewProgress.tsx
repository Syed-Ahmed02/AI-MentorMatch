export default function InterviewProgress() {
  return (
    <div className="bg-white border-b border-slate-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-600">
            Question 3 of 8 • Software Engineer Interview
          </div>
          <div className="text-sm text-slate-600">
            AI Mentor: Sarah (Friendly) • Difficulty: Intermediate
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: '37.5%' }} // 3/8 = 37.5%
          ></div>
        </div>
        
        {/* Question Indicators */}
        <div className="flex justify-between mt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((question) => (
            <div
              key={question}
              className={`w-3 h-3 rounded-full ${
                question < 3 
                  ? 'bg-green-500' 
                  : question === 3 
                    ? 'bg-blue-500 animate-pulse' 
                    : 'bg-slate-300'
              }`}
              title={`Question ${question}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
} 