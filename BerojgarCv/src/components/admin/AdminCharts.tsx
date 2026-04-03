'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DiamondMark } from '@/components/dhaka/DiamondMark'

interface Props {
  signupData: { date: string; count: number }[]
  templateData: { name: string; count: number }[]
}

function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px' }}>
      <DiamondMark size={24} color="var(--text-ghost)" />
      <p style={{ color: 'var(--text-ghost)', fontSize: '13px' }}>{label}</p>
    </div>
  )
}

export function AdminCharts({ signupData, templateData }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      {/* Signups chart */}
      <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', padding: '20px' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '16px' }}>
          User Signups — Last 30 Days
        </p>
        {signupData.length === 0 ? (
          <EmptyState label="No data yet" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ground-rim)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', color: 'var(--text-bright)' }} />
              <Line type="monotone" dataKey="count" stroke="#C0392B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Template popularity */}
      <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', padding: '20px' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '16px' }}>
          Template Popularity
        </p>
        {templateData.length === 0 ? (
          <EmptyState label="No data yet" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={templateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ground-rim)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', color: 'var(--text-bright)' }} />
              <Bar dataKey="count" fill="#D4870C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
