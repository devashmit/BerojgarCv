# Clerk Authentication Setup

## Quick Fix for Login Errors

If you're seeing errors on the sign-in page, follow these steps:

### 1. Verify Clerk Dashboard Settings

Go to [Clerk Dashboard](https://dashboard.clerk.com) → Your Application → **Paths**

Make sure these are configured:

- **Sign-in path**: `/sign-in`
- **Sign-up path**: `/sign-up`
- **After sign-in URL**: `/dashboard`
- **After sign-up URL**: `/dashboard`

### 2. Add Allowed Redirect URLs

In Clerk Dashboard → **Paths** → **Redirect URLs**, add:

```
http://localhost:3000
http://localhost:3000/dashboard
http://localhost:3000/builder
```

### 3. Verify Environment Variables

Check your `.env` file has valid Clerk keys:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # Must start with pk_test_ or pk_live_
CLERK_SECRET_KEY=sk_test_...                    # Must start with sk_test_ or sk_live_
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Restart Dev Server

After changing `.env`:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### 5. Clear Browser Cache

- Open DevTools (F12)
- Right-click the refresh button → "Empty Cache and Hard Reload"
- Or use Incognito mode

## Common Errors & Solutions

### Error: "Invalid publishable key"
- Your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is wrong or expired
- Get a fresh key from Clerk Dashboard → API Keys

### Error: "Redirect URL not allowed"
- Add `http://localhost:3000` to allowed redirect URLs in Clerk Dashboard

### Error: "Application not found"
- Your Clerk application was deleted or the key belongs to a different app
- Create a new Clerk application or use the correct keys

### Error: Blank white screen
- Check browser console (F12) for errors
- Verify all Clerk env vars are set
- Make sure you're using `@clerk/nextjs` version 7.x (check `package.json`)

## Testing Authentication

1. Go to `http://localhost:3000/sign-in`
2. Click "Continue with Google" or "Continue with Email"
3. Complete sign-in flow
4. You should be redirected to `/dashboard`

## Setting Up Admin Access

After signing in for the first time:

1. Go to Clerk Dashboard → Users
2. Click on your user
3. Go to **Metadata** tab → **Public metadata**
4. Add:
   ```json
   {
     "isAdmin": true
   }
   ```
5. Save
6. Sign out and sign back in
7. Navigate to `/admin` — you should see the admin panel

## Need Help?

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Discord](https://clerk.com/discord)
