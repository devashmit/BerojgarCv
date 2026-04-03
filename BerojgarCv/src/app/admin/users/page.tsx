import { UserTable } from '@/components/admin/UserTable'

export const metadata = { title: 'Users — Admin' }

export default function AdminUsersPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', color: 'var(--text-bright)', marginBottom: '24px' }}>All Users</h1>
      <UserTable />
    </div>
  )
}
