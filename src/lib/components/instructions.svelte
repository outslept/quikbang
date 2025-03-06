<script>
  import ArrowIcon from './icons/arrow-icon.svelte'

  export let defaultSearch = 'Google'
  export let domain = 'quikbang.vercel.app'
</script>

<section class='instructions-section'>
  <h2>How to Use</h2>

  <div class='instruction-cards'>
    <div class='instruction-card'>
      <div class='step-marker'>
        <div class='step-number'>1</div>
      </div>
      <div class='step-content'>
        <h3>Set as Search Engine</h3>
        <p>Add <code>https://{domain}?q=%s</code> as a custom search engine in your browser settings.</p>
        <div class='browser-hints'>
          <span class='browser-hint'>
            <span>Chrome</span>
          </span>
          <span class='browser-hint'>
            <span>Safari</span>
          </span>
          <span class='browser-hint'>
            <span>Firefox</span>
          </span>
        </div>
      </div>
    </div>

    <div class='instruction-card'>
      <div class='step-marker'>
        <div class='step-number'>2</div>
      </div>
      <div class='step-content'>
        <h3>Use Bang Commands</h3>
        <p>Type bang commands directly in your address bar:</p>
        <div class='examples'>
          <code class='example'>!w Svelte</code>
          <span class='example-arrow'>
            <ArrowIcon />
          </span>
          <span class='example-result'>Search Wikipedia for "Svelte"</span>
        </div>
        <div class='examples'>
          <code class='example'>!yt music</code>
          <span class='example-arrow'>
            <ArrowIcon />
          </span>
          <span class='example-result'>Search YouTube for "music"</span>
        </div>
        <div class='examples'>
          <code class='example'>!gh svelte</code>
          <span class='example-arrow'>
            <ArrowIcon />
          </span>
          <span class='example-result'>Search GitHub for "svelte"</span>
        </div>
      </div>
    </div>

    <div class='instruction-card'>
      <div class='step-marker'>
        <div class='step-number'>3</div>
      </div>
      <div class='step-content'>
        <h3>Default Search</h3>
        <p>If no bang command is specified, search will use {defaultSearch}.</p>
        <div class='examples'>
          <code class='example'>typescript tutorial</code>
          <span class='example-arrow'>
            <ArrowIcon />
          </span>
          <span class='example-result'>Search {defaultSearch} for "typescript tutorial"</span>
        </div>
      </div>
    </div>
  </div>

  <div class='keyboard-shortcut-tip'>
    <span>Pro tip: Use <kbd>Cmd</kbd>+<kbd>L</kbd> (Mac) or <kbd>Ctrl</kbd>+<kbd>L</kbd> (Windows) to quickly focus the address bar.</span>
  </div>
</section>

<style>
.instructions-section {
  background-color: var(--section-bg);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--section-border);
  transition: box-shadow 0.3s ease;
}

.instructions-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 1.75rem;
  color: var(--heading-color);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.instruction-cards {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.instruction-card {
  display: flex;
  gap: 1.25rem;
  position: relative;
}

.step-marker {
  position: relative;
  flex-shrink: 0;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--step-number-bg);
  color: var(--step-number-color);
  font-weight: 600;
  font-size: 15px;
  position: sticky;
  top: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1;
}

.instruction-card:hover .step-number {
  transform: scale(1.05);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
}

.step-content {
  flex: 1;
  padding-top: 0.25rem;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: var(--heading-color);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

p {
  margin: 0 0 1.25rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color);
}

code {
  background-color: var(--code-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--code-color);
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;
}

.browser-hints {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.browser-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: var(--hint-color);
  background-color: var(--hint-bg);
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  transition: transform 0.2s ease, background-color 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.browser-hint:hover {
  transform: translateY(-1px);
  background-color: var(--hint-hover-bg, var(--hint-bg));
}

.examples {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.example {
  font-weight: 500;
  transition: transform 0.2s ease;
}

.examples:hover .example {
  transform: translateY(-1px);
}

.example-arrow {
  color: var(--arrow-color);
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.examples:hover .example-arrow {
  transform: translateX(2px);
}

.example-result {
  font-size: 0.9rem;
  color: var(--result-color);
  transition: opacity 0.2s ease;
}

.examples:hover .example-result {
  opacity: 0.9;
}

.keyboard-shortcut-tip {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--divider-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--tip-color);
  line-height: 1.5;
}

kbd {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  background-color: var(--kbd-bg);
  border: 1px solid var(--kbd-border);
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1) inset;
  padding: 0.15rem 0.5rem;
  font-size: 0.8rem;
  color: var(--kbd-color);
  display: inline-block;
  line-height: 1;
  margin: 0 0.2rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

kbd:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.1) inset;
}

.step-marker::after {
  content: '';
  position: absolute;
  top: 32px;
  bottom: -32px;
  left: 16px;
  width: 2px;
  background-color: var(--connector-color);
  z-index: 0;
  opacity: 0.5;
}

.instruction-card:last-child .step-marker::after {
  display: none;
}

.instruction-card {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 12px;
  margin: -0.5rem;
}

.instruction-card:hover {
  background-color: var(--card-hover-bg, rgba(0, 0, 0, 0.01));
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .instructions-section {
    padding: 1.75rem;
    border-radius: 14px;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }

  .instruction-cards {
    gap: 1.75rem;
  }

  .step-number {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }

  h3 {
    font-size: 1.05rem;
  }

  p {
    font-size: 0.95rem;
  }
}

@media (max-width: 640px) {
  .instructions-section {
    padding: 1.5rem;
    border-radius: 12px;
  }

  .examples {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .example-arrow {
    transform: rotate(90deg);
    margin-left: 0.5rem;
  }

  .examples:hover .example-arrow {
    transform: rotate(90deg);
  }
}

@media (max-width: 480px) {
  .instructions-section {
    padding: 1.25rem;
    border-radius: 10px;
  }

  .instruction-card {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.35rem;
    margin: -0.35rem;
  }

  .step-marker {
    margin-bottom: 0.25rem;
  }

  .step-marker::after {
    display: none;
  }

  .step-number {
    position: static;
    margin-bottom: 0.5rem;
  }

  .browser-hints {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .keyboard-shortcut-tip {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding-top: 1.25rem;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 1.25rem;
  }

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .example, .example-result {
    font-size: 0.85rem;
  }
}

@media (prefers-color-scheme: dark) {
  .instructions-section {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.3);
  }

  .instructions-section:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.3);
  }

  .step-number {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }

  .instruction-card:hover .step-number {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  code, .browser-hint, kbd {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }
}
</style>
