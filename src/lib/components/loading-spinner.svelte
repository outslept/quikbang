<script lang='ts'>
  export let message: string = 'Loading...'
</script>

<div class='loading-container'>
  <div class='loading-spinner'></div>
  <p>{message}</p>
</div>

<style>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
  }

  .loading-spinner {
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 3px solid #000;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (prefers-color-scheme: dark) {
    .loading-spinner {
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top: 3px solid #fff;
    }
  }
</style>
