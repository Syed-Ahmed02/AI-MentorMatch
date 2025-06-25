import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import StatsOverview from '@/components/dashboard/StatsOverview'
import QuickActions from '@/components/dashboard/QuickActions'
import RecentActivity from '@/components/dashboard/RecentActivity'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <DashboardHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, Sarah! 👋
              </h1>
              <p className="text-slate-600">
                Ready to continue your career journey? Let's practice some interviews or check your progress.
              </p>
            </div>

            {/* Stats Overview */}
            <StatsOverview />

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  )
} 