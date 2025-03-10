import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { ofetch } from 'ofetch'

export interface BangCommand {
  c: string // category
  d: string // domain
  r: number // rank/rating
  s: string // service name
  sc: string // subcategory
  t: string // tag (bang command)
  u: string // URL template with {{{s}}} placeholder
}

export interface BangIndex {
  [tag: string]: BangCommand
}

export interface CategoryMap {
  [category: string]: BangCommand[]
}

export async function fetchBangs(
  options: {
    forceRefresh?: boolean
    cacheFilePath?: string
    cacheExpiration?: number
  } = {},
): Promise<BangCommand[]> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const {
    forceRefresh = false,
    cacheFilePath = join(__dirname, '..', 'data', 'bangs-cache.json'), // Navigate up one level
    cacheExpiration = 24 * 60 * 60 * 1000, // 24h in ms
  } = options

  const BANG_URL = 'https://duckduckgo.com/bang.js'

  const cacheDir = dirname(cacheFilePath)
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true })
    console.log(`Created cache directory at ${cacheDir}`)
  }

  if (!forceRefresh && existsSync(cacheFilePath)) {
    try {
      const stats = statSync(cacheFilePath)
      const fileAge = Date.now() - stats.mtimeMs

      if (fileAge <= cacheExpiration) {
        console.log('Loading bang commands from cache...')
        const cacheData = readFileSync(cacheFilePath, 'utf-8')
        const cachedBangs = JSON.parse(cacheData) as BangCommand[]
        console.log(`Loaded ${cachedBangs.length} bang commands from cache.`)
        return cachedBangs
      }
      else {
        console.log('Cache expired, fetching fresh data...')
      }
    }
    catch (error) {
      console.error('Error reading cache:', error)
      console.log('Will fetch fresh data...')
    }
  }

  console.log('Fetching bang commands from DuckDuckGo...')
  try {
    const response = await ofetch(BANG_URL, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
      },
      responseType: 'text',
    })

    let data: BangCommand[]

    if (typeof response === 'string') {
      try {
        data = JSON.parse(response)
        console.log(
          `Successfully parsed JSON string, found ${data.length} items`,
        )
      }
      catch (parseError) {
        console.error('Error parsing JSON response:', parseError)
        throw new Error('Failed to parse JSON response')
      }
    }
    else if (Array.isArray(response)) {
      data = response
      console.log(`Received array directly, found ${data.length} items`)
    }
    else {
      console.error('Unexpected response type:', typeof response)
      throw new Error('Unexpected response format')
    }

    if (
      !Array.isArray(data)
      || data.length === 0
      || !isValidBangCommand(data[0])
    ) {
      console.error('Invalid data format:', data.slice(0, 1))
      throw new Error('Invalid response format from DuckDuckGo')
    }

    writeFileSync(cacheFilePath, JSON.stringify(data, null, 2))
    console.log(
      `Successfully fetched ${data.length} bang commands and saved to cache.`,
    )

    return data
  }
  catch (error) {
    console.error('Error fetching bang commands:', error)
    throw error
  }
}

function isValidBangCommand(item: any): boolean {
  return (
    typeof item === 'object'
    && typeof item.c === 'string'
    && typeof item.d === 'string'
    && typeof item.r === 'number'
    && typeof item.s === 'string'
    && typeof item.sc === 'string'
    && typeof item.t === 'string'
    && typeof item.u === 'string'
  )
}

export function createBangIndex(bangs: BangCommand[]): BangIndex {
  const bangIndex: BangIndex = {}
  bangs.forEach((bang) => {
    bangIndex[bang.t] = bang
  })
  return bangIndex
}

export function groupByCategories(bangs: BangCommand[]): CategoryMap {
  const categories: CategoryMap = {}

  bangs.forEach((bang) => {
    if (!categories[bang.c]) {
      categories[bang.c] = []
    }
    categories[bang.c].push(bang)
  })

  return categories
}

export function groupBySubcategories(bangs: BangCommand[]): CategoryMap {
  const subcategories: CategoryMap = {}

  bangs.forEach((bang) => {
    if (!subcategories[bang.sc]) {
      subcategories[bang.sc] = []
    }
    subcategories[bang.sc].push(bang)
  })

  return subcategories
}

export function getSafeFileName(name: string): string {
  return name
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]/g, '')
    .toLowerCase()
}
export async function exportToTypeScript(
  bangs: BangCommand[],
  outputDir: string = join(dirname(fileURLToPath(import.meta.url)), 'data'),
): Promise<void> {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
    console.log(`Created output directory at ${outputDir}`)
  }

  const bangIndex = createBangIndex(bangs)
  const categories = groupByCategories(bangs)
  const subcategories = groupBySubcategories(bangs)

  createMainTsFile(bangs, bangIndex, outputDir)
  createCategoryTsFiles(categories, outputDir)
  createSubcategoryTsFiles(subcategories, outputDir)

  console.log('Bang commands exported to TypeScript files successfully.')
}

function createMainTsFile(bangs: BangCommand[], bangIndex: BangIndex, outputDir: string): void {
  const outputFile = join(outputDir, 'bangs.ts')

  const categoryNames = [...new Set(bangs.map(bang => bang.c))]
  const subcategoryNames = [...new Set(bangs.map(bang => bang.sc))]

  const tsContent = `
// Auto-generated bang commands from DuckDuckGo
// Generated on: ${new Date().toISOString()}

export interface BangCommand {
  c: string;    // category
  d: string;    // domain
  r: number;    // rank/rating
  s: string;    // service name
  sc: string;   // subcategory
  t: string;    // tag (bang command)
  u: string;    // URL template with {{{s}}} placeholder
}

export interface BangIndex {
  [tag: string]: BangCommand;
}

export const bangs: BangCommand[] = ${JSON.stringify(bangs, null, 2)};

export const bangIndex: BangIndex = ${JSON.stringify(bangIndex, null, 2)};

export function processBangSearch(query: string): string | null {
  const bangRegex = /^!(\\w+)(?:\\s+(.+))?$/;
  const match = query.match(bangRegex);

  if (match) {
    const bangTag = match[1];
    const searchTerm = match[2] || '';

    const bang = bangIndex[bangTag];
    if (bang) {
      const url = bang.u.replace('{{{s}}}', encodeURIComponent(searchTerm));
      return url;
    }
  }

  return null;
}

export const categories = ${JSON.stringify(categoryNames, null, 2)};
export const subcategories = ${JSON.stringify(subcategoryNames, null, 2)};
`

  try {
    writeFileSync(outputFile, tsContent)
    console.log(`Main bang commands exported to ${outputFile}`)
  }
  catch (error) {
    console.error('Error exporting to main TypeScript file:', error)
    throw error
  }
}

function createCategoryTsFiles(categories: CategoryMap, outputDir: string): void {
  const categoriesDir = join(outputDir, 'categories')
  if (!existsSync(categoriesDir)) {
    mkdirSync(categoriesDir, { recursive: true })
  }

  const indexContent = `
// Auto-generated category index from DuckDuckGo bang commands
// Generated on: ${new Date().toISOString()}

import { BangCommand } from '../bangs';

export const categories = ${JSON.stringify(Object.keys(categories), null, 2)};

export interface CategoryMap {
[category: string]: BangCommand[];
}

// Import all category files
${Object.keys(categories)
  .map((category) => {
    const safeCategory = getSafeFileName(category)
    return `import { bangs as ${safeCategory}Bangs } from './${safeCategory}';`
  })
  .join('\n')}

// Export all category bangs
export const categoryBangs: CategoryMap = {
${Object.keys(categories)
  .map((category) => {
    const safeCategory = getSafeFileName(category)
    return `  '${category}': ${safeCategory}Bangs,`
  })
  .join('\n')}
};
`

  writeFileSync(join(categoriesDir, 'index.ts'), indexContent)

  Object.entries(categories).forEach(([category, bangs]) => {
    const safeCategory = getSafeFileName(category)
    const categoryFile = join(categoriesDir, `${safeCategory}.ts`)

    const categoryBangIndex = bangs.reduce((acc, bang) => {
      acc[bang.t] = bang
      return acc
    }, {} as Record<string, BangCommand>)

    const categorySubcategories = [...new Set(bangs.map(bang => bang.sc))]

    const categoryContent = `
// Auto-generated ${category} bang commands from DuckDuckGo
// Generated on: ${new Date().toISOString()}

import { BangCommand } from '../bangs';

export const bangs: BangCommand[] = ${JSON.stringify(bangs, null, 2)};

export const bangIndex: Record<string, BangCommand> = ${JSON.stringify(
  categoryBangIndex,
  null,
  2,
)};

export const subcategories = ${JSON.stringify(categorySubcategories, null, 2)};
`

    writeFileSync(categoryFile, categoryContent)
    console.log(`Category ${category} exported to ${categoryFile}`)
  })
}

function createSubcategoryTsFiles(subcategories: CategoryMap, outputDir: string): void {
  const subcategoriesDir = join(outputDir, 'subcategories')
  if (!existsSync(subcategoriesDir)) {
    mkdirSync(subcategoriesDir, { recursive: true })
  }

  const indexContent = `
// Auto-generated subcategory index from DuckDuckGo bang commands
// Generated on: ${new Date().toISOString()}

import { BangCommand } from '../bangs';

export const subcategories = ${JSON.stringify(
  Object.keys(subcategories),
  null,
  2,
)};

export interface SubcategoryMap {
[subcategory: string]: BangCommand[];
}

// Import all subcategory files
${Object.keys(subcategories)
  .map((subcategory) => {
    const safeSubcategory = getSafeFileName(subcategory)
    return `import { bangs as ${safeSubcategory}Bangs } from './${safeSubcategory}';`
  })
  .join('\n')}

// Export all subcategory bangs
export const subcategoryBangs: SubcategoryMap = {
${Object.keys(subcategories)
  .map((subcategory) => {
    const safeSubcategory = getSafeFileName(subcategory)
    return `  '${subcategory}': ${safeSubcategory}Bangs,`
  })
  .join('\n')}
};
`

  writeFileSync(join(subcategoriesDir, 'index.ts'), indexContent)

  Object.entries(subcategories).forEach(([subcategory, bangs]) => {
    const safeSubcategory = getSafeFileName(subcategory)
    const subcategoryFile = join(subcategoriesDir, `${safeSubcategory}.ts`)

    const subcategoryBangIndex = bangs.reduce((acc, bang) => {
      acc[bang.t] = bang
      return acc
    }, {} as Record<string, BangCommand>)

    const subcategoryCategories = [...new Set(bangs.map(bang => bang.c))]

    const subcategoryContent = `
// Auto-generated ${subcategory} bang commands from DuckDuckGo
// Generated on: ${new Date().toISOString()}

import { BangCommand } from '../bangs';

export const bangs: BangCommand[] = ${JSON.stringify(bangs, null, 2)};

export const bangIndex: Record<string, BangCommand> = ${JSON.stringify(
  subcategoryBangIndex,
  null,
  2,
)};

export const categories = ${JSON.stringify(subcategoryCategories, null, 2)};
`

    writeFileSync(subcategoryFile, subcategoryContent)
    console.log(`Subcategory ${subcategory} exported to ${subcategoryFile}`)
  })
}

export async function exportToJson(
  bangs: BangCommand[],
  outputDir: string = join(dirname(fileURLToPath(import.meta.url)), 'data'),
): Promise<void> {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
    console.log(`Created output directory at ${outputDir}`)
  }

  const bangIndex = createBangIndex(bangs)
  const categories = groupByCategories(bangs)
  const subcategories = groupBySubcategories(bangs)

  const mainJsonFile = join(outputDir, 'bangs.json')
  writeFileSync(mainJsonFile, JSON.stringify(bangs, null, 2))
  console.log(`All bangs exported to ${mainJsonFile}`)

  const indexJsonFile = join(outputDir, 'bang-index.json')
  writeFileSync(indexJsonFile, JSON.stringify(bangIndex, null, 2))
  console.log(`Bang index exported to ${indexJsonFile}`)

  const categoriesDir = join(outputDir, 'categories')
  if (!existsSync(categoriesDir)) {
    mkdirSync(categoriesDir, { recursive: true })
  }

  Object.entries(categories).forEach(([category, categoryBangs]) => {
    const safeCategory = getSafeFileName(category)
    const categoryFile = join(categoriesDir, `${safeCategory}.json`)
    writeFileSync(categoryFile, JSON.stringify(categoryBangs, null, 2))
  })
  console.log(`Categories exported to ${categoriesDir}`)

  const subcategoriesDir = join(outputDir, 'subcategories')
  if (!existsSync(subcategoriesDir)) {
    mkdirSync(subcategoriesDir, { recursive: true })
  }

  Object.entries(subcategories).forEach(([subcategory, subcategoryBangs]) => {
    const safeSubcategory = getSafeFileName(subcategory)
    const subcategoryFile = join(
      subcategoriesDir,
      `${safeSubcategory}.json`,
    )
    writeFileSync(
      subcategoryFile,
      JSON.stringify(subcategoryBangs, null, 2),
    )
  })
  console.log(`Subcategories exported to ${subcategoriesDir}`)

  console.log('Bang commands exported to JSON files successfully.')
}

export async function getBangsAndExport(
  options: {
    forceRefresh?: boolean
    cacheFilePath?: string
    outputDir?: string
    exportTypeScript?: boolean
    exportJson?: boolean
  } = {},
): Promise<BangCommand[]> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const {
    forceRefresh = false,
    cacheFilePath,
    outputDir = join(__dirname, '..', 'data'), // default output to data in project root
    exportTypeScript = true,
    exportJson = true,
  } = options

  try {
    const bangs = await fetchBangs({ forceRefresh, cacheFilePath })

    if (exportTypeScript) {
      await exportToTypeScript(bangs, outputDir)
    }

    if (exportJson) {
      await exportToJson(bangs, outputDir)
    }

    return bangs
  }
  catch (error) {
    console.error('Error in getBangsAndExport:', error)
    throw error
  }
}

async function main() {
  try {
    const bangs = await getBangsAndExport()
    console.log(`Successfully processed ${bangs.length} bang commands.`)
  }
  catch (error) {
    console.error('Error in main:', error)
    process.exit(1) // Exit with error code on failure
  }
}

// Determine if the script is being run directly
if (import.meta.url.startsWith('file:')) {
  // Use import.meta.url
  const modulePath = new URL(import.meta.url).pathname
  const scriptPath = process.argv[1]

  if (modulePath === scriptPath) {
    main()
  }
}
