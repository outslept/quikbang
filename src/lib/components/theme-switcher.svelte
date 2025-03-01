<script lang='ts'>
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'

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
    {#if appliedTheme === 'dark'}
      <!-- Moon icon for dark mode -->
      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>
        <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
      </svg>
    {:else}
      <!-- Sun icon for light mode -->
      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>
        <circle cx='12' cy='12' r='5'></circle>
        <line x1='12' y1='1' x2='12' y2='3'></line>
        <line x1='12' y1='21' x2='12' y2='23'></line>
        <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
        <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
        <line x1='1' y1='12' x2='3' y2='12'></line>
        <line x1='21' y1='12' x2='23' y2='12'></line>
        <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
        <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
      </svg>
    {/if}
    <span class='theme-label'>{themeName}</span>
    <svg class='dropdown-arrow' xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>
      <polyline points='6 9 12 15 18 9'></polyline>
    </svg>
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
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>
          <circle cx='12' cy='12' r='5'></circle>
          <line x1='12' y1='1' x2='12' y2='3'></line>
          <line x1='12' y1='21' x2='12' y2='23'></line>
          <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
          <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
          <line x1='1' y1='12' x2='3' y2='12'></line>
          <line x1='21' y1='12' x2='23' y2='12'></line>
          <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
          <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
        </svg>
        <span>Light</span>
      </button>

      <button
        class='theme-option'
        class:active={currentTheme === 'dark'}
        on:click={() => setTheme('dark')}
        role='menuitem'
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>
          <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
        </svg>
        <span>Dark</span>
      </button>

      <button
        class='theme-option'
        class:active={currentTheme === 'system'}
        on:click={() => setTheme('system')}
        role='menuitem'
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>
          <rect x='2' y='3' width='20' height='14' rx='2' ry='2'></rect>
          <line x1='8' y1='21' x2='16' y2='21'></line>
          <line x1='12' y1='17' x2='12' y2='21'></line>
        </svg>
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
  background-color: var(--button-bg, rgba(0, 0, 0, 0.03));
  color: var(--button-color, #666);
  border: 1px solid var(--button-border, rgba(0, 0, 0, 0.05));
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.theme-button:hover {
  background-color: var(--button-hover-bg, rgba(0, 0, 0, 0.05));
  color: var(--button-hover-color, #333);
}

.theme-button:focus-visible {
  box-shadow: 0 0 0 2px var(--focus-ring, rgba(0, 0, 0, 0.1));
}

.theme-label {
  font-size: 0.85rem;
  margin: 0 2px 0 0;
}

.dropdown-arrow {
  opacity: 0.6;
  transition: transform 0.15s ease;
}

.theme-button[aria-expanded="true"] .dropdown-arrow {
  transform: rotate(180deg);
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--dropdown-bg, #fff);
  border-radius: 8px;
  box-shadow: var(--dropdown-shadow, 0 4px 12px rgba(0, 0, 0, 0.1));
  border: 1px solid var(--dropdown-border, rgba(0, 0, 0, 0.08));
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
  color: var(--option-color, #333);
  transition: background-color 0.15s ease;
}

.theme-option:hover {
  background-color: var(--option-hover-bg, rgba(0, 0, 0, 0.04));
}

.theme-option.active {
  background-color: var(--option-active-bg, rgba(0, 0, 0, 0.06));
  font-weight: 500;
}

:global([data-theme="dark"]) {
  --button-bg: rgba(255, 255, 255, 0.06);
  --button-color: #aaa;
  --button-border: rgba(255, 255, 255, 0.08);
  --button-hover-bg: rgba(255, 255, 255, 0.1);
  --button-hover-color: #fff;
  --focus-ring: rgba(255, 255, 255, 0.2);
  --dropdown-bg: #222;
  --dropdown-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  --dropdown-border: rgba(255, 255, 255, 0.1);
  --option-color: #ddd;
  --option-hover-bg: rgba(255, 255, 255, 0.08);
  --option-active-bg: rgba(255, 255, 255, 0.12);
}

:global([data-theme="light"]) {
  --button-bg: rgba(0, 0, 0, 0.03);
    --button-color: #666;
    --button-border: rgba(0, 0, 0, 0.05);
    --button-hover-bg: rgba(0, 0, 0, 0.05);
    --button-hover-color: #333;
    --focus-ring: rgba(0, 0, 0, 0.1);
    --dropdown-bg: #fff;
    --dropdown-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    --dropdown-border: rgba(0, 0, 0, 0.08);
    --option-color: #333;
    --option-hover-bg: rgba(0, 0, 0, 0.04);
    --option-active-bg: rgba(0, 0, 0, 0.06);
  }

  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme])) {
      --button-bg: rgba(255, 255, 255, 0.06);
      --button-color: #aaa;
      --button-border: rgba(255, 255, 255, 0.08);
      --button-hover-bg: rgba(255, 255, 255, 0.1);
      --button-hover-color: #fff;
      --focus-ring: rgba(255, 255, 255, 0.2);
      --dropdown-bg: #222;
      --dropdown-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      --dropdown-border: rgba(255, 255, 255, 0.1);
      --option-color: #ddd;
      --option-hover-bg: rgba(255, 255, 255, 0.08);
      --option-active-bg: rgba(255, 255, 255, 0.12);
    }
  }

  @media (prefers-color-scheme: light) {
    :global(:root:not([data-theme])) {
      --button-bg: rgba(0, 0, 0, 0.03);
      --button-color: #666;
      --button-border: rgba(0, 0, 0, 0.05);
      --button-hover-bg: rgba(0, 0, 0, 0.05);
      --button-hover-color: #333;
      --focus-ring: rgba(0, 0, 0, 0.1);
      --dropdown-bg: #fff;
      --dropdown-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      --dropdown-border: rgba(0, 0, 0, 0.08);
      --option-color: #333;
      --option-hover-bg: rgba(0, 0, 0, 0.04);
      --option-active-bg: rgba(0, 0, 0, 0.06);
    }
  }

  @media (max-width: 480px) {
    .theme-button {
      padding: 5px 8px;
    }

    .theme-label {
      display: none;
    }

    .dropdown-arrow {
      display: none;
    }

    .theme-dropdown {
      right: -10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .theme-dropdown, .dropdown-arrow {
      transition: none;
    }

    .theme-button, .theme-option {
      transition: none;
    }
  }

  @media (forced-colors: active) {
    .theme-button,
    .theme-option {
      border: 1px solid ButtonBorder;
    }

    .theme-option.active {
      background-color: Highlight;
      color: HighlightText;
    }
  }

  .theme-option:focus-visible {
    outline: 2px solid var(--focus-ring, rgba(0, 0, 0, 0.1));
    outline-offset: -1px;
  }
</style>
