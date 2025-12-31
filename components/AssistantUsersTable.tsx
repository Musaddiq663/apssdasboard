'use client'

import { useState } from 'react'

interface AssistantUser {
  id: number
  name: string
  email: string
  image?: string
}

export default function AssistantUsersTable() {
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
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')

  // filters
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(searchName.toLowerCase()) &&
      u.email.toLowerCase().includes(searchEmail.toLowerCase())
  )

  const resetForm = () => {
    setName('')
    setEmail('')
    setImageUrl('')
    setImageFile(null)
    setPreview('')
    setEditingId(null)
  }

  const openAdd = () => {
    resetForm()
    setShowModal(true)
  }

  const openEdit = (u: AssistantUser) => {
    setEditingId(u.id)
    setName(u.name)
    setEmail(u.email)
    setImageUrl(u.image || '')
    setPreview(u.image || '')
    setImageFile(null)
    setShowModal(true)
  }

  const handleFileChange = (file: File | null) => {
    if (!file) return
    setImageFile(file)
    setImageUrl('')
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
  }

  const handleUrlChange = (val: string) => {
    setImageUrl(val)
    setImageFile(null)
    setPreview(val)
  }

  const saveUser = () => {
    if (!name || !email) return

    const finalImage = preview || undefined

    if (editingId) {
      setUsers(users.map(u =>
        u.id === editingId ? { ...u, name, email, image: finalImage } : u
      ))
    } else {
      setUsers([...users, { id: Date.now(), name, email, image: finalImage }])
    }

    setShowModal(false)
    resetForm()
  }

  const deleteUser = (id: number) =>
    setUsers(users.filter(u => u.id !== id))

  return (
    <div className="p-6 rounded-xl shadow-xl" style={{ background: 'var(--card)', color: 'var(--text)' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Assistant Users</h2>
        <button
          onClick={openAdd}
          className="px-4 py-2 rounded text-white"
          style={{ background: 'var(--primary)' }}
        >
          + Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className="border p-2 rounded w-full bg-transparent"
        />
        <input
          placeholder="Search email"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          className="border p-2 rounded w-full bg-transparent"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b opacity-70">
              <th className="text-left py-3">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Image</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="py-3">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.image ? (
                    <img src={u.image} className="w-10 h-10 rounded-full" />
                  ) : '—'}
                </td>
                <td className="text-right space-x-3">
                  <button onClick={() => openEdit(u)} style={{ color: 'var(--primary)' }}>
                    Edit
                  </button>
                  <button onClick={() => deleteUser(u.id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="mb-4 font-semibold">
              {editingId ? 'Edit User' : 'Add User'}
            </h3>

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

            {/* Image URL */}
            <input
              placeholder="Image URL"
              value={imageUrl}
              disabled={!!imageFile}
              onChange={e => handleUrlChange(e.target.value)}
              className="border p-2 w-full mb-3 disabled:opacity-50"
            />

            {/* OR */}
            <div className="text-center text-xs opacity-60 mb-2">OR</div>

            {/* Upload */}
            <input
              type="file"
              accept="image/*"
              disabled={!!imageUrl}
              onChange={e => handleFileChange(e.target.files?.[0] || null)}
              className="mb-3 w-full disabled:opacity-50"
            />

            {/* Preview */}
            {preview && (
              <div className="mb-4 flex justify-center">
                <img src={preview} className="w-20 h-20 rounded-full object-cover" />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
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
