'use client'

import { useState } from 'react'

interface LearningUser {
  id: number
  name: string
  email: string
  password: string
  createdAt: string
}

export default function LearningUsersTable() {
  // Dummy data
  const initialData: LearningUser[] = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', password: '123456', createdAt: '2025-12-01' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', password: 'abcdef', createdAt: '2025-12-05' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', password: 'pass123', createdAt: '2025-12-10' }
  ]

  const [users, setUsers] = useState<LearningUser[]>(initialData)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterEmail, setFilterEmail] = useState('')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')

  // Filtered users based on search and date
  const filteredUsers = users.filter(u => {
    const nameMatch = u.name.toLowerCase().includes(filterName.toLowerCase())
    const emailMatch = u.email.toLowerCase().includes(filterEmail.toLowerCase())
    const date = new Date(u.createdAt)
    const fromMatch = filterFrom ? date >= new Date(filterFrom) : true
    const toMatch = filterTo ? date <= new Date(filterTo) : true
    return nameMatch && emailMatch && fromMatch && toMatch
  })

  const openAdd = () => {
    setEditingId(null)
    setName('')
    setEmail('')
    setPassword('')
    setShowModal(true)
  }

  const openEdit = (u: LearningUser) => {
    setEditingId(u.id)
    setName(u.name)
    setEmail(u.email)
    setPassword(u.password)
    setShowModal(true)
  }

  const saveUser = () => {
    if (!name || !email || !password) return
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, name, email, password } : u))
    } else {
      setUsers([...users, { id: Date.now(), name, email, password, createdAt: new Date().toISOString().split('T')[0] }])
    }
    setShowModal(false)
  }

  const deleteUser = (id: number) => setUsers(users.filter(u => u.id !== id))

  return (
    <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-[#111827]">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Learning Users</h2>
        <button
          onClick={openAdd}
          className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          + Add User
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Name"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Filter by Email"
          value={filterEmail}
          onChange={e => setFilterEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          placeholder="From"
          value={filterFrom}
          onChange={e => setFilterFrom(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          placeholder="To"
          value={filterTo}
          onChange={e => setFilterTo(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Password</th>
              <th className="text-left">Created At</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(u => (
                <tr key={u.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td>••••••</td>
                  <td>{u.createdAt}</td>
                  <td className="text-right space-x-3">
                    <button onClick={() => openEdit(u)} className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96">
            <h3 className="mb-4 font-semibold">{editingId ? 'Edit User' : 'Add User'}</h3>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={saveUser} className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
