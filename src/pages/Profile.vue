<template>
  <section class="profile-root">
    <h1>Profile</h1>

    <div class="profile-grid">
      <div class="profile-card">
        <label>Display name</label>
        <input v-model="profile.name" maxlength="24" />

        <label>Avatar</label>
        <div class="avatar-list">
          <button v-for="(a,i) in avatars" :key="i" :class="['avatar-btn', {selected: profile.avatar===a}]" @click="selectAvatar(a)">
            <img :src="a" alt="avatar" />
          </button>
        </div>

        <div class="save-row">
          <button class="btn" @click="save">Save</button>
          <button class="btn ghost" @click="reset">Reset</button>
        </div>
      </div>

      <aside class="profile-side">
        <h2>Badges</h2>
        <div class="badges">
          <div v-for="b in badges" :key="b" class="badge">{{ b }}</div>
        </div>

        <h2>Session stats</h2>
        <div class="stats">
          <div>Rounds: <strong>{{ stats.rounds }}</strong></div>
          <div>Accuracy: <strong>{{ stats.accuracy }}%</strong></div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

const avatars = [
  '/mockups/avatar-1.png',
  '/mockups/avatar-2.png',
  '/mockups/avatar-3.png'
]

const defaultProfile = { name: 'Player', avatar: avatars[0] }

const profile = reactive({ ...defaultProfile })
const badges = ref(['First win', 'Quick thinker'])
const stats = reactive({ rounds: 0, accuracy: 0 })

function loadProfile(){
  // session storage always available
  const s = sessionStorage.getItem('ks_profile')
  if (s) Object.assign(profile, JSON.parse(s))
  // load stats from session if present
  const st = sessionStorage.getItem('ks_stats')
  if (st) Object.assign(stats, JSON.parse(st))
}

function save(){
  sessionStorage.setItem('ks_profile', JSON.stringify(profile))
  // persist across sessions only with parental consent
  if (localStorage.getItem('ks_parent_consent') === 'true'){
    localStorage.setItem('ks_profile', JSON.stringify(profile))
  }
}

function reset(){
  Object.assign(profile, JSON.parse(JSON.stringify(defaultProfile)))
  save()
}

function selectAvatar(a){ profile.avatar = a }

onMounted(()=>{
  loadProfile()
})
</script>

<style scoped>
.profile-root{padding:var(--space-m)}
.profile-grid{display:flex;gap:20px;align-items:flex-start}
.profile-card{flex:1;background:var(--color-surface);padding:16px;border-radius:var(--radius-md);border:1px solid var(--border)}
.profile-side{width:260px;background:var(--color-surface);padding:12px;border-radius:var(--radius-md);border:1px solid var(--border)}
.avatar-list{display:flex;gap:8px;margin:8px 0}
.avatar-btn{border:2px solid transparent;padding:4px;border-radius:8px;background:transparent}
.avatar-btn.selected{border-color:var(--color-primary)}
.avatar-btn img{width:48px;height:48px;border-radius:8px}
.save-row{display:flex;gap:8px;margin-top:12px}
.badges{display:flex;flex-direction:column;gap:8px}
.badge{background:linear-gradient(90deg, rgba(59,130,246,0.08), transparent);padding:8px;border-radius:6px}
.stats div{margin-top:6px}
</style>
