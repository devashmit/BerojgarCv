import { AnnouncementForm } from '@/components/admin/AnnouncementForm'

export const metadata = { title: 'Announcements — Admin' }

export default function AdminAnnouncementsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', color: 'var(--text-bright)', marginBottom: '8px' }}>Announcements</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Banners appear on landing page, builder, and dashboard. Dismissed per-user.</p>
      <AnnouncementForm />
    </div>
  )
}
