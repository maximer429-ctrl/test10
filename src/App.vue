<template>
  <div class="app-root">
    <AppHeader />

    <main class="app-shell">
      <AppSidebar @open-profile="openProfile" />

      <section class="content">
        <LandingPage @play="handlePlay" v-if="!showGame && !showProfile" />

        <Onboarding v-if="showOnboarding && !consentGiven" @request-parent-consent="showConsent = true" @skip-onboarding="startGame" />

        <ParentConsent v-if="showConsent" @consented="onConsented" @cancel="showConsent = false" />

        <Profile v-else-if="showProfile" />

        <GamePage v-else-if="showGame" />
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
import LandingPage from './pages/Landing.vue'
import Onboarding from './pages/Onboarding.vue'
import ParentConsent from './pages/ParentConsent.vue'
import Profile from './pages/Profile.vue'

import { ref, onMounted } from 'vue'

const showGame = ref(false)
const showProfile = ref(false)
const showOnboarding = ref(false)
const showConsent = ref(false)
const consentGiven = ref(localStorage.getItem('ks_parent_consent') === 'true')

function handlePlay() {
  if (consentGiven.value) {
    startGame()
  } else {
    showOnboarding.value = true
  }
}

function openProfile(){
  showProfile.value = true
  showGame.value = false
  // persist the current view so it survives refresh
  localStorage.setItem('ks_current_view', 'profile')
}


onMounted(() => {
  const v = localStorage.getItem('ks_current_view')
  if (v === 'profile') {
    showProfile.value = true
  } else if (v === 'game') {
    showGame.value = true
  }
})

function startGame() {
  showOnboarding.value = false
  showConsent.value = false
  showGame.value = true
  localStorage.setItem('ks_current_view', 'game')
}

function onConsented() {
  consentGiven.value = true
  localStorage.setItem('ks_parent_consent', 'true')
  startGame()
}
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
