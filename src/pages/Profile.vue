<template>
  <section class="profile-root">
    <div class="container">
      <div class="card" role="region" aria-label="Profile">
        <div class="header">
          <div class="avatar-large" aria-hidden="true">
            <img :src="profile.avatar" alt="avatar" />
          </div>
          <div class="info">
            <div class="name">{{ profile.name }}</div>
            <div class="meta">Age: {{ profile.age }} • Level: {{ profile.level }}</div>
            <div class="stats">
              <div class="stat"><div class="stat-value">{{ stats.rounds }}</div><div class="small">Rounds</div></div>
              <div class="stat"><div class="stat-value">{{ stats.accuracy }}%</div><div class="small">Accuracy</div></div>
              <div class="stat"><div class="stat-value">{{ badges.length }}</div><div class="small">Badges</div></div>
            </div>
            <div class="badges" aria-label="Badges earned">
              <div v-for="b in badges" :key="b" class="badge">{{ b }}</div>
            </div>
          </div>
          <div class="actions">
            <button class="btn btn-secondary" @click="toggleEdit">{{ isEditing ? 'Close' : 'Edit Profile' }}</button>
          </div>
        </div>

        <div v-if="isEditing" class="section edit-section">
          <label>Display name</label>
          <input v-model="profile.name" maxlength="24" />

          <div style="margin-top:8px"><label>Age</label>
          <input type="number" v-model.number="profile.age" min="3" max="18" /></div>

          <label style="margin-top:8px">Avatar</label>
          <div class="avatar-list">
            <button v-for="(a,i) in avatars" :key="i" :class="['avatar-btn', {selected: profile.avatar===a}]" @click="selectAvatar(a)">
              <img :src="a" alt="avatar" />
            </button>
          </div>

          <div class="save-row">
            <button class="btn btn-primary" @click="save">Save</button>
            <button class="btn btn-secondary" @click="reset">Reset</button>
          </div>
        </div>

        <div class="section" aria-labelledby="recent-title">
          <div id="recent-title" style="font-weight:700;margin-bottom:8px">Recent session summary</div>
          <div class="recent-row">
            <div class="progress-wrap">
              <div class="progress-bar" role="progressbar" :aria-valuenow="recent.accuracy" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-fill" :style="{ width: recent.accuracy + '%' }"></div>
              </div>
              <div class="small" style="margin-top:6px">Accuracy {{ recent.accuracy }}% • {{ recent.rounds }} rounds</div>
            </div>
            <div class="details-btn"><button class="btn btn-primary">View details</button></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

const avatars = [
  '/mockups/avatar-1.svg',
  '/mockups/avatar-2.svg',
  '/mockups/avatar-3.svg'
]

const defaultProfile = { name: 'Alex', avatar: avatars[0], age: 9, level: 1 }

const profile = reactive({ ...defaultProfile })
const badges = ref(['First Win', 'Quick Solver'])
const stats = reactive({ rounds: 0, accuracy: 0 })
const recent = reactive({ rounds: 0, accuracy: 0 })
const isEditing = ref(false)

function loadProfile(){
  // session storage always available
  const s = sessionStorage.getItem('ks_profile')
  if (s) Object.assign(profile, JSON.parse(s))
  // load stats from session if present
  const st = sessionStorage.getItem('ks_stats')
  if (st) Object.assign(stats, JSON.parse(st))
  // populate recent with a simple sample or from stats
  recent.rounds = stats.rounds || 0
  recent.accuracy = stats.accuracy || 0
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

function toggleEdit(){ isEditing.value = !isEditing.value }

onMounted(()=>{
  loadProfile()
})
</script>

<style scoped>
:root{--primary:#3B82F6;--accent:#10B981;--surface:var(--color-surface);--bg:var(--color-background);--text:var(--color-text);--muted:var(--color-muted);--radius:12px;--space:16px}
*{box-sizing:border-box}
.profile-root{padding:var(--space)}
.container{max-width:920px;margin:0 auto}
.card{background:var(--surface);padding:var(--space);border-radius:12px;border:1px solid rgba(230,237,248,0.9)}
.header{display:flex;gap:16px;align-items:center}
.avatar-large{width:96px;height:96px;border-radius:50%;background:#fff;border:4px solid var(--bg);display:flex;align-items:center;justify-content:center;overflow:hidden}
.avatar-large img{width:100%;height:100%;object-fit:cover}
.info{flex:1}
.name{font-weight:700;font-size:1.25rem}
.meta{color:var(--muted);font-size:0.9rem}
.stats{display:flex;gap:12px;margin-top:12px}
.stat{background:var(--bg);padding:10px;border-radius:10px;flex:1;text-align:center;border:1px solid rgba(233,242,255,0.9)}
.stat-value{font-weight:700}
.badges{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
.badge{background:var(--accent);color:#fff;padding:6px 10px;border-radius:999px;font-weight:700}
.actions{min-width:110px}
.btn{padding:8px 12px;border-radius:10px;border:none;background:#f1f5f9}
.btn.primary{background:var(--primary);color:#fff}
.btn.outline{background:#fff;border:2px solid var(--primary)}
.btn.ghost{background:transparent;border:1px solid rgba(0,0,0,0.06)}
.edit-section{margin-top:12px}
.avatar-list{display:flex;gap:8px;margin:8px 0}
.avatar-btn{border:2px solid transparent;padding:4px;border-radius:8px;background:transparent}
.avatar-btn.selected{border-color:var(--primary)}
.avatar-btn img{width:48px;height:48px;border-radius:8px}
.save-row{display:flex;gap:8px;margin-top:12px}
.recent-row{display:flex;gap:12px;align-items:center}
.progress-wrap{flex:1}
.progress-bar{height:10px;background:rgba(230,237,248,0.9);border-radius:99px;overflow:hidden}
.progress-fill{height:100%;background:var(--accent);width:0}
.small{font-size:0.9rem;color:var(--muted)}

@media(max-width:700px){.header{flex-direction:column;align-items:flex-start}.actions{align-self:flex-end}}
</style>
