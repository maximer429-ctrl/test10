<template>
  <div class="pm-root">
    <div class="pm-header">Profiles</div>
    <ul class="pm-list">
      <li v-for="p in profiles" :key="p.id" class="pm-item">
        <button class="pm-select" @click="select(p)">
          <img :src="p.avatar" alt="avatar" class="pm-avatar" />
          <span class="pm-name">{{ p.name }}</span>
        </button>
        <button class="pm-delete" @click="remove(p.id)">✕</button>
      </li>
    </ul>

    <div class="pm-create">
      <input v-model="newName" placeholder="New profile name" />
      <button class="btn btn-primary" @click="create">Create</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listProfiles, createProfile, setActiveProfile, deleteProfile } from '../lib/persistence'

const profiles = ref([])
const newName = ref('')

function refresh(){
  profiles.value = listProfiles()
}

function create(){
  if (!newName.value.trim()) return
  const p = { name: newName.value.trim(), avatar: '/mockups/avatar-1.svg', age: 6 }
  createProfile(p)
  newName.value = ''
  refresh()
  // notify app
  emit('profile-changed')
}

function select(p){
  setActiveProfile(p.id)
  emit('profile-changed')
}

function remove(id){
  deleteProfile(id)
  refresh()
  emit('profile-changed')
}

onMounted(()=> refresh())

// expose emit for script-setup
const emit = defineEmits(['profile-changed'])
</script>

<style scoped>
.pm-root{padding:8px}
.pm-header{font-weight:700;margin-bottom:8px}
.pm-list{list-style:none;padding:0;margin:0 0 8px 0}
.pm-item{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.pm-select{flex:1;display:flex;align-items:center;gap:8px;border:0;background:transparent;padding:6px;border-radius:8px}
.pm-avatar{width:36px;height:36px;border-radius:8px}
.pm-name{font-weight:600}
.pm-delete{background:transparent;border:0;color:#c00;font-weight:700}
.pm-create{display:flex;gap:8px}
.pm-create input{flex:1;padding:6px;border-radius:8px;border:1px solid var(--border)}
</style>
