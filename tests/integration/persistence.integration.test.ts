import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { saveProfile, saveStats, exportAll, deleteAll } from '../../src/lib/persistence'

describe('persistence integration', () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })
  afterEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  it('export returns profile, stats and consent; delete removes stored data', () => {
    localStorage.setItem('ks_parent_consent', 'true')
    const p = { name: 'Export', avatar: '/x.svg', age: 6 }
    saveProfile(p as any)
    saveStats({ rounds: 5, accuracy: 92 })

    const out = exportAll()
    expect(out.profile).toEqual(expect.objectContaining({ name: 'Export', age: 6 }))
    expect(out.stats).toEqual(expect.objectContaining({ rounds: 5, accuracy: 92 }))
    expect(out.consent).toBe('true')

    deleteAll()
    expect(sessionStorage.getItem('ks_profile')).toBeNull()
    expect(localStorage.getItem('ks_profile')).toBeNull()
    expect(sessionStorage.getItem('ks_stats')).toBeNull()
    expect(localStorage.getItem('ks_stats')).toBeNull()
  })
})
