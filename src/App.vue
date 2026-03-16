<template>
  <div class="app-root">
    <AppHeader />

    <main class="app-shell">
      <AppSidebar />

      <section class="content">
        <div class="hero">
          <div class="title">Welcome back, Alex!</div>
          <div class="subtitle">Ready for a quick challenge? Let's try a new level.</div>
        </div>

        <div class="cards-grid">
          <CardBase>Counting Game</CardBase>
          <CardBase>Addition Practice</CardBase>
          <CardBase>Hint Challenge</CardBase>
          <CardBase>Reward Chest</CardBase>
        </div>

        <game-page />
      </section>
    </main>

    <footer class="app-footer">© 2026 KidsScore — playful learning for children</footer>
  </div>
</template>

<script setup>
import GamePage from './pages/Game.vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import CardBase from './components/CardBase.vue'
</script>

<style scoped>
.app-root{font-family:var(--font-family);color:var(--color-text);background:var(--color-background);min-height:100vh}
.app-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border)}
.brand{display:flex;align-items:center;gap:12px}
.logo{width:48px;height:48px;border-radius:10px;background:var(--color-primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:700}
.brand-text .name{font-weight:700}
.brand-text .tag{font-size:0.9rem;color:var(--color-muted)}
.app-shell{display:flex;max-width:1100px;margin:18px auto;padding:16px;gap:16px}
.sidebar{width:220px;background:var(--color-surface);border-radius:var(--radius-md);padding:12px}
.sidebar ul{list-style:none;padding:0;margin:0}
.sidebar a{display:block;padding:10px;border-radius:8px;color:var(--color-text);text-decoration:none}
.sidebar a.active{background:linear-gradient(90deg, rgba(59,130,246,0.12), transparent);font-weight:700}
.content{flex:1}
.hero{background:linear-gradient(90deg,var(--color-primary), #60a5fa);color:white;padding:16px;border-radius:10px}
.cards-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:12px}
.card{background:var(--color-surface);padding:16px;border-radius:10px;border:1px dashed rgba(0,0,0,0.03);text-align:center}
.app-footer{padding:16px;text-align:center;color:var(--color-muted)}

@media(max-width:900px){.sidebar{display:none}.app-shell{padding:8px}}
</style>
