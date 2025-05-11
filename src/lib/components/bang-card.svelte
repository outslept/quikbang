<script lang='ts'>
  import type { BangCommand } from '../../../lib/fetch-bang'
  import { onMount } from 'svelte'

  const { bang, highlight = false, select } = $props<{
    bang: BangCommand
    highlight?: boolean
    select?: (bang: BangCommand) => void
  }>()

  let domainFavicon = $state<string | null>(null)
  let faviconLoaded = $state(false)

  const firstLetter = $derived(bang.s.charAt(0).toUpperCase())
  const displayName = $derived(bang.s.length > 20 ? `${bang.s.substring(0, 18)}...` : bang.s)

  onMount(() => {
    if (bang.d) {
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${bang.d}&sz=32`
      const img = new Image()
      img.onload = () => {
        domainFavicon = faviconUrl
        faviconLoaded = true
      }
      img.onerror = () => {
        domainFavicon = null
        faviconLoaded = false
      }
      img.src = faviconUrl
    }
  })

  function handleClick() {
    if (select)
      select(bang)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }
</script>

<button
  class='bang-card'
  class:highlight
  onclick={handleClick}
  onkeydown={handleKeyDown}
  aria-label='Use {bang.s} bang command: !{bang.t}'
  title='{bang.s} - !{bang.t} - {bang.c} ({bang.sc})'
>
  <div class='bang-card-content'>
    <div class='bang-card-icon'>
      {#if faviconLoaded && domainFavicon}
        <img src={domainFavicon} alt="" class='favicon' />
      {:else}
        <div class='fallback-icon'>
          {firstLetter}
        </div>
      {/if}
    </div>

    <div class='bang-card-info'>
      <div class='bang-card-tag mono-text'>!{bang.t}</div>
      <div class='bang-card-name' title={bang.s}>{displayName}</div>
    </div>
  </div>
</button>
