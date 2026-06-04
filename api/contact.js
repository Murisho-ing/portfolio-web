import nodemailer from 'nodemailer'

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean)

function setCorsHeaders(req, res) {
  const origin = req.headers.origin
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function validateBody(body) {
  const errors = []
  const { name, email, message } = body || {}

  if (!name || String(name).trim().length < 2)
    errors.push({ field: 'name', message: 'El nombre debe tener al menos 2 caracteres.' })
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim()))
    errors.push({ field: 'email', message: 'Ingresa un correo electrónico válido.' })
  if (!message || String(message).trim().length === 0)
    errors.push({ field: 'message', message: 'El mensaje es obligatorio.' })

  return errors
}

export default async function handler(req, res) {
  setCorsHeaders(req, res)

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const errors = validateBody(req.body)
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Errores de validación.', errors })
  }

  const { name, email, message } = req.body

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email to portfolio owner
    await transporter.sendMail({
      from: `"Portfolio Murisho" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `📩 Nuevo mensaje de contacto — ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fefbf7; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #A04100, #8D42FF); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nuevo mensaje de contacto</h1>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1C1C18; width: 100px;">Nombre</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #5A4136;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1C1C18;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #5A4136;"><a href="mailto:${email}" style="color: #00A5D9;">${email}</a></td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #eee;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #1C1C18;">Mensaje:</p>
              <p style="margin: 0; color: #5A4136; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #f5f5f5; text-align: center; font-size: 12px; color: #999;">
            Enviado desde el portfolio de Santiago Murillo
          </div>
        </div>
      `,
    })

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Santiago Murillo" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '¡Gracias por tu mensaje! — Santiago Murillo',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fefbf7; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #A04100, #8D42FF); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">¡Hola ${name}! 👋</h1>
          </div>
          <div style="padding: 32px;">
            <p style="color: #1C1C18; line-height: 1.6; font-size: 16px;">
              ¡Gracias por contactarme! He recibido tu mensaje y te responderé lo antes posible.
            </p>
            <p style="color: #5A4136; line-height: 1.6; font-size: 14px;">
              Mientras tanto, puedes ver mi trabajo en mi portfolio o conectar conmigo en redes sociales.
            </p>
            <p style="color: #1C1C18; margin-top: 24px; font-size: 14px;">
              Un saludo,<br><strong>Santiago Murillo</strong>
            </p>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ success: true, message: '¡Mensaje enviado con éxito! Te responderé pronto.' })
  } catch (error) {
    console.error('Error sending email:', error.message)
    return res.status(500).json({ success: false, message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' })
  }
}
