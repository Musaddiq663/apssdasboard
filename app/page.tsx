'use client'
import { useRouter } from 'next/navigation'


export default function Login() {
const router = useRouter()


return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-cyan-500">
<div className="bg-white p-8 rounded-xl shadow-xl w-96">
<h2 className="text-2xl font-bold mb-4">Admin Login</h2>
<input className="w-full mb-3 p-2 border rounded" placeholder="Email" />
<input className="w-full mb-4 p-2 border rounded" type="password" placeholder="Password" />
<button
onClick={() => router.push('/dashboard')}
className="w-full bg-indigo-600 text-white py-2 rounded">
Login
</button>
</div>
</div>
)
}