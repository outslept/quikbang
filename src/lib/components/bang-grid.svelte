<script lang='ts'>
  import type { BangCommand } from '../../../lib/fetch-bang'
  import { createEventDispatcher, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import BangCard from './bang-card.svelte'

  export let bangs: BangCommand[] = []
  export let loading = false
  export let columns = 'auto'

  let mounted = false
  let gridElement: HTMLElement
  let animationOrder = 0

  const dispatch = createEventDispatcher<{
    selectBang: BangCommand
  }>()

  onMount(() => {
    mounted = true

    setTimeout(() => {
      animationOrder = 1
    }, 100)

    return () => {
      mounted = false
    }
  })

  function handleSelect(event: CustomEvent<BangCommand>) {
    dispatch('selectBang', event.detail)
  }

  $: gridTemplateColumns = getGridTemplateColumns(columns)

  function getGridTemplateColumns(cols: string | number): string {
    if (cols === 'auto') {
      return 'repeat(auto-fill, minmax(180px, 1fr))'
    }
    else if (typeof cols === 'number') {
      return `repeat(${cols}, 1fr)`
    }
    else {
      switch (cols) {
        case '2': return 'repeat(2, 1fr)'
        case '3': return 'repeat(3, 1fr)'
        case '4': return 'repeat(4, 1fr)'
        default: return 'repeat(auto-fill, minmax(180px, 1fr))'
      }
    }
  }
</script>

<div
  class='bang-grid'
  class:loading
  bind:this={gridElement}
  style='--grid-columns: {gridTemplateColumns};'
  role='grid'
  aria-busy={loading}
>
  {#if loading}
    <div class='loading-state' in:fade={{ duration: 200 }}>
      {#each Array.from({ length: 8 }) as _, i}
        <div class='bang-card-skeleton'></div>
      {/each}
    </div>
  {:else if bangs.length === 0}
    <div class='empty-state' in:fade={{ duration: 200 }}>
      <p>No bang commands found</p>
    </div>
  {:else}
    {#each bangs as bang, i (bang.t)}
      <div
        class='bang-grid-item'
        style='--animation-order: {i};'
      >
        <BangCard {bang} on:select={handleSelect} />
      </div>
    {/each}
  {/if}
</div>

<style>
  .bang-grid {
    display: grid;
    grid-template-columns: var(--grid-columns, repeat(auto-fill, minmax(180px, 1fr)));
    gap: 0.75rem;
    width: 100%;
    max-width: 100%;
    position: relative;
    min-height: 120px;
  }

  .bang-grid-item {
    animation-fill-mode: both;
    opacity: 0;
    transform: translateY(8px);
    animation: itemEntrance 0.25s cubic-bezier(0.2, 0.0, 0.2, 1) forwards;
    animation-delay: calc(var(--animation-order, 0) * 20ms);
  }

  @keyframes itemEntrance {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .loading-state {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: var(--grid-columns, repeat(auto-fill, minmax(180px, 1fr)));
    gap: 0.75rem;
    width: 100%;
  }

  .bang-card-skeleton {
    height: 60px;
    background: var(--skeleton-bg, #f0f0f0);
    border-radius: 8px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.3; }
    100% { opacity: 0.6; }
  }

  .empty-state {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: var(--text-muted, #888);
    font-size: 0.9rem;
    text-align: center;
  }

  :global([data-theme="light"]) {
    --skeleton-bg: #f0f0f0;
    --text-muted: #888;
  }

  :global([data-theme="dark"]) {
    --skeleton-bg: rgba(255, 255, 255, 0.08);
    --text-muted: #666;
  }

  @media (prefers-color-scheme: light) {
    :root:not([data-theme]) {
      --skeleton-bg: #f0f0f0;
      --text-muted: #888;
    }
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --skeleton-bg: rgba(255, 255, 255, 0.08);
      --text-muted: #666;
    }
  }

  @media (max-width: 1200px) {
    .bang-grid {
      gap: 0.7rem;
    }
  }

  @media (max-width: 768px) {
    .bang-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 0.6rem;
    }
  }

  @media (max-width: 640px) {
    .bang-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }
  }

  @media (max-width: 480px) {
    .bang-grid {
      /* grid-template-columns: repeat(2, 1fr); */
      gap: 0.5rem;
    }
  }

  .bang-grid {
    contain: layout style;
  }

  @media print {
    .bang-grid {
      display: block;
    }

    .bang-grid-item {
      display: inline-block;
      width: 33%;
      margin-bottom: 1rem;
      page-break-inside: avoid;
    }
  }
</style>
