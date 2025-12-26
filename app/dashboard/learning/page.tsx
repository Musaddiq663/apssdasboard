import Sidebar from '@/components/Sidebar'
import Table from '@/components/Table'

export default function Learning() {
  const initialData = [
    { id: 1, name: 'Usman Raza', email: 'usman@learning.com', role: 'User' },
    { id: 2, name: 'Fatima Noor', email: 'fatima@learning.com', role: 'Manager' }
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100 dark:bg-[#020617]">
        <Table title="Learning Users" initialData={initialData} />
      </main>
    </div>
  )
}
