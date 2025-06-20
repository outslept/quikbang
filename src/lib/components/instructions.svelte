<script>
  import ArrowIcon from './icons/arrow-icon.svelte'

  export let defaultSearch = 'Google'
  export let domain = 'quikbang.vercel.app'

  const examples = [
    { command: '!w Svelte', result: 'Search Wikipedia for "Svelte"' },
    { command: '!yt music', result: 'Search YouTube for "music"' },
    { command: '!gh svelte', result: 'Search GitHub for "svelte"' }
  ]

  const browsers = ['Chrome', 'Safari', 'Firefox']
</script>

<section class="instructions-section">
  <h2>How to Use</h2>

  <div class="instruction-cards">
    <div class="instruction-card">
      <div class="step-marker">
        <div class="step-number">1</div>
      </div>
      <div class="step-content">
        <h3>Set as Search Engine</h3>
        <p>Add <code class="mono-text">https://{domain}?q=%s</code> as a custom search engine in your browser settings.</p>
        <div class="browser-hints">
          {#each browsers as browser}
            <span class="browser-hint">
              <span>{browser}</span>
            </span>
          {/each}
        </div>
      </div>
    </div>

    <div class="instruction-card">
      <div class="step-marker">
        <div class="step-number">2</div>
      </div>
      <div class="step-content">
        <h3>Use Bang Commands</h3>
        <p>Type bang commands directly in your address bar:</p>
        {#each examples as { command, result }}
          <div class="examples">
            <code class="example mono-text">{command}</code>
            <span class="example-arrow">
              <ArrowIcon />
            </span>
            <span class="example-result">{result}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="instruction-card">
      <div class="step-marker">
        <div class="step-number">3</div>
      </div>
      <div class="step-content">
        <h3>Default Search</h3>
        <p>If no bang command is specified, search will use {defaultSearch}.</p>
        <div class="examples">
          <code class="example mono-text">typescript tutorial</code>
          <span class="example-arrow">
            <ArrowIcon />
          </span>
          <span class="example-result">Search {defaultSearch} for "typescript tutorial"</span>
        </div>
      </div>
    </div>
  </div>

  <div class="keyboard-shortcut-tip">
    <span>
      Pro tip: Use
      <kbd class="mono-text">Cmd</kbd>+<kbd class="mono-text">L</kbd> (Mac) or
      <kbd class="mono-text">Ctrl</kbd>+<kbd class="mono-text">L</kbd> (Windows)
      to quickly focus the address bar.
    </span>
  </div>
</section>
