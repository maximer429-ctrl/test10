export type Profile = {
  name: string
  avatar: string
  age?: number
  level?: number
}

export type Stats = {
  rounds: number
  accuracy: number
}

const PROFILE_KEY = 'ks_profile'
const STATS_KEY = 'ks_stats'
const CONSENT_KEY = 'ks_parent_consent'

export function hasConsent(): boolean {
  return localStorage.getItem(CONSENT_KEY) === 'true'
}

export function saveProfile(p: Profile, persistIfConsented = true) {
  sessionStorage.setItem(PROFILE_KEY, JSON.stringify(p))
  if (persistIfConsented && hasConsent()) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p))
  }
}

export function loadProfile(): Profile | null {
  const s = sessionStorage.getItem(PROFILE_KEY)
  if (s) return JSON.parse(s)
  const l = localStorage.getItem(PROFILE_KEY)
  if (l) return JSON.parse(l)
  return null
}

export function saveStats(st: Stats, persistIfConsented = true) {
  sessionStorage.setItem(STATS_KEY, JSON.stringify(st))
  if (persistIfConsented && hasConsent()) {
    localStorage.setItem(STATS_KEY, JSON.stringify(st))
  }
}

export function loadStats(): Stats {
  const s = sessionStorage.getItem(STATS_KEY)
  if (s) return JSON.parse(s)
  const l = localStorage.getItem(STATS_KEY)
  if (l) return JSON.parse(l)
  return { rounds: 0, accuracy: 0 }
}

export function exportData(): string {
  const data = {
    profile: loadProfile(),
    stats: loadStats(),
    consent: hasConsent(),
  }
  return JSON.stringify(data, null, 2)
}

export function deleteData() {
  sessionStorage.removeItem(PROFILE_KEY)
  sessionStorage.removeItem(STATS_KEY)
  localStorage.removeItem(PROFILE_KEY)
  localStorage.removeItem(STATS_KEY)
  localStorage.removeItem(CONSENT_KEY)
}

export default {
  saveProfile,
  loadProfile,
  saveStats,
  loadStats,
  exportData,
  deleteData,
  hasConsent,
}
