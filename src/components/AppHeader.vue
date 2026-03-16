<template>
  <header class="app-header">
    <div class="brand"><div class="logo">KS</div><div class="brand-text"><div class="name">KidsScore</div><div class="tag">Learn. Play. Grow.</div></div></div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.app-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border)}
.brand{display:flex;align-items:center;gap:12px}
.logo{width:48px;height:48px;border-radius:10px;background:var(--color-primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:700}
.brand-text .name{font-weight:700}
.brand-text .tag{font-size:0.9rem;color:var(--color-muted)}
</style>
