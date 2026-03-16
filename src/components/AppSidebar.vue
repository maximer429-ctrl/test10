<template>
  <aside class="sidebar">
    <ul>
      <li><button class="link-btn" @click="$emit('open-home')">🏠 Home</button></li>
      <li><a>🎯 Practice</a></li>
      <li><a>🏆 Rewards</a></li>
      <li><button class="link-btn" @click="$emit('open-profile')">👪 Profile</button></li>
    </ul>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.sidebar{width:220px;background:var(--color-surface);border-radius:var(--radius-md);padding:12px}
.sidebar ul{list-style:none;padding:0;margin:0}
.sidebar a{display:block;padding:10px;border-radius:8px;color:var(--color-text);text-decoration:none}
.sidebar a.active{background:linear-gradient(90deg, rgba(59,130,246,0.12), transparent);font-weight:700}

@media(max-width:900px){.sidebar{display:none}}
</style>
