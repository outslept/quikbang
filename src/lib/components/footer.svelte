<script lang='ts'>
  import pkg from '../../../package.json'
  import GithubIcon from './icons/github-icon.svelte'
  import SvelteIcon from './icons/svelte-icon.svelte'
  import TypescriptIcon from './icons/typescript-icon.svelte'

  const {
    bangs = {},
    version = pkg.version,
    showGitHub = true,
    githubUrl = 'https://github.com/outslept/quikbang',
  } = $props<{
    bangs?: Record<string, any>
    version?: string
    showGitHub?: boolean
    githubUrl?: string
  }>()
</script>

<footer>
  <div class='footer-content'>
    <div class='footer-branding'>
      <p class='footer-tagline'>
        <span class='brand-name'>Quikbang</span> — Fast search with bang commands
      </p>
      <p class='footer-tech'>
        Built with
        <span class='tech-logo' title='TypeScript'>
          <TypescriptIcon />
        </span>
        <span class='tech-logo' title='Svelte'>
          <SvelteIcon />
        </span>
      </p>
    </div>

    <div class='footer-data'>
      <p class='data-source'>
        Bang commands data from
        <a href='https://duckduckgo.com/bang' class='footer-link' target='_blank' rel='noopener noreferrer'>DuckDuckGo</a>.
        {#if Object.keys(bangs).length > 0}
          <span class='command-count'>Total commands: <strong>{Object.keys(bangs).length}</strong></span>
        {/if}
      </p>

      <div class='footer-meta'>
        {#if showGitHub}
          <a href={githubUrl} class='footer-link github-link' target='_blank' rel='noopener noreferrer'>
            <GithubIcon />
            <span>GitHub</span>
          </a>
        {/if}
        <span class='version mono-text'>v{version}</span>
        <span class='copyright'>© {new Date().getFullYear()}</span>
      </div>
    </div>
  </div>
</footer>
