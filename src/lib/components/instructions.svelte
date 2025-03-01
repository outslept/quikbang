<script>
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
            <svg viewBox='0 0 24 24' width='16' height='16'>
              <path fill='currentColor' d='M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z' />
            </svg>
            <span>Chrome</span>
          </span>
          <span class='browser-hint'>
            <svg viewBox='0 0 24 24' width='16' height='16'>
              <path fill='currentColor' d='M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
            </svg>
            <span>Safari</span>
          </span>
          <span class='browser-hint'>
            <svg viewBox='0 0 24 24' width='16' height='16'>
              <path fill='currentColor' d='M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4M4.75,13.5C4.31,13.5 3.97,13.15 3.97,12.72C3.97,12.29 4.31,11.94 4.75,11.94H11.94V4.75C11.94,4.31 12.29,3.97 12.72,3.97C13.15,3.97 13.5,4.31 13.5,4.75V11.94H20.69C21.13,11.94 21.47,12.29 21.47,12.72C21.47,13.15 21.13,13.5 20.69,13.5H13.5V20.69C13.5,21.13 13.15,21.47 12.72,21.47C12.29,21.47 11.94,21.13 11.94,20.69V13.5H4.75Z' />
            </svg>
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
            <svg viewBox='0 0 24 24' width='14' height='14'>
              <path fill='currentColor' d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z' />
            </svg>
          </span>
          <span class='example-result'>Search Wikipedia for "Svelte"</span>
        </div>
        <div class='examples'>
          <code class='example'>!yt music</code>
          <span class='example-arrow'>
            <svg viewBox='0 0 24 24' width='14' height='14'>
              <path fill='currentColor' d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z' />
            </svg>
          </span>
          <span class='example-result'>Search YouTube for "music"</span>
        </div>
        <div class='examples'>
          <code class='example'>!gh svelte</code>
          <span class='example-arrow'>
            <svg viewBox='0 0 24 24' width='14' height='14'>
              <path fill='currentColor' d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z' />
            </svg>
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
            <svg viewBox='0 0 24 24' width='14' height='14'>
              <path fill='currentColor' d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z' />
            </svg>
          </span>
          <span class='example-result'>Search {defaultSearch} for "typescript tutorial"</span>
        </div>
      </div>
    </div>
  </div>

  <div class='keyboard-shortcut-tip'>
    <svg viewBox='0 0 24 24' width='16' height='16'>
      <path fill='currentColor' d='M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z' />
    </svg>
    <span>Pro tip: Use <kbd>Cmd</kbd>+<kbd>L</kbd> (Mac) or <kbd>Ctrl</kbd>+<kbd>L</kbd> (Windows) to quickly focus the address bar.</span>
  </div>
</section>

<style>
  .instructions-section {
    background-color: var(--section-bg, #fff);
    border-radius: 12px;
    padding: 1.75rem;
    width: 100%;
    max-width: 100%;
    box-shadow: var(--section-shadow, 0 1px 3px rgba(0, 0, 0, 0.05));
    border: 1px solid var(--section-border, rgba(0, 0, 0, 0.04));
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1.5rem;
    color: var(--heading-color, #000);
    letter-spacing: -0.02em;
  }

  .instruction-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .instruction-card {
    display: flex;
    gap: 1rem;
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
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: var(--step-number-bg, #000);
    color: var(--step-number-color, #fff);
    font-weight: 500;
    font-size: 14px;
    position: sticky;
    top: 1.75rem;
  }

  .step-content {
    flex: 1;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--heading-color, #000);
    letter-spacing: -0.01em;
  }

  p {
    margin: 0 0 1rem;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-color, #333);
  }

  code {
    background-color: var(--code-bg, #f5f5f5);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;;
    font-size: 0.9em;
    color: var(--code-color, #333);
    white-space: nowrap;
  }

  .browser-hints {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .browser-hint {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: var(--hint-color, #666);
    background-color: var(--hint-bg, rgba(0, 0, 0, 0.03));
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .examples {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .example {
    font-weight: 500;
  }

  .example-arrow {
    color: var(--arrow-color, #999);
    display: inline-flex;
    align-items: center;
  }

  .example-result {
    font-size: 0.85rem;
    color: var(--result-color, #666);
  }

  .keyboard-shortcut-tip {
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.06));
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--tip-color, #666);
  }

  kbd {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;;
  background-color: var(--kbd-bg, #f5f5f5);
  border: 1px solid var(--kbd-border, rgba(0, 0, 0, 0.1));
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  padding: 0.1rem 0.4rem;
  font-size: 0.75rem;
  color: var(--kbd-color, #333);
  display: inline-block;
  line-height: 1;
  margin: 0 0.15rem;
}

.step-marker::after {
  content: '';
  position: absolute;
  top: 28px;
  bottom: -28px;
  left: 14px;
  width: 1px;
  background-color: var(--connector-color, rgba(0, 0, 0, 0.1));
  z-index: 0;
}

.instruction-card:last-child .step-marker::after {
  display: none;
}

:global([data-theme="light"]) {
  --section-bg: #fff;
  --section-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  --section-border: rgba(0, 0, 0, 0.04);
  --heading-color: #000;
  --text-color: #333;
  --code-bg: #f5f5f5;
  --code-color: #333;
  --hint-color: #666;
  --hint-bg: rgba(0, 0, 0, 0.03);
  --arrow-color: #999;
  --result-color: #666;
  --divider-color: rgba(0, 0, 0, 0.06);
  --tip-color: #666;
  --kbd-bg: #f5f5f5;
  --kbd-border: rgba(0, 0, 0, 0.1);
  --kbd-color: #333;
  --connector-color: rgba(0, 0, 0, 0.1);
  --step-number-bg: #000;
  --step-number-color: #fff;
}

:global([data-theme="dark"]) {
  --section-bg: #1a1a1a;
  --section-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  --section-border: rgba(255, 255, 255, 0.08);
  --heading-color: #fff;
  --text-color: #bbb;
  --code-bg: rgba(255, 255, 255, 0.1);
  --code-color: #eee;
  --hint-color: #aaa;
  --hint-bg: rgba(255, 255, 255, 0.07);
  --arrow-color: #777;
  --result-color: #aaa;
  --divider-color: rgba(255, 255, 255, 0.08);
  --tip-color: #999;
  --kbd-bg: rgba(255, 255, 255, 0.1);
  --kbd-border: rgba(255, 255, 255, 0.2);
  --kbd-color: #ddd;
  --connector-color: rgba(255, 255, 255, 0.15);
  --step-number-bg: #fff;
  --step-number-color: #000;
}

@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
    --section-bg: #fff;
    --section-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    --section-border: rgba(0, 0, 0, 0.04);
    --heading-color: #000;
    --text-color: #333;
    --code-bg: #f5f5f5;
    --code-color: #333;
    --hint-color: #666;
    --hint-bg: rgba(0, 0, 0, 0.03);
    --arrow-color: #999;
    --result-color: #666;
    --divider-color: rgba(0, 0, 0, 0.06);
    --tip-color: #666;
    --kbd-bg: #f5f5f5;
    --kbd-border: rgba(0, 0, 0, 0.1);
    --kbd-color: #333;
    --connector-color: rgba(0, 0, 0, 0.1);
    --step-number-bg: #000;
    --step-number-color: #fff;
  }
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --section-bg: #1a1a1a;
    --section-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    --section-border: rgba(255, 255, 255, 0.08);
    --heading-color: #fff;
    --text-color: #bbb;
    --code-bg: rgba(255, 255, 255, 0.1);
    --code-color: #eee;
    --hint-color: #aaa;
    --hint-bg: rgba(255, 255, 255, 0.07);
    --arrow-color: #777;
    --result-color: #aaa;
    --divider-color: rgba(255, 255, 255, 0.08);
    --tip-color: #999;
    --kbd-bg: rgba(255, 255, 255, 0.1);
    --kbd-border: rgba(255, 255, 255, 0.2);
    --kbd-color: #ddd;
    --connector-color: rgba(255, 255, 255, 0.15);
    --step-number-bg: #fff;
    --step-number-color: #000;
  }
}

@media (max-width: 768px) {
  .instructions-section {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  .instruction-cards {
    gap: 1.25rem;
  }
}

@media (max-width: 640px) {
  .examples {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .example-arrow {
    transform: rotate(90deg);
    margin-left: 0.5rem;
  }
}

@media (max-width: 480px) {
  .instructions-section {
    padding: 1.25rem;
    border-radius: 8px;
  }

  .instruction-card {
    flex-direction: column;
    gap: 0.5rem;
  }

  .step-marker {
    margin-bottom: 0.25rem;
  }

  .step-marker::after {
    display: none;
  }

  .browser-hints {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
