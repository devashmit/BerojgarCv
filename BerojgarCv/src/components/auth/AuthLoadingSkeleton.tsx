export function AuthLoadingSkeleton() {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-[#0F172A] gap-6">
      {/* Animated logo mark */}
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>
        <span className="text-white font-black text-lg">CV</span>
      </div>

      {/* Skeleton shimmer lines */}
      <div className="flex flex-col gap-3 w-64">
        <div className="h-3 rounded-full bg-white/10 animate-pulse" />
        <div className="h-3 rounded-full bg-white/10 animate-pulse w-4/5" />
        <div className="h-3 rounded-full bg-white/10 animate-pulse w-3/5" />
      </div>

      <p className="text-xs font-semibold tracking-widest uppercase text-slate-600 animate-pulse">
        Verifying session...
      </p>
    </div>
  )
}
