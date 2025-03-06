<script lang='ts'>
  import type { BangCommand } from '../../../lib/fetch-bang'
  import { onMount } from 'svelte'

  import '../../styles/themes.css'
  import '../../styles/typography.css'
  import '../../styles/animations.css'

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
      <div class='bang-card-tag'>!{bang.t}</div>
      <div class='bang-card-name' title={bang.s}>{displayName}</div>
    </div>
  </div>
</button>

<style>
.bang-card {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--card-bg, #f9f9f9);
  border: 1px solid var(--card-border, rgba(0, 0, 0, 0.06));
  border-radius: 8px;
  padding: 0.8rem 1rem;
  width: 100%;
  height: 72px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  font-family: "Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  animation: cardEntrance 0.2s ease-out forwards;
  animation-delay: calc(var(--animation-order, 0) * 20ms);
  will-change: transform;
  backface-visibility: hidden;
  user-select: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.bang-card:hover {
  background-color: var(--card-hover-bg, #f3f3f3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
}

.bang-card:focus-visible {
  box-shadow: 0 0 0 2px var(--focus-ring, rgba(0, 0, 0, 0.2));
}

.bang-card:focus:not(:focus-visible) {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.bang-card.highlight {
  background-color: var(--card-highlight-bg, rgba(0, 0, 0, 0.03));
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.bang-card:active {
  transform: scale(0.98);
  transition-duration: 0.1s;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.03);
}

.bang-card-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.bang-card-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  margin-right: 14px;
  border-radius: 7px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--icon-bg, rgba(0, 0, 0, 0.04));
  transition: background-color 0.2s ease;
}

.bang-card:hover .bang-card-icon {
  background-color: var(--icon-hover-bg, rgba(0, 0, 0, 0.06));
}

.favicon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.fallback-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--icon-color, #666);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
}

.bang-card-info {
  flex-grow: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bang-card-tag {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
  color: var(--tag-color, #000);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.bang-card-name {
  font-size: 0.85rem;
  color: var(--name-color, #666);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-weight: 450;
  line-height: 1.2;
  opacity: 0.85;
}

@media (max-width: 768px) {
  .bang-card {
    height: 64px;
    padding: 0.7rem 0.9rem;
  }

  .bang-card-icon {
    width: 28px;
    height: 28px;
    margin-right: 12px;
  }

  .bang-card-tag {
    font-size: 0.95rem;
    margin-bottom: 3px;
  }

  .bang-card-name {
    font-size: 0.8rem;
  }
}
</style>
