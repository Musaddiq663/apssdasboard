'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import Image from 'next/image'
import { useBgTheme } from '@/context/BgThemeContext'

// ✅ IMPORTANT: register ONCE (component ke bahar)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

export default function DashboardHome() {
  const { bgImages, setBg } = useBgTheme()

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>

        <div className="flex gap-2">
          {bgImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setBg(img)}
              className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white hover:scale-105 transition"
            >
              <Image src={img} alt="bg" width={48} height={48} />
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {['Users', 'Active', 'Sales', 'Revenue'].map((t, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/90 backdrop-blur shadow-xl"
          >
            <p className="text-sm text-gray-500">{t}</p>
            <h3 className="text-3xl font-bold mt-2">
              {Math.floor(Math.random() * 2000)}
            </h3>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white/95 backdrop-blur p-6 rounded-2xl shadow-xl">
        <Bar
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
              {
                label: 'Users',
                data: [100, 200, 150, 300, 250],
                backgroundColor: 'rgba(59,130,246,0.7)',
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true },
            },
          }}
        />
      </div>
    </>
  )
}
