'use client'

import { motion } from 'framer-motion'

interface CardProps {
  title: string
  description: string
}

export default function AnimatedCard({ title, description }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-64"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}
