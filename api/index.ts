import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

let bangIndex = {}
try {
  bangIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/bang-index.json'), 'utf-8'))
}
catch (error) {
  console.error('Error loading bang index:', error)
}

app.use((req, res, next) => {
  const queryString = req.query.q

  if (typeof queryString === 'string') {
    const match = queryString.match(/^!(\w+)(?:\s+(.+))?$/)

    if (match) {
      const bang = bangIndex[match[1]]

      if (bang) {
        return res.redirect(bang.u.replace('{{{s}}}', encodeURIComponent(match[2] || '')))
      }
    }

    return res.redirect('https://www.google.com/search?q=' + encodeURIComponent(queryString))
  }

  next()
})

app.use(express.static(path.join(__dirname, '../dist')))
app.use('/data', express.static(path.join(__dirname, '../data')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

export default function handler(req, res) {
  app(req, res)
}
