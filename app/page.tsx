'use client'

import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--primary), #0f172a, #020617)',
      }}
    >
      {/* Soft glow background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        
        {/* App Name */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Apps Admin
          </h1>
          <p className="text-sm text-white/70 mt-1">
            Secure Dashboard Login
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/70">Email Address</label>
            <input
              placeholder="admin@example.com"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/50 outline-none border border-white/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/50 outline-none border border-white/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full mt-6 py-3 rounded-lg font-semibold text-white 
                       bg-gradient-to-r from-cyan-500 to-indigo-500 
                       hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg"
          >
            Sign In to Dashboard
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/50 mt-6">
          © {new Date().getFullYear()} Apps Admin Dashboard
        </p>
      </div>
    </div>
  )
}
