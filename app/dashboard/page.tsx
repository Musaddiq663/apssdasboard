import Sidebar from '@/components/Sidebar'
import ThemeToggle from '@/components/ThemeToggle'

const stats = [
  { title: 'Total Users', value: 1245, color: 'from-indigo-500 to-purple-600' },
  { title: 'Active Users', value: 832, color: 'from-emerald-500 to-teal-600' },
  { title: 'New Signups', value: 96, color: 'from-orange-500 to-pink-600' },
  { title: 'Revenue', value: '$4,560', color: 'from-sky-500 to-blue-600' }
]

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-10 bg-gray-100 dark:bg-[#020617]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`
                p-6 rounded-2xl text-white shadow-xl
                bg-gradient-to-r ${item.color}
                transition-all duration-300
                hover:scale-105 hover:shadow-2xl
              `}
            >
              <p className="text-sm opacity-80">{item.title}</p>
              <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
