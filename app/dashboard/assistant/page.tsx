import Sidebar from '@/components/Sidebar'
import Table from '@/components/Table'

export default function Assistant() {
  const initialData = [
    { id: 1, name: 'Ali Khan', email: 'ali@assistant.com', role: 'User' },
    { id: 2, name: 'Sara Ahmed', email: 'sara@assistant.com', role: 'Admin' }
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100 dark:bg-[#020617]">
        <Table title="Assistant Users" initialData={initialData} />
      </main>
    </div>
  )
}
