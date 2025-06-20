<script lang='ts'>
  import type { BangCommand } from '../../../scripts/fetch-bang'
  import { fade } from 'svelte/transition'
  import BangCard from './bang-card.svelte'

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
