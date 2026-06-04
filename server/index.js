import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import contactRouter from './routes/contact.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// --- Middleware ---
app.use(express.json())
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS: origin ${origin} not allowed`))
  },
  methods: ['GET', 'POST'],
}))

app.use('/public', express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.pdf')) {
      res.set('Content-Disposition', 'attachment');
    }
  }
}))

// --- Routes ---
app.use('/api', contactRouter)

// --- Health check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// --- Start ---
app.listen(PORT, () => {
  console.log(`✅ Portfolio server running on http://localhost:${PORT}`)
  console.log(`📄 CV available at http://localhost:${PORT}/public/Santiago_Murillo_CV.pdf`)
})
