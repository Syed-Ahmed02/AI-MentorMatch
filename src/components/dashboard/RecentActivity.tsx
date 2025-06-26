import Link from 'next/link'

export default function RecentActivity() {
  const activities = [
    {
      type: 'interview',
      title: 'Software Engineer Interview',
      description: 'Completed with score 8/10',
      time: '2 hours ago',
      icon: '🎤',
      color: 'blue'
    },
    {
      type: 'assessment',
      title: 'Skill Assessment Completed',
      description: '3 skill gaps identified',
      time: 'Yesterday',
      icon: '📊',
      color: 'teal'
    },
    {
      type: 'resource',
      title: 'System Design Basics',
      description: 'Resource bookmarked',
      time: '1 day ago',
      icon: '📚',
      color: 'orange'
    },
    {
      type: 'progress',
      title: 'Communication Skills',
      description: 'Improved from 6/10 to 7/10',
      time: '2 days ago',
      icon: '📈',
      color: 'green'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600'
      case 'teal':
        return 'bg-teal-50 text-teal-600'
      case 'orange':
        return 'bg-orange-50 text-orange-600'
      case 'green':
        return 'bg-green-50 text-green-600'
      default:
        return 'bg-slate-50 text-slate-600'
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
        <Link 
          href="/activity" 
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          View All
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(activity.color)}`}>
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-900 truncate">{activity.title}</h3>
                    <span className="text-sm text-slate-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 