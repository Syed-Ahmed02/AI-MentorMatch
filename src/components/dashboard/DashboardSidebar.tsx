import Link from 'next/link'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { firestoreService, SessionDocument } from '../../lib/firestoreService'
import { useAuth } from '../../contexts/AuthContext'
import { Loader2, Clock, PlayCircle, LogOut } from 'lucide-react'

interface DashboardSidebarProps {
  onSelectSession?: (session: SessionDocument) => void;
  selectedSessionId?: string;
  onPracticeInterview?: () => void;
}

const DashboardSidebar = forwardRef(function DashboardSidebar({ onSelectSession, selectedSessionId, onPracticeInterview }: DashboardSidebarProps, ref) {
  const { currentUser, logout } = useAuth();
  const [sessions, setSessions] = useState<SessionDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const router = require('next/navigation').useRouter();

  async function fetchSessions() {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await firestoreService.getUserSessions(currentUser.uid);
      setSessions(data);
    } finally {
      setLoading(false);
    }
  }

  useImperativeHandle(ref, () => ({
    refreshSessions: fetchSessions
  }));

  useEffect(() => {
    fetchSessions();
    // No polling
  }, [currentUser]);

  const navigationItems = [
    { name: 'Interviews', href: '/interviews', icon: '🎤' },
    // { name: 'Skills', href: '/skills', icon: '📊' },
    // { name: 'Resources', href: '/resources', icon: '📚' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      <nav className="p-6 flex-1">
        <button
          className="w-full flex items-center justify-center gap-2 mb-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
          onClick={() => onPracticeInterview && onPracticeInterview()}
        >
          <PlayCircle className="w-6 h-6" /> New Practice Session
        </button>
        <ul className="space-y-2 mb-8">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Previous Sessions</div>
          {loading ? (
            <div className="flex items-center text-slate-400 text-sm"><Loader2 className="animate-spin mr-2 w-4 h-4" />Loading...</div>
          ) : sessions.length === 0 ? (
            <div className="text-slate-400 text-sm">No sessions yet</div>
          ) : (
            <ul className="space-y-1">
              {sessions.map(session => (
                <li key={session.id}>
                  <button
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-slate-700 hover:bg-blue-50 transition ${selectedSessionId === session.id ? 'bg-blue-100 font-semibold' : ''}`}
                    onClick={() => onSelectSession && onSelectSession(session)}
                  >
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="truncate">
                      {session.jobDescription?.slice(0, 32) || 'Session'}
                    </span>
                    <span className="ml-auto text-xs text-slate-400">{session.createdAt?.toDate?.().toLocaleDateString?.() || ''}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      <div className="p-6 mt-auto">
        <button
          className="w-full flex items-center justify-center gap-2 py-2 text-red-600 border border-red-200 rounded-lg font-semibold hover:bg-red-50 transition"
          onClick={async () => {
            await logout();
            router.push('/login');
          }}
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </aside>
  )
});

export default DashboardSidebar; 