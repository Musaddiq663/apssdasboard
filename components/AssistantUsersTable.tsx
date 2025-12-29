'use client'

import { useState, useEffect } from 'react'

interface AssistantUser {
  id: number
  name: string
  email: string
  image?: string
}

export default function AssistantUsersTable() {
  // Dummy initial data
  const initialData: AssistantUser[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', image: 'https://i.pravatar.cc/100?img=1' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', image: 'https://i.pravatar.cc/100?img=2' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
  ]

  const [users, setUsers] = useState<AssistantUser[]>(initialData)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState<string | undefined>('')

  // Filters
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')

  // Filtered users
  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(searchName.toLowerCase()) &&
      u.email.toLowerCase().includes(searchEmail.toLowerCase())
  )

  const openAdd = () => {
    setEditingId(null)
    setName('')
    setEmail('')
    setImage('')
    setShowModal(true)
  }

  const openEdit = (u: AssistantUser) => {
    setEditingId(u.id)
    setName(u.name)
    setEmail(u.email)
    setImage(u.image)
    setShowModal(true)
  }

  const saveUser = () => {
    if (!name || !email) return

    if (editingId) {
      setUsers(users.map(u =>
        u.id === editingId ? { ...u, name, email, image } : u
      ))
    } else {
      setUsers([...users, { id: Date.now(), name, email, image }])
    }

    setShowModal(false)
  }

  const deleteUser = (id: number) => setUsers(users.filter(u => u.id !== id))

  return (
    <div className="p-6 rounded-xl shadow-xl" style={{ background: 'var(--card)', color: 'var(--text)' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Assistant Users</h2>
        <button
          onClick={openAdd}
          className="px-4 py-2 rounded text-white hover:opacity-90 transition"
          style={{ background: 'var(--primary)' }}
        >
          + Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 bg-transparent"
        />
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 bg-transparent"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b opacity-70">
              <th className="py-3 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Image</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(u => (
                <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3">{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.image ? (
                      <img src={u.image} className="w-10 h-10 rounded-full" />
                    ) : '—'}
                  </td>
                  <td className="text-right space-x-3">
                    <button
                      onClick={() => openEdit(u)}
                      className="hover:underline"
                      style={{ color: 'var(--primary)' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center opacity-60">
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
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="mb-4 font-semibold">{editingId ? 'Edit User' : 'Add User'}</h3>

            <input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <input
              placeholder="Image URL"
              value={image || ''}
              onChange={e => setImage(e.target.value)}
              className="border p-2 w-full mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveUser}
                className="px-4 py-2 rounded text-white"
                style={{ background: 'var(--primary)' }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
