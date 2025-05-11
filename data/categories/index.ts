// Auto-generated category index from DuckDuckGo bang commands
// Generated on: 2025-03-01T15:43:17.818Z

import type { BangCommand } from '../bangs'

import { bangs as entertainmentBangs } from './entertainment'
import { bangs as multimediaBangs } from './multimedia'
import { bangs as newsBangs } from './news'
import { bangs as online_servicesBangs } from './online_services'
import { bangs as researchBangs } from './research'
import { bangs as shoppingBangs } from './shopping'
// Import all category files
import { bangs as techBangs } from './tech'
import { bangs as translationBangs } from './translation'
import { bangs as undefinedBangs } from './undefined'

export const categories = [
  'Tech',
  'Entertainment',
  'Online Services',
  'News',
  'Research',
  'Shopping',
  'Multimedia',
  'Translation',
  'undefined',
]

export interface CategoryMap {
  [category: string]: BangCommand[]
}

// Export all category bangs
export const categoryBangs: CategoryMap = {
  'Tech': techBangs,
  'Entertainment': entertainmentBangs,
  'Online Services': online_servicesBangs,
  'News': newsBangs,
  'Research': researchBangs,
  'Shopping': shoppingBangs,
  'Multimedia': multimediaBangs,
  'Translation': translationBangs,
  'undefined': undefinedBangs,
}
