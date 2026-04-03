import { SignIn } from '@clerk/nextjs'
import { DhakaBorder, DhakaLogo } from '@/components/dhaka'

export default function SignInPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ground-mid)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <DhakaLogo size={36} />
        <h1 style={{ fontFamily: 'var(--font-devanagari)', fontSize: '22px', color: 'var(--text-bright)', marginTop: '16px', fontWeight: 400 }}>
          बेरोजगार CV मा स्वागत छ
        </h1>
      </div>
      <div style={{ width: '100%', maxWidth: '420px', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-modal)' }}>
        <DhakaBorder height={8} />
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: { width: '100%' },
              card: { background: 'var(--ground-deep)', border: 'none', boxShadow: 'none' },
            },
          }}
        />
      </div>
    </div>
  )
}
