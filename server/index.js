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
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:4173'  // Vite preview
  ],
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
