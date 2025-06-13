import express from 'express'
import authRoutes from './routes/auth.routes.js'
// import { errorHandler } from './middlewares/error.js'

const app = express()

app.use(express.json())

// Routes
app.use('/auth', authRoutes)

// Error handler
// app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`)
})