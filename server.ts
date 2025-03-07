import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')))

app.use('/data', express.static(path.join(__dirname, 'data')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
  })
}

export default app
