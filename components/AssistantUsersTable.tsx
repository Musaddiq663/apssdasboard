'use client'

import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Trash2, Edit3, Plus, X, User, Mail, Key } from 'lucide-react'

interface AssistantUser {
  id: number
  name: string
  email: string
  password: string
  image?: string
}

export default function AssistantUsersTable() {
  const initialData: AssistantUser[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', password: '123456', image: 'https://i.pravatar.cc/300?img=1' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', password: 'abcdef', image: 'https://i.pravatar.cc/300?img=2' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', password: 'pass123' },
  ]

  const [users, setUsers] = useState<AssistantUser[]>(initialData)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')

  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')

  const [imageView, setImageView] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(searchName.toLowerCase()) &&
      u.email.toLowerCase().includes(searchEmail.toLowerCase())
  )

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setShowPassword(false)
    setImageFile(null)
    setPreview('')
    setEditingId(null)
  }

  const clearFilters = () => {
    setSearchName('')
    setSearchEmail('')
  }

  const openAdd = () => {
    resetForm()
    setShowModal(true)
  }

  const openEdit = (u: AssistantUser) => {
    setEditingId(u.id)
    setName(u.name)
    setEmail(u.email)
    setPassword(u.password)
    setPreview(u.image || '')
    setImageFile(null)
    setShowPassword(false)
    setShowModal(true)
  }

  const handleFileChange = (file: File | null) => {
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const saveUser = () => {
    if (!name || !email || !password) return

    const finalImage = preview || undefined

    if (editingId) {
      setUsers(users.map(u =>
        u.id === editingId ? { ...u, name, email, password, image: finalImage } : u
      ))
    } else {
      setUsers([...users, { id: Date.now(), name, email, password, image: finalImage }])
    }

    setShowModal(false)
    resetForm()
  }

  const confirmDeleteUser = (id: number) => {
    setDeleteConfirmId(id)
  }

  const deleteUser = () => {
    if (deleteConfirmId !== null) {
      setUsers(users.filter(u => u.id !== deleteConfirmId))
      setDeleteConfirmId(null)
    }
  }

  return (
    <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-[#111827]">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User size={20} /> Assistant Users
        </h2>

        <button
          onClick={openAdd}
          className="px-5 py-2.5 rounded-xl font-semibold text-white
          bg-gradient-to-r from-cyan-500 to-indigo-500
          shadow-lg transition-all hover:opacity-90 hover:scale-[1.03] flex items-center gap-2"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="flex items-center gap-2 border p-2 rounded w-full">
          <User size={16} />
          <input
            placeholder="Search name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-2 border p-2 rounded w-full">
          <Mail size={16} />
          <input
            placeholder="Search email"
            value={searchEmail}
            onChange={e => setSearchEmail(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <button
          onClick={clearFilters}
          className="px-4 rounded-xl text-white font-semibold
          bg-gradient-to-r from-cyan-500 to-indigo-500
          hover:opacity-90 transition flex items-center gap-1"
        >
          <X size={16} /> Clear
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Password</th>
              <th className="text-left">Image</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length ? (
              filteredUsers.map(u => (
                <tr key={u.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td className="font-mono">{u.password}</td>
                  <td>
                    {u.image ? (
                      <img
                        src={u.image}
                        onClick={() => setImageView(u.image!)}
                        className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition"
                      />
                    ) : '—'}
                  </td>
                  <td className="text-right flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-white text-xs font-semibold
                      bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-90 transition"
                    >
                      <Edit3 size={16} /> Edit
                    </button>

                    <button
                      onClick={() => confirmDeleteUser(u.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-white text-xs font-semibold
                      bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition"
                    >
                      <Trash2 size={16} /> Delete
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

      {/* Image Preview */}
      {imageView && (
        <div
          onClick={() => setImageView(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={imageView}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96">
            <h3 className="mb-4 font-semibold flex items-center gap-2">
              {editingId ? <Edit3 size={18} /> : <Plus size={18} />} {editingId ? 'Edit User' : 'Add User'}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <User size={16} />
              <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} />
              <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Password with eye toggle */}
            <div className="relative mb-3 flex items-center gap-2">
              <Key size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-11 border rounded-lg outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={e => handleFileChange(e.target.files?.[0] || null)}
              className="mb-3 w-full"
            />

            {preview && (
              <div className="mb-4 flex justify-center">
                <img src={preview} className="w-20 h-20 rounded-full object-cover" />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded flex items-center gap-1"
              >
                <X size={16} /> Cancel
              </button>

              <button
                onClick={saveUser}
                className="px-5 py-2 rounded-xl font-semibold text-white
                bg-gradient-to-r from-cyan-500 to-indigo-500
                hover:opacity-90 transition shadow-lg flex items-center gap-1"
              >
                <Plus size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80 text-center">
            <p className="mb-4 font-semibold flex items-center gap-2 justify-center">
              <Trash2 size={18} /> Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border rounded-lg flex items-center gap-1"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 rounded-lg font-semibold text-white
                  bg-gradient-to-r from-red-500 to-pink-500
                  hover:opacity-90 transition flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
