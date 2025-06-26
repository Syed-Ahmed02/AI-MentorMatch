import Link from 'next/link'

export default function InterviewHistory() {
  const interviews = [
    {
      id: '1',
      title: 'Software Engineer @ Google',
      date: 'Dec 15, 2024',
      duration: '45 minutes',
      score: '8.5/10',
      mentor: 'Sarah (Friendly)',
      difficulty: 'Intermediate',
      status: 'completed',
      type: 'Technical'
    },
    {
      id: '2',
      title: 'Product Manager @ Microsoft',
      date: 'Dec 12, 2024',
      duration: '38 minutes',
      score: '7.2/10',
      mentor: 'David (Challenging)',
      difficulty: 'Advanced',
      status: 'completed',
      type: 'Behavioral'
    },
    {
      id: '3',
      title: 'Frontend Developer @ Meta',
      date: 'Dec 10, 2024',
      duration: '42 minutes',
      score: '9.1/10',
      mentor: 'Lisa (Supportive)',
      difficulty: 'Beginner',
      status: 'completed',
      type: 'Technical'
    },
    {
      id: '4',
      title: 'System Design @ Amazon',
      date: 'Dec 8, 2024',
      duration: '50 minutes',
      score: '6.8/10',
      mentor: 'David (Challenging)',
      difficulty: 'Advanced',
      status: 'completed',
      type: 'System Design'
    }
  ]

  const getScoreColor = (score: string) => {
    const numScore = parseFloat(score)
    if (numScore >= 8) return 'text-green-600 bg-green-50'
    if (numScore >= 6) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technical':
        return 'bg-blue-100 text-blue-700'
      case 'Behavioral':
        return 'bg-green-100 text-green-700'
      case 'System Design':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Interview History</h2>
        <Link 
          href="/interviews/history" 
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View All History
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Interview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Mentor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {interviews.map((interview) => (
                <tr key={interview.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{interview.title}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(interview.type)}`}>
                          {interview.type}
                        </span>
                        <span className="text-xs text-slate-500">{interview.duration}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {interview.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${getScoreColor(interview.score)}`}>
                      {interview.score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-slate-900">{interview.mentor}</div>
                      <div className="text-xs text-slate-500">{interview.difficulty}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/interviews/${interview.id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/interviews/${interview.id}/replay`}
                        className="text-green-600 hover:text-green-700"
                      >
                        Replay
                      </Link>
                      <button className="text-slate-600 hover:text-slate-700">
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 