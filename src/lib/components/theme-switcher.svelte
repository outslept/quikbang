<script lang='ts'>
  import { slide } from 'svelte/transition'
  import ArrowDownIcon from './icons/arrow-down-icon.svelte'
  import MoonIcon from './icons/moon-icon.svelte'
  import SunIcon from './icons/sun-icon.svelte'
  import SystemThemeIcon from './icons/system-theme-icon.svelte'

  type Theme = 'light' | 'dark' | 'system'

  let currentTheme = $state<Theme>('system')
  let appliedTheme = $state<'light' | 'dark'>('light')
  let showDropdown = $state(false)

  const themeNames = { light: 'Light', dark: 'Dark', system: 'System' } as const

  const getStoredTheme = (): Theme => {
    if (typeof window === 'undefined')
      return 'system'
    const stored = localStorage.getItem('theme')
    return (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system'
  }

  const getSystemTheme = (): 'light' | 'dark' =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  const applyTheme = (theme: Theme): void => {
    if (typeof document === 'undefined')
      return

    const themeToApply = theme === 'system' ? getSystemTheme() : theme
    document.documentElement.setAttribute('data-theme', themeToApply)
    appliedTheme = themeToApply
  }

  const toggleTheme = (event: MouseEvent): void => {
    event.stopPropagation()
    showDropdown = !showDropdown
  }

  const setTheme = (theme: Theme): void => {
    currentTheme = theme
    localStorage.setItem('theme', theme)
    applyTheme(theme)
    showDropdown = false
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.theme-switch')) {
      showDropdown = false
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && showDropdown) {
      showDropdown = false
    }
  }

  $effect(() => {
    currentTheme = getStoredTheme()
    applyTheme(currentTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => currentTheme === 'system' && applyTheme('system')

    mediaQuery.addEventListener?.('change', handleChange) ?? mediaQuery.addListener?.(handleChange)
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange) ?? mediaQuery.removeListener?.(handleChange)
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
</script>

<div class='theme-switch'>
  <button
    type='button'
    class='theme-button'
    aria-label='Toggle theme settings'
    aria-expanded={showDropdown}
    aria-haspopup='true'
    title='Change theme (currently: {themeNames[currentTheme]})'
    onclick={toggleTheme}
  >
    {#if currentTheme === 'system'}
      <SystemThemeIcon />
    {:else if appliedTheme === 'dark'}
      <MoonIcon />
    {:else}
      <SunIcon />
    {/if}
    <span class='theme-label'>{themeNames[currentTheme]}</span>
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
      {#each Object.entries(themeNames) as [theme, label]}
        <button
          class='theme-option'
          class:active={currentTheme === theme}
          onclick={() => setTheme(theme as Theme)}
          role='menuitem'
        >
          {#if theme === 'light'}
            <SunIcon />
          {:else if theme === 'dark'}
            <MoonIcon />
          {:else}
            <SystemThemeIcon />
          {/if}
          <span>{label}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>
