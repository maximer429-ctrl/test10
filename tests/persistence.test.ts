import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { saveProfile, loadProfile, saveStats, loadStats } from '../src/lib/persistence'

describe('persistence helper', () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  afterEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  it('saves and loads profile in sessionStorage', () => {
    const p = { name: 'Test', avatar: '/a.svg', age: 8 }
    saveProfile(p as any)
    const loaded = loadProfile()
    expect(loaded).toEqual(expect.objectContaining({ name: 'Test', age: 8 }))
  })

  it('persists profile to localStorage only when consent is true', () => {
    const p = { name: 'Local', avatar: '/b.svg', age: 7 }
    // no consent -> no localStorage
    saveProfile(p as any)
    expect(localStorage.getItem('ks_profile')).toBeNull()
    // give consent
    localStorage.setItem('ks_parent_consent', 'true')
    saveProfile(p as any)
    expect(localStorage.getItem('ks_profile')).not.toBeNull()
  })

  it('saves and loads stats in sessionStorage', () => {
    const s = { rounds: 2, accuracy: 85 }
    saveStats(s)
    const loaded = loadStats()
    expect(loaded).toEqual(expect.objectContaining({ rounds: 2, accuracy: 85 }))
  })
})
