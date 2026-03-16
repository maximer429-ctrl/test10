export type Profile = { name: string; avatar: string; age: number; level?: number }
export type Stats = { rounds: number; accuracy: number }

const PROFILE_KEY = 'ks_profile'
const STATS_KEY = 'ks_stats'
const CONSENT_KEY = 'ks_parent_consent'

// Multiple profiles storage keys
const PROFILES_KEY = 'ks_profiles' // stores array of profiles
const ACTIVE_PROFILE_KEY = 'ks_active_profile' // id or index of active profile

type StoredProfile = Profile & { id: string }

export function loadProfile(): Profile | null {
  try {
    // single-profile fallback (legacy) — prefer session, then local
    const s = sessionStorage.getItem(PROFILE_KEY)
    if (s) return JSON.parse(s)
    const l = localStorage.getItem(PROFILE_KEY)
    if (l) return JSON.parse(l)
    // if multiple profiles exist, load the active one
    const plist = localStorage.getItem(PROFILES_KEY) || sessionStorage.getItem(PROFILES_KEY)
    const active = localStorage.getItem(ACTIVE_PROFILE_KEY) || sessionStorage.getItem(ACTIVE_PROFILE_KEY)
    if (plist) {
      const arr: StoredProfile[] = JSON.parse(plist)
      if (active) {
        const found = arr.find(p => p.id === active || String(arr.indexOf(p)) === active)
        if (found) return found
      }
      if (arr.length) return arr[0]
    }
  } catch (e) {
    // ignore parse errors
  }
  return null
}

export function saveProfile(profile: Profile) {
  try {
    // save single-profile legacy key
    sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    if (localStorage.getItem(CONSENT_KEY) === 'true') {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    }
    // also, if multi-profile storage exists, update active profile
    try {
      const plist = sessionStorage.getItem(PROFILES_KEY) || localStorage.getItem(PROFILES_KEY)
      if (plist) {
        const arr: StoredProfile[] = JSON.parse(plist)
        const active = sessionStorage.getItem(ACTIVE_PROFILE_KEY) || localStorage.getItem(ACTIVE_PROFILE_KEY)
        if (active) {
          const idx = arr.findIndex(p => p.id === active || String(arr.indexOf(p)) === active)
          if (idx >= 0) {
            arr[idx] = { ...(arr[idx]), ...profile }
            // persist back respecting consent
            sessionStorage.setItem(PROFILES_KEY, JSON.stringify(arr))
            if (localStorage.getItem(CONSENT_KEY) === 'true') localStorage.setItem(PROFILES_KEY, JSON.stringify(arr))
          }
        }
      }
    } catch (e) {}
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

// Multi-profile helpers
export function listProfiles(): StoredProfile[] {
  try {
    const plist = sessionStorage.getItem(PROFILES_KEY) || localStorage.getItem(PROFILES_KEY)
    if (!plist) return []
    return JSON.parse(plist) as StoredProfile[]
  } catch (e) { return [] }
}

export function createProfile(p: Profile): StoredProfile {
  const id = `p_${Date.now().toString(36)}`
  const sp: StoredProfile = { ...p, id }
  try {
    const arr = listProfiles()
    arr.push(sp)
    sessionStorage.setItem(PROFILES_KEY, JSON.stringify(arr))
    if (localStorage.getItem(CONSENT_KEY) === 'true') localStorage.setItem(PROFILES_KEY, JSON.stringify(arr))
    sessionStorage.setItem(ACTIVE_PROFILE_KEY, id)
    if (localStorage.getItem(CONSENT_KEY) === 'true') localStorage.setItem(ACTIVE_PROFILE_KEY, id)
  } catch (e) {}
  return sp
}

export function setActiveProfile(idOrIndex: string | number) {
  try {
    const id = typeof idOrIndex === 'number' ? String(idOrIndex) : idOrIndex
    sessionStorage.setItem(ACTIVE_PROFILE_KEY, id)
    if (localStorage.getItem(CONSENT_KEY) === 'true') localStorage.setItem(ACTIVE_PROFILE_KEY, id)
  } catch (e) {}
}

export function deleteProfile(id: string) {
  try {
    const arr = listProfiles().filter(p => p.id !== id)
    sessionStorage.setItem(PROFILES_KEY, JSON.stringify(arr))
    if (localStorage.getItem(CONSENT_KEY) === 'true') localStorage.setItem(PROFILES_KEY, JSON.stringify(arr))
    const active = sessionStorage.getItem(ACTIVE_PROFILE_KEY) || localStorage.getItem(ACTIVE_PROFILE_KEY)
    if (active === id && arr.length) {
      const newActive = arr[0].id
      sessionStorage.setItem(ACTIVE_PROFILE_KEY, newActive)
      if (localStorage.getItem(CONSENT_KEY) === 'true') localStorage.setItem(ACTIVE_PROFILE_KEY, newActive)
    }
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
