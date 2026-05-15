'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Auth error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-[#0F172A] gap-8 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-500/20 border border-red-500/30">
            <span className="text-3xl">⚠️</span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-white">Authentication Error</h1>
            <p className="text-slate-400 text-sm max-w-sm">
              We had trouble verifying your session. This can happen if your connection is unstable or your session has expired.
            </p>
            {this.state.error && (
              <p className="text-red-400 text-xs font-mono mt-2 bg-red-950/30 px-3 py-2 rounded-lg border border-red-500/20">
                {this.state.error.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={this.handleRetry}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}
            >
              Try Again
            </button>
            <a
              href="/"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
            >
              Go Home
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
