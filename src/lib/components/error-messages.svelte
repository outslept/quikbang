<script lang='ts'>
  const { error } = $props<{ error: string }>()
</script>

<div class='error-container'>
  <div class='error-icon'>!</div>
  <p>{error}</p>
</div>
