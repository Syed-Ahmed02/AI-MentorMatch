import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    {
      title: 'Start New Interview',
      description: 'Practice with AI mentors',
      icon: '🎤',
      href: '/interviews/new',
      color: 'blue'
    },
    {
      title: 'Take Skill Assessment',
      description: 'Evaluate your strengths',
      icon: '📊',
      href: '/skills/assessment',
      color: 'teal'
    },
    {
      title: 'Browse Resources',
      description: 'Find learning materials',
      icon: '📚',
      href: '/resources',
      color: 'orange'
    },
    {
      title: 'View Progress',
      description: 'Track your improvement',
      icon: '📈',
      href: '/progress',
      color: 'green'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700'
      case 'teal':
        return 'bg-teal-600 hover:bg-teal-700'
      case 'orange':
        return 'bg-orange-600 hover:bg-orange-700'
      case 'green':
        return 'bg-green-600 hover:bg-green-700'
      default:
        return 'bg-slate-600 hover:bg-slate-700'
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(action.color)}`}>
                <span className="text-2xl text-white">{action.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{action.title}</h3>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 