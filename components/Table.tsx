'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface TableProps {
  initialData: User[]
  title: string
}

export default function Table({ initialData, title }: TableProps) {
  const [users, setUsers] = useState<User[]>(initialData)
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [searchRole, setSearchRole] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('User')

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(searchName.toLowerCase()) &&
      u.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      u.role.toLowerCase().includes(searchRole.toLowerCase())
  )

  const openAddModal = () => {
    setIsEditing(false)
    setName('')
    setEmail('')
    setRole('User')
    setShowModal(true)
  }

  const openEditModal = (user: User) => {
    setIsEditing(true)
    setCurrentId(user.id)
    setName(user.name)
    setEmail(user.email)
    setRole(user.role)
    setShowModal(true)
  }

  const saveUser = () => {
    if (!name || !email) return
    if (isEditing && currentId) {
      setUsers(users.map(u => (u.id === currentId ? { ...u, name, email, role } : u)))
    } else {
      setUsers([...users, { id: Date.now(), name, email, role }])
    }
    setShowModal(false)
  }

  const deleteUser = (id: number) =>
    setUsers(users.filter(u => u.id !== id))

  return (
    <div
      className="p-6 rounded-2xl shadow-xl transition-all duration-500"
      style={{ background: 'var(--card)', color: 'var(--text)' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg text-white transition"
          style={{ background: 'var(--primary)' }}
        >
          + Add User
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          placeholder="Filter by name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className="border p-2 rounded-lg w-full bg-transparent"
        />
        <input
          placeholder="Filter by email"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          className="border p-2 rounded-lg w-full bg-transparent"
        />
        <input
          placeholder="Filter by role"
          value={searchRole}
          onChange={e => setSearchRole(e.target.value)}
          className="border p-2 rounded-lg w-full bg-transparent"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b opacity-70">
              <th className="py-3 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border-b hover:opacity-80 transition"
                  >
                    <td className="py-3 font-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="text-right space-x-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="hover:underline"
                        style={{ color: 'var(--primary)' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center opacity-60">
                    No users found
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="p-6 rounded-xl w-96"
            style={{ background: 'var(--card)', color: 'var(--text)' }}
          >
            <h4 className="text-lg font-semibold mb-4">
              {isEditing ? 'Update User' : 'Add User'}
            </h4>

            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              className="border p-2 rounded w-full mb-3 bg-transparent"
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 rounded w-full mb-3 bg-transparent"
            />
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="border p-2 rounded w-full mb-4 bg-transparent"
            >
              <option>User</option>
              <option>Admin</option>
              <option>Manager</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={saveUser}
                className="px-4 py-2 rounded text-white"
                style={{ background: 'var(--primary)' }}
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
