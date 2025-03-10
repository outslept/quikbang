<script lang='ts'>
  import type { BangCommand } from '../../../lib/fetch-bang'
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
      const newIndex = (selectedIndex + 1) % searchResults.length
      onSelectedIndexChange?.(newIndex)
    }
    else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const newIndex = (selectedIndex - 1 + searchResults.length) % searchResults.length
      onSelectedIndexChange?.(newIndex)
    }
    else if (event.key === 'Enter' && searchResults.length > 0) {
      event.preventDefault()
      onSelectBang?.(searchResults[selectedIndex])
    }
  }

  let keydownHandler = $state<((e: KeyboardEvent) => void) | null>(null)

  onMount(() => {
    keydownHandler = (e: KeyboardEvent) => handleKeydown(e)
    window.addEventListener('keydown', keydownHandler)
  })

  onDestroy(() => {
    if (keydownHandler) {
      window.removeEventListener('keydown', keydownHandler)
    }
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
        <div class='bang-tag'>!{bang.t}</div>
        <div class='bang-name'>{bang.s}</div>
        <div class='bang-category'>{bang.c}</div>
      </button>
    {/each}
  </ul>
</div>

<style>
  .command-palette {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
    background-color: var(--palette-bg);
    border-radius: 12px;
    box-shadow: var(--palette-shadow);
    overflow: hidden;
    z-index: 10;
    border: 1px solid var(--palette-border);
  }

  .command-palette-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    background-color: var(--header-bg);
    border-bottom: 1px solid var(--header-border);
    font-size: 0.8rem;
    color: var(--header-text);
  }

  .keyboard-tip {
    font-size: 0.75rem;
  }

  .keyboard-tip span {
    background-color: var(--key-bg);
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    font-family: monospace;
    color: var(--key-text);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 320px;
    overflow-y: auto;
  }

  button {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: background-color 0.15s ease;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
  }

  button:hover,
  button.selected {
    background-color: var(--item-hover-bg);
  }

  .bang-tag {
    font-weight: 600;
    color: var(--tag-text);
    background-color: var(--tag-bg);
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .bang-name {
    font-size: 0.95rem;
    color: var(--name-text);
  }

  .bang-category {
    font-size: 0.8rem;
    color: var(--category-text);
    text-transform: capitalize;
  }
</style>
