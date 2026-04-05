import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import { DhakaBorder, DhakaLogo } from '@/components/dhaka'
import { UserButton } from '@clerk/nextjs'
import { Plus, LayoutTemplate } from 'lucide-react'
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

  return (
    <div className="min-h-screen" style={{ background: 'var(--ground-ink)' }}>

      {/* Top nav */}
      <header className="sticky top-0 z-50" style={{ background: 'rgba(14,11,7,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--ground-rim)' }}>
        <DhakaBorder height={3} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <DhakaLogo size={22} />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/templates"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-bright)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <LayoutTemplate size={15} />
              Templates
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--dhaka-amber)', fontFamily: 'var(--font-devanagari)' }}>
              नमस्ते, {user.firstName || 'User'} 👋
            </p>
            <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-bright)' }}>
              Your CVs
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {cvs.length === 0 ? 'No CVs yet. Create your first one.' : `${cvs.length} CV${cvs.length > 1 ? 's' : ''} saved`}
            </p>
          </div>

          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, var(--dhaka-crimson) 0%, var(--dhaka-deep) 100%)', boxShadow: '0 4px 20px rgba(192,57,43,0.35)' }}
          >
            <Plus size={16} />
            New CV
          </Link>
        </div>

        <DashboardGrid initialCvs={JSON.parse(JSON.stringify(cvs))} />
      </main>
    </div>
  )
}
