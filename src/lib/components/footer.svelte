<script lang='ts'>
  import { onMount } from 'svelte'
  import pkg from '../../../package.json'
  import GithubIcon from './icons/github-icon.svelte'
  import SvelteIcon from './icons/svelte-icon.svelte'
  import TypescriptIcon from './icons/typescript-icon.svelte'

  export let bangs: Record<string, any> = {}
  export let version: string = pkg.version
  export let showGitHub: boolean = true
  export let githubUrl: string = 'https://github.com/outslept/quikbang'

  const year = new Date().getFullYear()
  let commandCount = 0

  onMount(() => {
    commandCount = Object.keys(bangs).length
  })
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
        {#if commandCount > 0}
          <span class='command-count'>Total commands: <strong>{commandCount}</strong></span>
        {/if}
      </p>

      <div class='footer-meta'>
        {#if showGitHub}
          <a href={githubUrl} class='footer-link github-link' target='_blank' rel='noopener noreferrer'>
            <GithubIcon />
            <span>GitHub</span>
          </a>
        {/if}
        <span class='version'>v{version}</span>
        <span class='copyright'>© {year}</span>
      </div>
    </div>
  </div>
</footer>

<style>
  footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--footer-border);
    color: var(--footer-text);
    font-size: 0.9rem;
    line-height: 1.6;
    width: 100%;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .footer-branding,
  .footer-data {
    text-align: center;
  }

  p {
    margin: 0.4rem 0;
  }

  .brand-name {
    font-weight: 600;
    color: var(--brand-color);
  }

  .tech-logo {
    display: inline-flex;
    align-items: center;
    margin: 0 0.25rem;
    vertical-align: middle;
  }

  .footer-tech {
    font-size: 0.85rem;
    opacity: 0.9;
  }

  .data-source {
    font-size: 0.85rem;
  }

  .command-count {
    margin-left: 0.25rem;
  }

  .command-count strong {
    font-weight: 600;
    color: var(--count-color);
  }

  .footer-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: var(--meta-color);
  }

  .footer-link {
    color: var(--link-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: var(--link-hover);
    text-decoration: underline;
  }

  .github-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .version {
    font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  }

  :global(.dark) {
    --footer-border: rgba(255, 255, 255, 0.08);
    --footer-text: #777;
    --brand-color: #ccc;
    --count-color: #aaa;
    --meta-color: #666;
    --link-color: #999;
    --link-hover: #ddd;
  }

  :global(:not(.dark)) {
    --footer-border: rgba(0, 0, 0, 0.05);
    --footer-text: #888;
    --brand-color: #333;
    --count-color: #555;
    --meta-color: #999;
    --link-color: #666;
    --link-hover: #333;
  }

  @media (min-width: 768px) {
    .footer-content {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }

    .footer-branding,
    .footer-data {
      text-align: left;
    }

    .footer-meta {
      justify-content: flex-end;
    }
  }

  @media (max-width: 480px) {
    footer {
      margin-top: 2rem;
      padding-top: 1rem;
    }

    .footer-meta {
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  footer {
    animation: fadeIn 0.5s ease-out;
  }

  @media (forced-colors: active) {
    .footer-link {
      text-decoration: underline;
    }
  }
  </style>
