import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { Plus, Sparkles } from 'lucide-react'
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

  if (dbUser && dbUser.clerkId !== userId) redirect('/sign-in')

  const cvs = dbUser?.cvs || []

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <DashboardNav />

      {/* Main content — offset by sidebar width */}
      <main className="ml-[220px] min-h-screen">
        {/* Top bar */}
        <div className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <div>
            <p className="text-xs text-gray-400 font-medium">
              नमस्ते, {user.firstName || 'User'} 👋
            </p>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              My CVs
              {cvs.length > 0 && (
                <span className="ml-2 text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {cvs.length}
                </span>
              )}
            </h1>
          </div>

          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg, #C0392B 0%, #922B21 100%)' }}
          >
            <Plus size={16} />
            New CV
          </Link>
        </div>

        {/* Content area */}
        <div className="px-8 py-8">
          {cvs.length > 0 && (
            /* Quick stats bar */
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total CVs</p>
                <p className="text-3xl font-black text-gray-900">{cvs.length}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Last Updated</p>
                <p className="text-sm font-bold text-gray-900">
                  {cvs[0] ? new Date(cvs[0].updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Templates Used</p>
                <p className="text-3xl font-black text-gray-900">
                  {new Set(cvs.map((cv: any) => cv.templateId)).size}
                </p>
              </div>
            </div>
          )}

          <DashboardGrid initialCvs={JSON.parse(JSON.stringify(cvs))} />
        </div>
      </main>
    </div>
  )
}
