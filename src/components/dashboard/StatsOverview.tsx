export default function StatsOverview() {
  const stats = [
    {
      title: 'Total Interviews',
      value: '12',
      change: '+2 this week',
      icon: '🎤',
      color: 'blue'
    },
    {
      title: 'This Week',
      value: '3',
      change: 'vs 1 last week',
      icon: '📅',
      color: 'teal'
    },
    {
      title: 'Avg Score',
      value: '8.5/10',
      change: '+0.3 improvement',
      icon: '📈',
      color: 'green'
    },
    {
      title: 'Skills Mastered',
      value: '5/12',
      change: '+1 this month',
      icon: '🎯',
      color: 'purple'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600'
      case 'teal':
        return 'bg-teal-50 text-teal-600'
      case 'green':
        return 'bg-green-50 text-green-600'
      case 'purple':
        return 'bg-purple-50 text-purple-600'
      default:
        return 'bg-slate-50 text-slate-600'
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.change}</div>
              </div>
            </div>
            <h3 className="text-slate-600 font-medium">{stat.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
} 