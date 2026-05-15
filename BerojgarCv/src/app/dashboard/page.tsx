import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { Plus, FileText, Clock, Layout } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Dashboard | BerojgarCV' }

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()
  if (!userId || !user) redirect('/sign-in')

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { cvs: { orderBy: { updatedAt: 'desc' } } },
  })

  const cvs = dbUser?.cvs || []
  const templateCount = new Set(cvs.map((cv: any) => cv.templateId)).size
  const lastUpdated = cvs[0]
    ? new Date(cvs[0].updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '—'

  return (
    <div className="min-h-screen" style={{ background: '#F0F2F5' }}>
      <DashboardNav />

      {/* Main — offset by sidebar */}
      <main className="ml-[260px] min-h-screen flex flex-col">

        {/* Top bar */}
        <div
          className="h-16 px-8 flex items-center justify-between sticky top-0 z-40"
          style={{ background: '#ffffff', borderBottom: '1px solid #E5E7EB' }}
        >
          <div>
            <p className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
              Welcome back, {user.firstName || 'User'} 👋
            </p>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              My CVs
              {cvs.length > 0 && (
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#EEF2FF', color: '#6366F1' }}>
                  {cvs.length}
                </span>
              )}
            </h1>
          </div>

          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}
          >
            <Plus size={16} />
            New CV
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">

          {/* Stats row */}
          {cvs.length > 0 && (
            <div className="grid grid-cols-3 gap-5 mb-8">
              {[
                {
                  icon: FileText,
                  label: 'Total CVs',
                  value: cvs.length,
                  color: '#6366F1',
                  bg: '#EEF2FF',
                },
                {
                  icon: Clock,
                  label: 'Last Updated',
                  value: lastUpdated,
                  color: '#0EA5E9',
                  bg: '#E0F2FE',
                },
                {
                  icon: Layout,
                  label: 'Templates Used',
                  value: templateCount,
                  color: '#10B981',
                  bg: '#D1FAE5',
                },
              ].map(({ icon: Icon, label, value, color, bg }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-5 rounded-2xl"
                  style={{ background: '#ffffff', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', border: '1px solid #F3F4F6' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#9CA3AF' }}>{label}</p>
                    <p className="text-2xl font-black" style={{ color: '#111827' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold" style={{ color: '#374151' }}>Your CVs</h2>
          </div>

          <DashboardGrid initialCvs={JSON.parse(JSON.stringify(cvs))} />
        </div>
      </main>
    </div>
  )
}
