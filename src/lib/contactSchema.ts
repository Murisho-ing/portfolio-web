import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres.'),
  email: z
    .string()
    .trim()
    .email('Ingresa un correo electrónico válido.'),
  message: z
    .string()
    .trim()
    .min(1, 'El mensaje es obligatorio.'),
})

export type ContactFormData = z.infer<typeof contactSchema>
