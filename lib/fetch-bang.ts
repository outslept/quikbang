import * as fs from 'node:fs'
import { ofetch } from 'ofetch'
import * as pathe from 'pathe'

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
  const {
    forceRefresh = false,
    cacheFilePath = pathe.join(
      pathe.dirname(__dirname),
      'data',
      'bangs-cache.json',
    ),
    cacheExpiration = 24 * 60 * 60 * 1000, // 24h in ms
  } = options

  const BANG_URL = 'https://duckduckgo.com/bang.js'

  const cacheDir = pathe.dirname(cacheFilePath)
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
    console.log(`Created cache directory at ${cacheDir}`)
  }

  if (!forceRefresh && fs.existsSync(cacheFilePath)) {
    try {
      const stats = fs.statSync(cacheFilePath)
      const fileAge = Date.now() - stats.mtimeMs

      if (fileAge <= cacheExpiration) {
        console.log('Loading bang commands from cache...')
        const cacheData = fs.readFileSync(cacheFilePath, 'utf-8')
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

    fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2))
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
  outputDir: string = pathe.join(pathe.dirname(__dirname), 'data'),
): Promise<void> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
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

function createMainTsFile(
  bangs: BangCommand[],
  bangIndex: BangIndex,
  outputDir: string,
): void {
  const outputFile = pathe.join(outputDir, 'bangs.ts')

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
    fs.writeFileSync(outputFile, tsContent)
    console.log(`Main bang commands exported to ${outputFile}`)
  }
  catch (error) {
    console.error('Error exporting to main TypeScript file:', error)
    throw error
  }
}

function createCategoryTsFiles(
  categories: CategoryMap,
  outputDir: string,
): void {
  const categoriesDir = pathe.join(outputDir, 'categories')
  if (!fs.existsSync(categoriesDir)) {
    fs.mkdirSync(categoriesDir, { recursive: true })
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

  fs.writeFileSync(pathe.join(categoriesDir, 'index.ts'), indexContent)

  Object.entries(categories).forEach(([category, bangs]) => {
    const safeCategory = getSafeFileName(category)
    const categoryFile = pathe.join(categoriesDir, `${safeCategory}.ts`)

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

    fs.writeFileSync(categoryFile, categoryContent)
    console.log(`Category ${category} exported to ${categoryFile}`)
  })
}

function createSubcategoryTsFiles(
  subcategories: CategoryMap,
  outputDir: string,
): void {
  const subcategoriesDir = pathe.join(outputDir, 'subcategories')
  if (!fs.existsSync(subcategoriesDir)) {
    fs.mkdirSync(subcategoriesDir, { recursive: true })
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

  fs.writeFileSync(pathe.join(subcategoriesDir, 'index.ts'), indexContent)

  Object.entries(subcategories).forEach(([subcategory, bangs]) => {
    const safeSubcategory = getSafeFileName(subcategory)
    const subcategoryFile = pathe.join(
      subcategoriesDir,
      `${safeSubcategory}.ts`,
    )

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

    fs.writeFileSync(subcategoryFile, subcategoryContent)
    console.log(`Subcategory ${subcategory} exported to ${subcategoryFile}`)
  })
}

export async function exportToJson(
  bangs: BangCommand[],
  outputDir: string = pathe.join(pathe.dirname(__dirname), 'data'),
): Promise<void> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`Created output directory at ${outputDir}`)
  }

  const bangIndex = createBangIndex(bangs)

  const categories = groupByCategories(bangs)
  const subcategories = groupBySubcategories(bangs)

  const mainJsonFile = pathe.join(outputDir, 'bangs.json')
  fs.writeFileSync(mainJsonFile, JSON.stringify(bangs, null, 2))
  console.log(`All bangs exported to ${mainJsonFile}`)

  const indexJsonFile = pathe.join(outputDir, 'bang-index.json')
  fs.writeFileSync(indexJsonFile, JSON.stringify(bangIndex, null, 2))
  console.log(`Bang index exported to ${indexJsonFile}`)

  const categoriesDir = pathe.join(outputDir, 'categories')
  if (!fs.existsSync(categoriesDir)) {
    fs.mkdirSync(categoriesDir, { recursive: true })
  }

  Object.entries(categories).forEach(([category, categoryBangs]) => {
    const safeCategory = getSafeFileName(category)
    const categoryFile = pathe.join(categoriesDir, `${safeCategory}.json`)
    fs.writeFileSync(categoryFile, JSON.stringify(categoryBangs, null, 2))
  })
  console.log(`Categories exported to ${categoriesDir}`)

  const subcategoriesDir = pathe.join(outputDir, 'subcategories')
  if (!fs.existsSync(subcategoriesDir)) {
    fs.mkdirSync(subcategoriesDir, { recursive: true })
  }

  Object.entries(subcategories).forEach(([subcategory, subcategoryBangs]) => {
    const safeSubcategory = getSafeFileName(subcategory)
    const subcategoryFile = pathe.join(
      subcategoriesDir,
      `${safeSubcategory}.json`,
    )
    fs.writeFileSync(
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
  const {
    forceRefresh = false,
    cacheFilePath,
    outputDir = pathe.join(pathe.dirname(__dirname), 'data'),
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

if (require.main === module) {
  getBangsAndExport()
    .then((bangs) => {
      console.log(`Successfully processed ${bangs.length} bang commands.`)
    })
    .catch((error) => {
      console.error('Error in main:', error)
      process.exit(1)
    })
}
