import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { contactSchema, type ContactFormData } from '../lib/contactSchema'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending')
    setServerMessage('')

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (res.ok && json.success) {
        setStatus('success')
        setServerMessage(json.message)
        form.reset()

        // Auto-dismiss success after 6 seconds
        setTimeout(() => {
          setStatus('idle')
          setServerMessage('')
        }, 6000)
      } else {
        setStatus('error')
        setServerMessage(json.message || 'Error al enviar el mensaje.')

        setTimeout(() => {
          setStatus('idle')
          setServerMessage('')
        }, 5000)
      }
    } catch {
      setStatus('error')
      setServerMessage('No se pudo conectar con el servidor. Inténtalo más tarde.')

      setTimeout(() => {
        setStatus('idle')
        setServerMessage('')
      }, 5000)
    }
  }

  return {
    form,
    status,
    serverMessage,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
