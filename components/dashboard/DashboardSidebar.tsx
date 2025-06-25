import Link from 'next/link'

export default function DashboardSidebar() {
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠', active: true },
    { name: 'Interviews', href: '/interviews', icon: '🎤' },
    { name: 'Skills', href: '/skills', icon: '📊' },
    { name: 'Resources', href: '/resources', icon: '📚' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
      <nav className="p-6">
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

        {/* Divider */}
        <div className="border-t border-slate-200 my-6"></div>

        {/* Additional Links */}
        <ul className="space-y-2">
          <li>
            <Link
              href="/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Settings</span>
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <span className="text-lg">❓</span>
              <span className="font-medium">Help</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
} 