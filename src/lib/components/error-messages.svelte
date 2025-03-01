<script lang='ts'>
  export let error: string
</script>

<div class='error-container'>
  <div class='error-icon'>!</div>
  <p>{error}</p>
</div>

<style>
  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    color: #333;
  }

  .error-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f44336;
    color: white;
    font-weight: bold;
    margin-right: 1rem;
  }

  @media (prefers-color-scheme: dark) {
    .error-container {
      background-color: #1a1a1a;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      color: #f0f0f0;
    }
  }

  @media (prefers-color-scheme: light) {
    .error-container {
      background-color: #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      color: #333;
    }
  }
</style>
