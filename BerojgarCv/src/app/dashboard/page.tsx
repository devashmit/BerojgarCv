import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import { DhakaTexture } from '@/components/dhaka'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard | बेरोजगार CV',
}

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect('/sign-in')
  }

  // Fetch data
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { 
      cvs: {
        orderBy: { updatedAt: 'desc' }
      } 
    }
  })

  const cvs = dbUser?.cvs || []

  return (
    <div className="min-h-screen bg-[var(--ground-deep)] relative">
      <DhakaTexture opacity={0.03} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-amber-500 font-tiro text-xl mb-2 tracking-wide">
               नमस्ते, {user.firstName || 'User'}
            </h1>
            <h2 className="text-4xl md:text-5xl font-fraunces font-black text-white leading-tight">
              Your <em className="text-[var(--dhaka-amber)] font-tiro not-italic">CV</em> Studio
            </h2>
          </div>

          <Link 
            href="/builder"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--dhaka-crimson)] hover:bg-[var(--dhaka-crimson-hover)] text-white rounded-2xl font-bold transition-all shadow-xl shadow-red-900/20 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            Create New CV
          </Link>
        </div>

        <DashboardGrid initialCvs={JSON.parse(JSON.stringify(cvs))} />
      </main>
    </div>
  )
}
