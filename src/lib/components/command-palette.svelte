<script lang='ts'>
  import type { BangCommand } from '../../../scripts/fetch-bang'
  import { onDestroy, onMount } from 'svelte'

  const {
    searchResults = [],
    selectedIndex = 0,
    onSelectBang,
    onSelectedIndexChange,
  } = $props<{
    searchResults?: BangCommand[]
    selectedIndex?: number
    onSelectBang?: (bang: BangCommand) => void
    onSelectedIndexChange?: (index: number) => void
  }>()

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      onSelectedIndexChange?.((selectedIndex + 1) % searchResults.length)
    }
    else if (event.key === 'ArrowUp') {
      event.preventDefault()
      onSelectedIndexChange?.((selectedIndex - 1 + searchResults.length) % searchResults.length)
    }
    else if (event.key === 'Enter' && searchResults.length > 0) {
      event.preventDefault()
      onSelectBang?.(searchResults[selectedIndex])
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
</script>

<div class='command-palette'>
  <div class='command-palette-header'>
    <span>Bang Commands</span>
    <div class='keyboard-tip'>
      <span>↑↓</span> to navigate • <span>Enter</span> to select
    </div>
  </div>
  <ul>
    {#each searchResults as bang, i}
      <button
        class:selected={i === selectedIndex}
        onclick={() => onSelectBang?.(bang)}
        onmouseenter={() => onSelectedIndexChange?.(i)}
      >
        <div class='bang-tag mono-text'>!{bang.t}</div>
        <div class='bang-name'>{bang.s}</div>
        <div class='bang-category'>{bang.c}</div>
      </button>
    {/each}
  </ul>
</div>
