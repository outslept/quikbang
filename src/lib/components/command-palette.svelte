<script lang='ts'>
  import type { BangCommand } from '../../../scripts/fetch-bang'

  interface Props {
    'searchResults'?: BangCommand[]
    'selectedIndex'?: number
    'onSelectBang'?: (bang: BangCommand) => void
    'onSelectedIndexChange'?: (index: number) => void
    'id'?: string
    'aria-live'?: string
  }

  let {
    searchResults = [],
    selectedIndex = $bindable(0),
    onSelectBang,
    onSelectedIndexChange,
    id,
  }: Props = $props()

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const newIndex = (selectedIndex + 1) % searchResults.length
      selectedIndex = newIndex
      onSelectedIndexChange?.(newIndex)
    }
    else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const newIndex = (selectedIndex - 1 + searchResults.length) % searchResults.length
      selectedIndex = newIndex
      onSelectedIndexChange?.(newIndex)
    }
    else if (event.key === 'Enter' && searchResults.length > 0) {
      event.preventDefault()
      onSelectBang?.(searchResults[selectedIndex])
    }
  }

  $effect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  })
</script>

<div class='command-palette' {id}>
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
        onmouseenter={() => {
          selectedIndex = i
          onSelectedIndexChange?.(i)
        }}
      >
        <div class='bang-tag mono-text'>!{bang.t}</div>
        <div class='bang-name'>{bang.s}</div>
        <div class='bang-category'>{bang.c}</div>
      </button>
    {/each}
  </ul>
</div>
