<template>
  <section class="section">
    <div class="phone">
      <header class="topbar">
        <div class="topbar-title">Counting Game</div>
        <div class="topbar-badge">{{ roundLabel }}</div>
      </header>

      <div class="progress-wrap">
        <div class="progress-meta"><span>Correct rounds</span><span>{{ correctRounds }} / {{ rounds }}</span></div>
        <div class="progress-track" role="progressbar" :aria-valuenow="correctRounds" :aria-valuemax="rounds" :aria-label="`Correct rounds: ${correctRounds} of ${rounds}`">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <div v-if="summaryVisible" class="summary-card" role="region" aria-label="Round summary">
        <div class="summary-icon">🎉</div>
        <div class="summary-title">{{ summaryTitle }}</div>
        <div class="summary-sub">Here's how you did this round</div>
        <div class="stat-row">
          <div class="stat-box">
            <div class="stat-value">{{ summary.score }}</div>
            <div class="stat-label">Score</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">{{ summary.missed }}</div>
            <div class="stat-label">Missed</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">{{ summary.accuracy }}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
        </div>
      </div>

      <main v-else class="game-area">
        <p class="game-prompt">How many {{ symbol }} do you see?</p>
        <div class="objects-grid" :aria-label="objectsLabel">
          <button v-for="(o, i) in objects" :key="i" type="button" :class="['obj', { 'obj--tapped': o.tapped }]" @click="toggle(i)" :aria-pressed="o.tapped.toString()" :aria-label="`${objectName} ${i+1}`">{{ symbol }}</button>
        </div>

        <div class="counter-display" aria-live="polite" :aria-label="`Count so far: ${count}`">{{ count }}</div>
        <div class="counter-hint">{{ hintText }}</div>
      </main>

      <div class="btn-row">
        <button v-if="summaryVisible" class="btn btn-primary" @click="nextRound">Next round →</button>
        <button v-else class="btn btn-primary" @click="submit">Submit ✓</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as persistence from '../lib/persistence'

const rounds = 3
const round = ref(1)
const correctRounds = ref(0)

// Game configuration
const symbol = ref('🍎')
const objectName = 'Apple'
const baseObjects = 7
const maxObjects = 20

function makeObjects(n = baseObjects) {
  return Array.from({ length: n }).map(() => ({ tapped: false }))
}

const objects = ref(makeObjects(baseObjects))
const summaryVisible = ref(false)
const summary = ref({ score: 0, missed: 0, accuracy: 0 })

const count = computed(() => objects.value.filter(o => o.tapped).length)
const progressPercent = computed(() => Math.round((correctRounds.value / rounds) * 100))
const roundLabel = computed(() => summaryVisible.value ? 'Round done!' : `Round ${round.value} of ${rounds}`)
const objectsLabel = computed(() => `${objectName}s to count, tap each one`)
const hintText = computed(() => summaryVisible.value ? '' : `Tap each ${objectName.toLowerCase()} to count it`)

function toggle(i) {
  objects.value[i].tapped = !objects.value[i].tapped
}

function reset() {
  objects.value = makeObjects(objects.value.length)
}

function submit() {
  const total = objects.value.length
  const tapped = count.value
  const missed = Math.max(0, total - tapped)
  const accuracy = total === 0 ? 0 : Math.round((tapped / total) * 100)

  summary.value = { score: tapped, missed, accuracy }
  summaryVisible.value = true

  if (tapped === total && tapped > 0) correctRounds.value++
  // update persistent stats for the session
  try {
    const prev = persistence.loadStats()
    const prevRounds = prev.rounds || 0
    const prevAccuracy = prev.accuracy || 0
    const newRounds = prevRounds + 1
    const newAccuracy = Math.round(((prevAccuracy * prevRounds) + accuracy) / newRounds)
    persistence.saveStats({ rounds: newRounds, accuracy: newAccuracy })
  } catch (e) {
    // ignore storage errors
    console.warn('persist stats failed', e)
  }
}

function nextRound() {
  summaryVisible.value = false
  round.value++
  if (round.value > rounds) {
    // end of session: if enough correct rounds, increase difficulty
    if (correctRounds.value >= 3) {
      const nextCount = Math.min(maxObjects, objects.value.length + 5)
      objects.value = makeObjects(nextCount)
    } else {
      objects.value = makeObjects(baseObjects)
    }
    round.value = 1
    correctRounds.value = 0
    return
  }
  const nextCount = Math.min(maxObjects, baseObjects + correctRounds.value * 2)
  objects.value = makeObjects(nextCount)
}
</script>

<style scoped>
:root{--phone-max:390px}
.section{margin-bottom:var(--space-xxl)}
.phone{max-width:var(--phone-max);margin:0 auto;margin-top:18px;background:var(--color-background);border-radius:28px;overflow:hidden;border:1px solid var(--border);box-shadow:0 8px 32px var(--shadow-2),0 1px 2px var(--shadow-1)}
.topbar{background:var(--color-primary);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;color:#fff}
.topbar-title{font-weight:700;font-size:1.1rem}
.topbar-badge{font-size:0.9rem;font-weight:600;background:rgba(255,255,255,0.22);border-radius:20px;padding:3px 12px}
.progress-wrap{padding:12px 24px 0}
.progress-meta{display:flex;justify-content:space-between;font-size:0.75rem;color:var(--color-muted);margin-bottom:4px}
.progress-track{height:8px;background:var(--border);border-radius:99px;overflow:hidden}
.progress-fill{height:100%;background:var(--color-accent);border-radius:99px}
.game-area{padding:24px}
.game-prompt{text-align:center;font-weight:700;margin-bottom:24px;font-size:1.2rem}
.objects-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:24px}
.obj{width:56px;height:56px;border-radius:50%;background:var(--muted-fill);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.6rem;position:relative}
.obj--tapped{background:#D1FAE5;border-color:var(--color-accent)}
.obj--tapped::after{content:'✓';position:absolute;top:-7px;right:-7px;width:20px;height:20px;background:var(--color-accent);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700}
.counter-display{text-align:center;font-size:3rem;font-weight:700;color:var(--color-primary);line-height:1;margin-bottom:6px}
.counter-hint{text-align:center;font-size:0.875rem;color:var(--color-muted);margin-bottom:16px}
.btn-row{display:flex;gap:12px;padding:12px 24px 24px}
.btn{flex:1;min-height:var(--tap-target-min);border-radius:var(--radius-md);font-weight:600;border:0;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:10px 16px}
.btn-primary{background:var(--color-primary);color:#fff}
.btn-secondary{background:transparent;border:2px solid var(--color-secondary);color:var(--color-text)}

/* Summary card */
.summary-card{margin:24px;background:var(--color-surface);border-radius:var(--radius-lg);padding:24px;border:1px solid var(--border);box-shadow:0 6px 20px var(--shadow-2);text-align:center}
.summary-icon{font-size:3rem;margin-bottom:12px}
.summary-title{font-size:1.5rem;font-weight:700;margin-bottom:6px}
.summary-sub{font-size:0.875rem;color:var(--color-muted);margin-bottom:16px}
.stat-row{display:flex;gap:16px}
.stat-box{flex:1;background:var(--color-background);border-radius:var(--radius-md);padding:16px;border:1px solid var(--border)}
.stat-value{font-size:1.75rem;font-weight:700;color:var(--color-primary);line-height:1}
.stat-label{font-size:0.75rem;color:var(--color-muted);margin-top:4px}

@media(min-width:640px){
  .phone{margin-top:24px}
}
</style>
