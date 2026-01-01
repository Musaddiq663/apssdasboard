'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020617, #020617)' }}
    >
      {/* Soft ambient glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />

      {/* Login Card */}
      <div
        className="
          relative 
          z-10 
          w-full 
          max-w-md 
          p-8 
          rounded-2xl 
          backdrop-blur-xl 
          border 
          border-white/10 
          shadow-2xl
        "
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        {/* App Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-wide text-white">
            Apps Admin
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Dashboard Control Panel
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Email Address
            </label>
            <input
              placeholder="admin@example.com"
              className="
                w-full 
                px-4 
                py-3 
                rounded-lg 
                bg-white/10 
                text-white 
                placeholder:text-white/40 
                outline-none 
                border 
                border-white/10 
                focus:border-cyan-400 
                focus:ring-1 
                focus:ring-cyan-400 
                transition
              "
            />
          </div>
{/* Password with eye toggle */}
<div className="relative">
  <label className="block text-sm text-white/70 mb-1">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="••••••••"
      value={password}
      onChange={e => setPassword(e.target.value)}
      className="
        w-full 
        px-4 
        py-3 
        pr-11   /* space for eye button */
        rounded-lg 
        bg-white/10 
        text-white 
        placeholder:text-white/40 
        outline-none 
        border 
        border-white/10 
        focus:border-cyan-400 
        focus:ring-1 
        focus:ring-cyan-400 
        transition
      "
    />
    <button
      type="button"
      onClick={() => setShowPassword(prev => !prev)}
      className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
    >
      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
    </button>
  </div>
</div>


          {/* Login Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="
              w-full 
              mt-6 
              py-3 
              rounded-xl 
              font-semibold 
              text-white 
              transition-all 
              shadow-lg
              bg-gradient-to-r 
              from-cyan-500 
              to-indigo-500
              hover:opacity-90 
              hover:scale-[1.01]
            "
          >
            Login to Dashboard
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/40 mt-8">
          © {new Date().getFullYear()} Apps Admin Panel
        </p>
      </div>
    </div>
  )
}
