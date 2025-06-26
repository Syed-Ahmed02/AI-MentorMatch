import Link from 'next/link'

export default function InterviewSidebar() {
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Interviews', href: '/interviews', icon: '🎤', active: true },
    { name: 'Skills', href: '/skills', icon: '📊' },
    { name: 'Resources', href: '/resources', icon: '📚' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ]

  const interviewFilters = [
    { name: 'All Interviews', count: 12, active: true },
    { name: 'Technical', count: 5 },
    { name: 'Behavioral', count: 4 },
    { name: 'System Design', count: 3 },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
      <nav className="p-6">
        {/* Main Navigation */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Interview Filters */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Filter Interviews
          </h3>
          <ul className="space-y-2">
            {interviewFilters.map((filter) => (
              <li key={filter.name}>
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-left ${
                    filter.active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="font-medium">{filter.name}</span>
                  <span className="text-sm bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Stats */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Your Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total Interviews</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Avg Score</span>
              <span className="font-medium">8.5/10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">This Week</span>
              <span className="font-medium">3</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
} 