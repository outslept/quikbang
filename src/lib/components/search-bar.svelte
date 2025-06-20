<script lang='ts'>
  import type { BangCommand } from '../../../scripts/fetch-bang'

  interface Props {
    bangs?: Record<string, BangCommand>
    query?: string
    onqueryChange?: (query: string) => void
    onsearch?: () => void
    oncommandPaletteVisibility?: (visible: boolean) => void
    onsearchResults?: (results: BangCommand[]) => void
  }

  let {
    bangs = {},
    query = $bindable(''),
    onqueryChange,
    onsearch,
    oncommandPaletteVisibility,
    onsearchResults,
  }: Props = $props()

  let searchInput = $state<HTMLInputElement>()
  let isInputFocused = $state(false)

  const MAX_SEARCH_RESULTS = 8
  const BLUR_DELAY = 150

  const getBangMatch = (query: string) => {
    return query.match(/^!(\w+)(?:\s(.*))?$/)
  }

  const filterBangs = (bangTag: string): BangCommand[] => {
    return Object.values(bangs)
      .filter(bang =>
        bang.t.includes(bangTag)
          || bang.s.toLowerCase().includes(bangTag.toLowerCase()),
      )
      .sort((a, b) => {
        if (a.t === bangTag)
          return -1
        if (b.t === bangTag)
          return 1
        return a.t.length - b.t.length
      })
      .slice(0, MAX_SEARCH_RESULTS)
  }

  const handleQueryInput = () => {
    onqueryChange?.(query)

    const bangMatch = getBangMatch(query)

    if (bangMatch) {
      const bangTag = bangMatch[1]

      if (bangTag) {
        const results = filterBangs(bangTag)
        onsearchResults?.(results)
        oncommandPaletteVisibility?.(results.length > 0 && isInputFocused)
      }
      else {
        oncommandPaletteVisibility?.(false)
      }
    }
    else {
      oncommandPaletteVisibility?.(false)
    }
  }

  const handleInputFocus = () => {
    isInputFocused = true
    const bangMatch = getBangMatch(query)

    if (bangMatch?.[1]) {
      handleQueryInput()
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      isInputFocused = false
      oncommandPaletteVisibility?.(false)
    }, BLUR_DELAY)
  }

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    onsearch?.()
  }

  $effect(() => {
    searchInput?.focus()
  })
</script>

<form onsubmit={handleSubmit}>
  <div class='search-container' class:focused={isInputFocused}>
    <div class='search-icon'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <circle cx='11' cy='11' r='8' />
        <line x1='21' y1='21' x2='16.65' y2='16.65' />
      </svg>
    </div>
    <input
      type='text'
      bind:value={query}
      bind:this={searchInput}
      oninput={handleQueryInput}
      onfocus={handleInputFocus}
      onblur={handleInputBlur}
      placeholder='Type !bang to get some of the bangs'
      autocomplete='off'
      spellcheck='false'
    />
  </div>
</form>
