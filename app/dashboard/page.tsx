'use client'

import { useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import Image from 'next/image'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const stats = [
  { title: 'Total Users', value: 1245, color: 'from-indigo-500 to-purple-600' },
  { title: 'Active Users', value: 832, color: 'from-emerald-500 to-teal-600' },
  { title: 'New Signups', value: 96, color: 'from-orange-500 to-pink-600' },
  { title: 'Revenue', value: '$4,560', color: 'from-sky-500 to-blue-600' }
]

// Dummy data for chart
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    { label: 'New Users', data: [50, 120, 90, 170, 140, 200], backgroundColor: 'rgba(59, 130, 246, 0.7)' },
    { label: 'Revenue ($)', data: [500, 1200, 900, 1700, 1400, 2000], backgroundColor: 'rgba(16, 185, 129, 0.7)' },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Monthly Overview' },
  },
}

const bgImages = [
  '/images/bg1.jpg',
  '/images/bg2.jpg',
  '/images/bg3.jpg',
  '/images/bg4.jpg',
  '/images/bg5.jpg',
  '/images/bg6.jpg',
  '/images/bg7.jpg',
  '/images/bg8.jpg',
]

export default function DashboardHome() {
  const [selectedBg, setSelectedBg] = useState<string>(bgImages[0])

  return (
    <div
      className="w-full h-screen transition-all duration-500 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${selectedBg})` }}
    >
      {/* Optional overlay for text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 p-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">Change Theme:</span>
            <div className="flex space-x-2">
              {bgImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedBg(img)}
                  className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white hover:scale-105 transition"
                >
                  <Image src={img} width={40} height={40} alt={`bg${idx}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl text-white shadow-xl bg-gradient-to-r ${item.color} transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <p className="text-sm opacity-80">{item.title}</p>
              <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
