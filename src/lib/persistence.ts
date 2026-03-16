export type Profile = { name: string; avatar: string; age: number; level?: number }
export type Stats = { rounds: number; accuracy: number }

const PROFILE_KEY = 'ks_profile'
const STATS_KEY = 'ks_stats'
const CONSENT_KEY = 'ks_parent_consent'

export function loadProfile(): Profile | null {
  try {
    const s = sessionStorage.getItem(PROFILE_KEY)
    if (s) return JSON.parse(s)
    const l = localStorage.getItem(PROFILE_KEY)
    if (l) return JSON.parse(l)
  } catch (e) {
    // ignore parse errors
  }
  return null
}

export function saveProfile(profile: Profile) {
  try {
    sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    if (localStorage.getItem(CONSENT_KEY) === 'true') {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    }
  } catch (e) {
    // ignore quota errors
  }
}

export function loadStats(): Stats | null {
  try {
    const s = sessionStorage.getItem(STATS_KEY)
    if (s) return JSON.parse(s)
  } catch (e) {}
  return null
}

export function saveStats(stats: Stats) {
  try {
    sessionStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch (e) {}
}

export function exportAll() {
  try {
    const profile = (() => {
      const s = sessionStorage.getItem(PROFILE_KEY)
      if (s) return JSON.parse(s)
      const l = localStorage.getItem(PROFILE_KEY)
      if (l) return JSON.parse(l)
      return null
    })()
    const stats = (() => {
      const s = sessionStorage.getItem(STATS_KEY)
      if (s) return JSON.parse(s)
      const l = localStorage.getItem(STATS_KEY)
      if (l) return JSON.parse(l)
      return null
    })()
    const consent = localStorage.getItem(CONSENT_KEY) || null
    return { profile, stats, consent }
  } catch (e) {
    return { profile: null, stats: null, consent: null }
  }
}

export function deleteAll() {
  try {
    sessionStorage.removeItem(PROFILE_KEY)
    sessionStorage.removeItem(STATS_KEY)
    localStorage.removeItem(PROFILE_KEY)
    localStorage.removeItem(STATS_KEY)
    // do not remove consent implicitly in deleteAll — keep parent's choice unless explicitly requested
  } catch (e) {}
}
