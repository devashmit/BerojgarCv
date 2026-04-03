import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata = { title: 'Admin Panel' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId, sessionClaims } = await auth()
  if (!userId) redirect('/sign-in')
  const isAdmin = (sessionClaims?.metadata as Record<string, unknown>)?.isAdmin === true
  if (!isAdmin) redirect('/dashboard')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ground-ink)' }}>
      <AdminSidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
        {children}
      </main>
    </div>
  )
}
