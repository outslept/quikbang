<script lang='ts'>
  import type { BangCommand } from '../lib/fetch-bang'
  import { onMount } from 'svelte'
  import BangGrid from './lib/components/bang-grid.svelte'
  import CommandPalette from './lib/components/command-palette.svelte'
  import ErrorMessage from './lib/components/error-messages.svelte'
  import Footer from './lib/components/footer.svelte'
  import Instructions from './lib/components/instructions.svelte'
  import LoadingSpinner from './lib/components/loading-spinner.svelte'
  import SearchBar from './lib/components/search-bar.svelte'
  import ThemeSwitcher from './lib/components/theme-switcher.svelte'
  import { loadRecentBangs, saveRecentBangs } from './lib/utils'
  import './lib/styles/fonts.css'

  let bangs: Record<string, BangCommand> = {}
  let loading = true
  let error: string | null = null
  let query = ''
  let searchResults: BangCommand[] = []
  let recentBangs: BangCommand[] = []
  let showCommandPalette = false
  let selectedIndex = 0

  const urlParams = new URLSearchParams(window.location.search)
  const queryParam = urlParams.get('q')

  const defaultSearch = 'https://www.google.com/search?q='
  const maxRecentBangs = 10
  const maxSearchResults = 8

  const topBangTags = ['g', 'w', 'yt', 'gh', 'r', 'a', 'maps', 'tr', 'i', 'news']
  let topBangs: BangCommand[] = []

  onMount(async () => {
    try {
      const response = await fetch('/data/bang-index.json')
      if (!response.ok) {
        throw new Error('Failed to load bang commands')
      }

      bangs = await response.json()

      topBangs = topBangTags
        .map(tag => bangs[tag])
        .filter(bang => bang !== undefined)

      loading = false

      recentBangs = loadRecentBangs()

      if (queryParam) {
        query = queryParam
        handleSearch()
      }
    }
    catch (err) {
      console.error('Error loading bang commands:', err)
      error = 'Failed to load bang commands. Please try again later.'
      loading = false
    }
  })

  function addToRecentBangs(bang: BangCommand) {
    recentBangs = recentBangs.filter(b => b.t !== bang.t)

    recentBangs = [bang, ...recentBangs.slice(0, maxRecentBangs - 1)]

    saveRecentBangs(recentBangs)
  }

  function handleSearch() {
    if (!query)
      return

    const bangMatch = query.match(/^!(\w+)(?:\s+(.*))?$/)

    if (bangMatch) {
      const bangTag = bangMatch[1]
      const searchTerm = bangMatch[2] || ''

      const bang = bangs[bangTag]
      if (bang) {
        addToRecentBangs(bang)

        const url = bang.u.replace('{{{s}}}', encodeURIComponent(searchTerm))
        window.location.href = url
        return
      }

      searchResults = Object.values(bangs)
        .filter(b =>
          b.t.includes(bangTag)
            || b.s.toLowerCase().includes(bangTag.toLowerCase()),
        )
        .sort((a, b) => {
          if (a.t === bangTag)
            return -1
          if (b.t === bangTag)
            return 1

          return a.t.length - b.t.length
        })
        .slice(0, maxSearchResults)

      showCommandPalette = searchResults.length > 0
      selectedIndex = 0
    }
    else {
      window.location.href = defaultSearch + encodeURIComponent(query)
    }
  }

  function useBang(bang: BangCommand) {
    let searchTerm = ''
    const bangMatch = query.match(/^!\w+\s+(.*)$/)
    if (bangMatch) {
      searchTerm = bangMatch[1]
    }
    else if (!query.startsWith('!')) {
      searchTerm = query
    }

    addToRecentBangs(bang)

    const url = bang.u.replace('{{{s}}}', encodeURIComponent(searchTerm))
    window.location.href = url
  }

  function handleQueryChange(event: CustomEvent<string>) {
    query = event.detail
  }

  function handleCommandPaletteVisibility(event: CustomEvent<boolean>) {
    showCommandPalette = event.detail
  }

  function handleSearchResults(event: CustomEvent<BangCommand[]>) {
    searchResults = event.detail
    selectedIndex = 0
  }

  function handleSelectedIndexChange(event: CustomEvent<number>) {
    selectedIndex = event.detail
  }
</script>

<main>
  <div class='container'>
    <header>
      <div class='header-content'>
        <div class='logo-area'>
          <h1>Quikbang</h1>
          <p class='subtitle'>Lightning-fast search with bang commands</p>
        </div>
        <div class='theme-switcher-container'>
          <ThemeSwitcher />
        </div>
      </div>
    </header>

    {#if loading}
      <LoadingSpinner message='Loading bang commands...' />
    {:else if error}
      <ErrorMessage {error} />
    {:else}
      <div class='search-section'>
        <SearchBar
          {bangs}
          {query}
          on:queryChange={handleQueryChange}
          on:search={handleSearch}
          on:commandPaletteVisibility={handleCommandPaletteVisibility}
          on:searchResults={handleSearchResults}
        />

        {#if showCommandPalette && searchResults.length > 0}
          <CommandPalette
            {searchResults}
            {selectedIndex}
            on:selectBang={e => useBang(e.detail)}
            on:selectedIndexChange={handleSelectedIndexChange}
          />
        {/if}
      </div>

      <div class='content'>
        <section class='section'>
          <h2>Popular Bang Commands</h2>
          <BangGrid bangs={topBangs} on:selectBang={e => useBang(e.detail)} />
        </section>

        {#if recentBangs.length > 0}
          <section class='section'>
            <h2>Recently Used</h2>
            <BangGrid bangs={recentBangs.slice(0, 8)} on:selectBang={e => useBang(e.detail)} />
          </section>
        {/if}

        <Instructions />
      </div>
    {/if}

    <Footer />
  </div>
</main>

<style>
  :global(body) {
    background-color: var(--app-bg, #f9f9f9);
    color: var(--app-text, #333);
    margin: 0;
    padding: 0;
    font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  :global([data-theme="dark"]) {
    --app-bg: #121212;
    --app-text: #e0e0e0;
    --section-bg: #1a1a1a;
    --section-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    --section-border: rgba(255, 255, 255, 0.08);
    --heading-gradient-from: #fff;
    --heading-gradient-to: #ccc;
    --subtitle-color: #aaa;
  }

  :global([data-theme="light"]) {
    --app-bg: #f9f9f9;
    --app-text: #333;
    --section-bg: #fff;
    --section-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    --section-border: rgba(0, 0, 0, 0.04);
    --heading-gradient-from: #000;
    --heading-gradient-to: #333;
    --subtitle-color: #666;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
  }

  header {
    margin-bottom: 2rem;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-area {
    text-align: left;
  }

  .theme-switcher-container {
    margin-left: auto;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(90deg, var(--heading-gradient-from) 0%, var(--heading-gradient-to) 100%);
    background-clip: text;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--subtitle-color);
    margin: 0.5rem 0 0;
  }

  .search-section {
    position: relative;
    margin-bottom: 2rem;
  }

  .content {
    display: grid;
    gap: 2rem;
  }

  .section {
    background-color: var(--section-bg);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--section-shadow);
    border: 1px solid var(--section-border);
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 1.5rem;
    color: var(--app-text);
  }

  @media (max-width: 768px) {
    .container {
      padding: 1.5rem;
    }

    h1 {
      font-size: 2rem;
    }

    .header-content {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    .theme-switcher-container {
      align-self: flex-end;
      margin-bottom: 1rem;
    }

    .logo-area {
      text-align: center;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 1rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }
</style>
