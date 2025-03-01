<script lang='ts'>
  import type { BangCommand } from '../../../lib/fetch-bang'
  import { createEventDispatcher, onMount } from 'svelte'

  export let bang: BangCommand
  export let highlight = false

  let domainFavicon: string | null = null
  let faviconLoaded = false
  let firstLetter = ''

  const dispatch = createEventDispatcher<{
    select: BangCommand
  }>()

  $: firstLetter = bang.s.charAt(0).toUpperCase()

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
    dispatch('select', bang)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  $: displayName = bang.s.length > 20 ? `${bang.s.substring(0, 18)}...` : bang.s
</script>

<button
  class='bang-card'
  class:highlight
  on:click={handleClick}
  on:keydown={handleKeyDown}
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
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
    overflow: hidden;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .bang-card:hover {
    background-color: var(--card-hover-bg, #f3f3f3);
  }

  .bang-card:focus-visible {
    box-shadow: 0 0 0 2px var(--focus-ring, rgba(0, 0, 0, 0.2));
  }

  .bang-card.highlight {
    background-color: var(--card-highlight-bg, rgba(0, 0, 0, 0.03));
  }

  .bang-card-content {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .bang-card-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--icon-bg, rgba(0, 0, 0, 0.04));
  }

  .favicon {
    width: 16px;
    height: 16px;
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
    font-size: 12px;
    letter-spacing: -0.02em;
  }

  .bang-card-info {
    flex-grow: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .bang-card-tag {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 2px;
    color: var(--tag-color, #000);
    font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;;
    letter-spacing: -0.01em;
  }

  .bang-card-name {
    font-size: 0.8rem;
    color: var(--name-color, #666);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    font-weight: 450;
  }

  .bang-card:active {
    transform: scale(0.98);
    transition-duration: 0.1s;
  }

  :global([data-theme="light"]) {
    --card-bg: #f9f9f9;
    --card-border: rgba(0, 0, 0, 0.06);
    --card-hover-bg: #f3f3f3;
    --card-highlight-bg: rgba(0, 0, 0, 0.03);
    --focus-ring: rgba(0, 0, 0, 0.2);
    --icon-bg: rgba(0, 0, 0, 0.04);
    --icon-color: #666;
    --icon-hover-bg: rgba(0, 0, 0, 0.06);
    --tag-color: #000;
    --name-color: #666;
  }

  :global([data-theme="dark"]) {
    --card-bg: #1c1c1e;
    --card-border: rgba(255, 255, 255, 0.08);
    --card-hover-bg: #2c2c2e;
    --card-highlight-bg: rgba(255, 255, 255, 0.05);
    --focus-ring: rgba(255, 255, 255, 0.3);
    --icon-bg: rgba(255, 255, 255, 0.08);
    --icon-hover-bg: rgba(255, 255, 255, 0.12);
    --icon-color: #ccc;
    --tag-color: #fff;
    --name-color: #999;
  }

  @media (prefers-color-scheme: light) {
    :root:not([data-theme]) {
      --card-bg: #f9f9f9;
      --card-border: rgba(0, 0, 0, 0.06);
      --card-hover-bg: #f3f3f3;
      --card-highlight-bg: rgba(0, 0, 0, 0.03);
      --focus-ring: rgba(0, 0, 0, 0.2);
      --icon-bg: rgba(0, 0, 0, 0.04);
      --icon-color: #666;
      --icon-hover-bg: rgba(0, 0, 0, 0.06);
      --tag-color: #000;
      --name-color: #666;
    }
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --card-bg: #1c1c1e;
      --card-border: rgba(255, 255, 255, 0.08);
      --card-hover-bg: #2c2c2e;
      --card-highlight-bg: rgba(255, 255, 255, 0.05);
      --focus-ring: rgba(255, 255, 255, 0.3);
      --icon-bg: rgba(255, 255, 255, 0.08);
      --icon-hover-bg: rgba(255, 255, 255, 0.12);
      --icon-color: #ccc;
      --tag-color: #fff;
      --name-color: #999;
    }
  }

  @media (max-width: 768px) {
    .bang-card {
      padding: 0.7rem 0.9rem;
    }

    .bang-card-icon {
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }

    .bang-card-tag {
      font-size: 0.9rem;
    }

    .bang-card-name {
      font-size: 0.75rem;
    }
  }

  .bang-card {
    font-family: "Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @keyframes cardEntrance {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .bang-card {
    animation: cardEntrance 0.2s ease-out forwards;
    animation-delay: calc(var(--animation-order, 0) * 20ms);
  }

  .bang-card {
    will-change: transform;
    backface-visibility: hidden;
  }

  .bang-card:focus:not(:focus-visible) {
    box-shadow: none;
  }

  .bang-card {
    user-select: none;
  }

  .bang-card:hover .bang-card-icon {
    background-color: var(--icon-hover-bg, rgba(0, 0, 0, 0.06));
  }

  @media (forced-colors: active) {
    .bang-card {
      border: 1px solid CanvasText;
    }

    .bang-card:focus-visible {
      outline: 2px solid Highlight;
    }
  }
</style>
