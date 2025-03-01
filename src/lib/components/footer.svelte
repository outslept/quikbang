<script lang='ts'>
  import { onMount } from 'svelte'
  import pkg from '../../../package.json'

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
          <svg viewBox='0 0 24 24' height='16' width='16' aria-hidden='true' focusable='false'>
            <!-- TypeScript logo -->
            <path fill='currentColor' d='M3,3H21V21H3V3M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86M13,11.25H8V12.75H9.5V20H11.25V12.75H13V11.25Z' />
          </svg>
        </span>
        <span class='tech-logo' title='Svelte'>
          <svg viewBox='0 0 107 128' height='16' width='16' aria-hidden='true' focusable='false'>
            <!-- Svelte logo -->
            <path fill='currentColor' d='M94.1566,22.8189c-10.4-14.8851-30.94-19.2971-45.7914-9.8348L22.2825,29.6078A29.9234,29.9234,0,0,0,8.7639,49.6506a31.5136,31.5136,0,0,0,3.1076,20.2318A30.0061,30.0061,0,0,0,7.3953,81.0653a31.8886,31.8886,0,0,0,5.4473,24.1157c10.4022,14.8865,30.9423,19.2966,45.7914,9.8348L84.7167,98.3921A29.9177,29.9177,0,0,0,98.2353,78.3493,31.5263,31.5263,0,0,0,95.13,58.117a30,30,0,0,0,4.4743-11.1824,31.88,31.88,0,0,0-5.4473-24.1157' />
            <path fill='none' stroke='currentColor' d='M45.2174,46.5216l-5.0271,3.5422a3.6,3.6,0,0,0-.7642,5.0193,3.6,3.6,0,0,0,5.0222.7637l5.0271-3.5422a3.6,3.6,0,0,0,.7642-5.0193,3.6,3.6,0,0,0-5.0222-.7637' />
            <path fill='none' stroke='currentColor' d='M69.1231,60.7727A7.9997,7.9997,0,0,0,63.6527,57.146a7.9997,7.9997,0,0,0-2.3166,7.5744,7.9997,7.9997,0,0,0,5.4704,3.6268,7.9997,7.9997,0,0,0,2.3166-7.5744' />
            <path fill='none' stroke='currentColor' d='M57.0413,72.0632a8.0004,8.0004,0,0,0-5.4687-3.6274,8.0004,8.0004,0,0,0-2.3166,7.5746,8.0004,8.0004,0,0,0,5.4687,3.6274,8.0004,8.0004,0,0,0,2.3166-7.5746' />
          </svg>
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
            <svg viewBox='0 0 24 24' width='16' height='16'>
              <path fill='currentColor' d='M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z' />
            </svg>
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
  border-top: 1px solid var(--footer-border, rgba(0, 0, 0, 0.05));
  color: var(--footer-text, #888);
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
  color: var(--brand-color, #333);
}

.tech-logo {
  display: inline-flex;
  align-items: center;
  margin: 0 0.25rem;
  vertical-align: middle;
}

.tech-logo svg {
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
  color: var(--count-color, #555);
}

.footer-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--meta-color, #999);
}

.footer-link {
  color: var(--link-color, #666);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--link-hover, #000);
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

@media (prefers-color-scheme: dark) {
  :root {
    --footer-border: rgba(255, 255, 255, 0.08);
    --footer-text: #777;
    --brand-color: #ccc;
    --count-color: #aaa;
    --meta-color: #666;
    --link-color: #999;
    --link-hover: #fff;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --footer-border: rgba(0, 0, 0, 0.05);
    --footer-text: #888;
    --brand-color: #333;
    --count-color: #555;
    --meta-color: #999;
    --link-color: #666;
    --link-hover: #000;
  }
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
