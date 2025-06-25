import Link from 'next/link'

export default function StartNewInterview() {
  const aiMentors = [
    {
      id: 'sarah',
      name: 'Sarah',
      personality: 'Friendly & Supportive',
      specialty: 'Behavioral Questions',
      avatar: '👩‍💼',
      description: 'Perfect for beginners. Sarah creates a comfortable environment and provides gentle feedback.'
    },
    {
      id: 'david',
      name: 'David',
      personality: 'Challenging & Direct',
      specialty: 'Technical Deep Dives',
      avatar: '👨‍💻',
      description: 'Great for experienced candidates. David asks tough questions and expects detailed answers.'
    },
    {
      id: 'lisa',
      name: 'Lisa',
      personality: 'Balanced & Professional',
      specialty: 'Mixed Interviews',
      avatar: '👩‍🎓',
      description: 'Ideal for all levels. Lisa provides a realistic interview experience with constructive feedback.'
    }
  ]

  const difficultyLevels = [
    { level: 'Beginner', description: 'Basic questions, supportive feedback' },
    { level: 'Intermediate', description: 'Standard questions, balanced feedback' },
    { level: 'Advanced', description: 'Challenging questions, detailed analysis' }
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Start New Interview</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Mentor Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Your AI Mentor</h3>
          <div className="space-y-4">
            {aiMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="border-2 border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{mentor.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-slate-900">{mentor.name}</h4>
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {mentor.personality}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      <strong>Specialty:</strong> {mentor.specialty}
                    </p>
                    <p className="text-sm text-slate-600">{mentor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Configuration */}
        <div className="space-y-6">
          {/* Job Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Job Description</h3>
            <textarea
              placeholder="Paste the job description here to customize your interview questions..."
              className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-slate-500 mt-2">
              This helps us tailor questions to your target role
            </p>
          </div>

          {/* Difficulty Level */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Difficulty Level</h3>
            <div className="space-y-3">
              {difficultyLevels.map((difficulty, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty.level.toLowerCase()}
                    defaultChecked={index === 1}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-slate-900">{difficulty.level}</div>
                    <div className="text-sm text-slate-600">{difficulty.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <Link
            href="/interviews/new/session"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors shadow-lg hover:shadow-xl"
          >
            Start Interview Session
          </Link>
        </div>
      </div>
    </div>
  )
} 