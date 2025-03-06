<script lang='ts'>
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import ArrowDownIcon from './icons/arrow-down-icon.svelte'
  import MoonIcon from './icons/moon-icon.svelte'
  import SunIcon from './icons/sun-icon.svelte'
  import SystemThemeIcon from './icons/system-theme-icon.svelte'

  type Theme = 'light' | 'dark' | 'system'

  let currentTheme: Theme = 'system'
  let appliedTheme: 'light' | 'dark' = 'light'
  let showDropdown = false

  function getStoredTheme(): Theme {
    if (typeof window === 'undefined')
      return 'system'

    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      return storedTheme
    }
    return 'system'
  }

  function getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined')
      return 'light'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  function applyTheme(theme: Theme): void {
    if (typeof document === 'undefined')
      return

    const themeToApply = theme === 'system'
      ? getSystemTheme()
      : theme

    document.documentElement.setAttribute('data-theme', themeToApply)

    appliedTheme = themeToApply as 'light' | 'dark'
  }

  function toggleTheme(event: MouseEvent): void {
    event.stopPropagation()
    showDropdown = !showDropdown
  }

  function setTheme(theme: Theme): void {
    currentTheme = theme
    localStorage.setItem('theme', theme)
    applyTheme(theme)
    showDropdown = false
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target.closest('.theme-switch')) {
      showDropdown = false
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showDropdown) {
      showDropdown = false
    }
  }

  onMount(() => {
    currentTheme = getStoredTheme()

    applyTheme(currentTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (currentTheme === 'system') {
        applyTheme('system')
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    }
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      }
      else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange)
      }
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  $: themeName = {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  }[currentTheme]
</script>

<div class='theme-switch'>
  <button
    type='button'
    class='theme-button'
    aria-label='Toggle theme settings'
    aria-expanded={showDropdown}
    aria-haspopup='true'
    title='Change theme (currently: {themeName})'
    on:click={toggleTheme}
  >
    {#if currentTheme === 'system'}
      <SystemThemeIcon />
    {:else if appliedTheme === 'dark'}
      <MoonIcon />
    {:else}
      <SunIcon />
    {/if}
    <span class='theme-label'>{themeName}</span>
    <span class='arrow-icon' class:rotated={showDropdown}>
      <ArrowDownIcon />
    </span>
  </button>

  {#if showDropdown}
    <div
      class='theme-dropdown'
      role='menu'
      aria-label='Theme options'
      transition:slide={{ duration: 150 }}
    >
      <button
        class='theme-option'
        class:active={currentTheme === 'light'}
        on:click={() => setTheme('light')}
        role='menuitem'
      >
        <SunIcon />
        <span>Light</span>
      </button>

      <button
        class='theme-option'
        class:active={currentTheme === 'dark'}
        on:click={() => setTheme('dark')}
        role='menuitem'
      >
        <MoonIcon />
        <span>Dark</span>
      </button>

      <button
        class='theme-option'
        class:active={currentTheme === 'system'}
        on:click={() => setTheme('system')}
        role='menuitem'
      >
        <SystemThemeIcon />
        <span>System</span>
      </button>
    </div>
  {/if}
</div>

<style>
  .theme-switch {
    position: relative;
    display: inline-block;
    font-family: var(--font-sans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  }

  .theme-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: var(--button-bg);
    color: var(--button-color);
    border: 1px solid var(--button-border);
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    outline: none;
  }

  .theme-button:hover {
    background-color: var(--button-hover-bg);
    color: var(--button-hover-color);
  }

  .theme-button:focus-visible {
    box-shadow: 0 0 0 2px var(--focus-ring);
  }

  .theme-label {
    font-size: 0.85rem;
    margin: 0 2px 0 0;
  }

  .arrow-icon {
    display: inline-flex;
    transition: transform 0.2s ease;
  }

  .arrow-icon.rotated {
    transform: rotate(180deg);
  }

  .theme-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: var(--dropdown-bg);
    border-radius: 8px;
    box-shadow: var(--dropdown-shadow);
    border: 1px solid var(--dropdown-border);
    padding: 6px;
    width: 140px;
    z-index: 50;
  }

  .theme-option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    border-radius: 6px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.85rem;
    color: var(--option-color);
    transition: background-color 0.15s ease;
  }

  .theme-option:hover {
    background-color: var(--option-hover-bg);
  }

  .theme-option.active {
    background-color: var(--option-active-bg);
    font-weight: 500;
  }

  .theme-option:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: -1px;
  }

  @media (max-width: 480px) {
    .theme-button {
      padding: 5px 8px;
    }

    .theme-label {
      display: none;
    }

    .theme-dropdown {
      right: -10px;
      width: 160px;
    }

    .theme-option {
      padding: 10px;
    }
  }
</style>
