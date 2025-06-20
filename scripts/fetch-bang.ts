import { existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

export interface BangCommand {
  c: string // category
  d: string // domain
  r: number // rank/rating
  s: string // service name
  sc: string // subcategory
  t: string // tag (bang command)
  u: string // URL template with {{{s}}} placeholder
}

export async function fetchBangs() {
  console.log('Fetching from DuckDuckGo...')
  const response = await fetch('https://duckduckgo.com/bang.js', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  })

  const text = await response.text()
  const data = JSON.parse(text)
  console.log(`Fetched ${data.length} bang commands`)

  return data
}

export async function exportToJson(bangs) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const outputDir = join(__dirname, '../data')

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const bangIndex = bangs.reduce((acc, bang) => {
    acc[bang.t] = bang
    return acc
  }, {})

  writeFileSync(join(outputDir, 'bangs.json'), JSON.stringify(bangs, null, 2))
  writeFileSync(join(outputDir, 'bang-index.json'), JSON.stringify(bangIndex, null, 2))

  console.log('Exported to JSON files')
}

export async function updateBangData() {
  const bangs = await fetchBangs()
  await exportToJson(bangs)
  return bangs
}

async function main() {
  try {
    console.log('Starting bang data update...')
    const bangs = await updateBangData()
    console.log(`Successfully processed ${bangs.length} bang commands.`)
  } catch (error) {
    console.error('Error in main:', error)
    process.exit(1)
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
