<script lang="ts">
  import type { BangCommand } from '../../../scripts/fetch-bang'
  import { createEventDispatcher, onMount } from 'svelte'

  export let bangs: Record<string, BangCommand> = {}
  export let query = ''

  const dispatch = createEventDispatcher<{
    queryChange: string
    search: void
    commandPaletteVisibility: boolean
    searchResults: BangCommand[]
  }>()

  let searchInput: HTMLInputElement
  let isInputFocused = false

  const MAX_SEARCH_RESULTS = 8
  const BLUR_DELAY = 150

  function getBangMatch(query: string) {
    return query.match(/^!(\w+)(?:\s+(.*))?$/)
  }

  function filterBangs(bangTag: string): BangCommand[] {
    return Object.values(bangs)
      .filter(bang =>
        bang.t.includes(bangTag) ||
        bang.s.toLowerCase().includes(bangTag.toLowerCase())
      )
      .sort((a, b) => {
        if (a.t === bangTag) return -1
        if (b.t === bangTag) return 1
        return a.t.length - b.t.length
      })
      .slice(0, MAX_SEARCH_RESULTS)
  }

  function handleInputFocus() {
    isInputFocused = true
    const bangMatch = getBangMatch(query)

    if (bangMatch?.[1]) {
      handleQueryInput()
    }
  }

  function handleInputBlur() {
    setTimeout(() => {
      isInputFocused = false
      dispatch('commandPaletteVisibility', false)
    }, BLUR_DELAY)
  }

  function handleSubmit() {
    dispatch('search')
  }

  function handleQueryInput() {
    dispatch('queryChange', query)

    const bangMatch = getBangMatch(query)

    if (bangMatch) {
      const bangTag = bangMatch[1]

      if (bangTag) {
        const results = filterBangs(bangTag)
        dispatch('searchResults', results)
        dispatch('commandPaletteVisibility', results.length > 0 && isInputFocused)
      } else {
        dispatch('commandPaletteVisibility', false)
      }
    } else {
      dispatch('commandPaletteVisibility', false)
    }
  }

  onMount(() => {
    searchInput?.focus()
  })
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="search-container" class:focused={isInputFocused}>
    <div class="search-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
    <input
      type="text"
      bind:value={query}
      bind:this={searchInput}
      on:input={handleQueryInput}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur}
      placeholder="Type !bang to get some of the bangs"
      autocomplete="off"
      spellcheck="false"
    />
  </div>
</form>
