<script lang='ts'>
  import type { BangCommand } from '../../../lib/fetch-bang'
  import { fade } from 'svelte/transition'
  import BangCard from './bang-card.svelte'

  import '../../styles/themes.css'

  const { bangs = [], loading = false, columns = 'auto', selectBang } = $props<{
    bangs: BangCommand[]
    loading?: boolean
    columns?: string | number
    selectBang?: (bang: BangCommand) => void
  }>()

  let gridElement = $state<HTMLElement | null>(null)

  function handleSelect(bang: BangCommand) {
    if (selectBang)
      selectBang(bang)
  }

  const gridTemplateColumns = $derived(getGridTemplateColumns(columns))

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
      {#each Array.from({ length: 8 }) as _}
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
        <BangCard
          bang={bang}
          select={selectedBang => handleSelect(selectedBang)}
        />
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
    contain: layout style;
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
</style>
