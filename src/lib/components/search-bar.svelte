<script lang='ts'>
  import type { BangCommand } from '../../../lib/fetch-bang'
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
  const maxSearchResults = 8

  function handleInputFocus() {
    isInputFocused = true
    const bangMatch = query.match(/^!(\w+)(?:\s+(.*))?$/)

    if (bangMatch && bangMatch[1]) {
      handleQueryInput()
    }
  }

  function handleInputBlur() {
    setTimeout(() => {
      isInputFocused = false
      dispatch('commandPaletteVisibility', false)
    }, 150)
  }

  function handleSubmit() {
    dispatch('search')
  }

  function handleQueryInput() {
    dispatch('queryChange', query)

    const bangMatch = query.match(/^!(\w+)(?:\s+(.*))?$/)

    if (bangMatch) {
      const bangTag = bangMatch[1]

      if (bangTag) {
        const results = Object.values(bangs)
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

        dispatch('searchResults', results)
        dispatch('commandPaletteVisibility', results.length > 0 && isInputFocused)
      }
      else {
        dispatch('commandPaletteVisibility', false)
      }
    }
    else {
      dispatch('commandPaletteVisibility', false)
    }
  }

  onMount(() => {
    if (searchInput)
      searchInput.focus()
  })
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class='search-container' class:focused={isInputFocused}>
    <div class='search-icon'>
      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
        <circle cx='11' cy='11' r='8'></circle>
        <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
      </svg>
    </div>
    <input
      type='text'
      bind:value={query}
      on:input={handleQueryInput}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur}
      bind:this={searchInput}
      placeholder='Type !bang query (e.g., !w Svelte)'
      autocomplete='off'
      spellcheck='false'
    />
  </div>
</form>

<style>
  .search-container {
    display: flex;
    align-items: center;
    background-color: var(--search-bg, #fff);
    border-radius: 12px;
    padding: 0 1rem;
    border: 1px solid var(--search-border, rgba(0, 0, 0, 0.08));
    box-shadow: var(--search-shadow, 0 4px 12px rgba(0, 0, 0, 0.05));
    transition: all 0.2s ease;
  }

  .search-container.focused {
    border-color: var(--search-focus-border, rgba(0, 0, 0, 0.2));
    box-shadow: var(--search-focus-shadow, 0 8px 16px rgba(0, 0, 0, 0.1));
  }

  .search-icon {
    color: var(--icon-color, #666);
    margin-right: 0.5rem;
  }

  input {
    flex: 1;
    padding: 1rem 0;
    font-size: 1rem;
    border: none;
    background: transparent;
    outline: none;
    color: var(--input-text, #333);
  }

  input::placeholder {
    color: var(--placeholder-color, #999);
  }

  :global([data-theme="light"]) {
    --search-bg: #fff;
    --search-border: rgba(0, 0, 0, 0.08);
    --search-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    --search-focus-border: rgba(0, 0, 0, 0.2);
    --search-focus-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    --icon-color: #666;
    --input-text: #333;
    --placeholder-color: #999;
  }

  :global([data-theme="dark"]) {
    --search-bg: #1a1a1a;
    --search-border: rgba(255, 255, 255, 0.08);
    --search-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    --search-focus-border: rgba(255, 255, 255, 0.2);
    --search-focus-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    --icon-color: #aaa;
    --input-text: #f0f0f0;
    --placeholder-color: #777;
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --search-bg: #1a1a1a;
      --search-border: rgba(255, 255, 255, 0.08);
      --search-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      --search-focus-border: rgba(255, 255, 255, 0.2);
      --search-focus-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      --icon-color: #aaa;
      --input-text: #f0f0f0;
      --placeholder-color: #777;
    }
  }

  @media (prefers-color-scheme: light) {
    :root:not([data-theme]) {
      --search-bg: #fff;
      --search-border: rgba(0, 0, 0, 0.08);
      --search-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      --search-focus-border: rgba(0, 0, 0, 0.2);
      --search-focus-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      --icon-color: #666;
      --input-text: #333;
      --placeholder-color: #999;
    }
  }
</style>
