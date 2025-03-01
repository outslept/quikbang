<script lang='ts'>
  import { onDestroy, onMount } from 'svelte'
  import type { BangCommand } from '../../../lib/fetch-bang';

let {
  searchResults = [],
  selectedIndex = 0,
  onSelectBang,
  onSelectedIndexChange
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

let keydownHandler: (e: KeyboardEvent) => void

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
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    z-index: 10;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .command-palette-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    background-color: #f9f9f9;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 0.8rem;
    color: #666;
  }

  .keyboard-tip {
    font-size: 0.75rem;
  }

  .keyboard-tip span {
    background-color: #eee;
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    font-family: monospace;
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
  }

  button:hover,
  button.selected {
    background-color: #f5f5f5;
  }

  .bang-tag {
    font-weight: 600;
    color: #000;
    background-color: #f0f0f0;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .bang-name {
    font-size: 0.95rem;
    color: #333;
  }

  .bang-category {
    font-size: 0.8rem;
    color: #888;
    text-transform: capitalize;
  }

  @media (prefers-color-scheme: dark) {
    .command-palette {
      background-color: #1a1a1a;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      border-color: rgba(255, 255, 255, 0.08);
    }

    .command-palette-header {
      background-color: #222;
      border-color: rgba(255, 255, 255, 0.05);
      color: #aaa;
    }

    .keyboard-tip span {
      background-color: #333;
      color: #ccc;
    }

    button:hover,
    button.selected {
      background-color: #222;
    }

    .bang-tag {
      background-color: #333;
      color: #f0f0f0;
    }

    .bang-name {
      color: #ddd;
    }

    .bang-category {
      color: #888;
    }
  }
</style>
