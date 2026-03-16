<template>
  <section class="game-section">
    <div class="phone">
      <header class="topbar">
        <div class="topbar-title">Counting Game</div>
        <div class="topbar-badge">Round {{ round }} of {{ rounds }}</div>
      </header>

      <div class="progress-wrap">
        <div class="progress-meta"><span>Correct rounds</span><span>{{ correctRounds }} / {{ rounds }}</span></div>
        <div class="progress-track" role="progressbar" :aria-valuenow="correctRounds" :aria-valuemax="rounds">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <main class="game-area">
        <p class="game-prompt">How many 🍎 do you see?</p>
        <div class="objects-grid" aria-label="Apples to count, tap each one">
          <button v-for="(o, i) in objects" :key="i" :class="['obj', { 'obj--tapped': o.tapped }]" @click="toggle(i)" :aria-pressed="o.tapped.toString()" :aria-label="`Apple ${i+1}`">🍎</button>
        </div>

        <div class="counter-display" aria-live="polite">{{ count }}</div>
        <div class="counter-hint">Tap each apple to count it</div>
      </main>

      <div class="btn-row">
        <BaseButton @click="submit">Submit ✓</BaseButton>
        <BaseButton variant="secondary" @click="reset">Reset</BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from '../components/BaseButton.vue'

const rounds = 3
const round = ref(1)
const correctRounds = ref(0)

function makeObjects(n = 7) {
  return Array.from({ length: n }).map(() => ({ tapped: false }))
}

const objects = ref(makeObjects(7))

const count = computed(() => objects.value.filter(o => o.tapped).length)
const progressPercent = computed(() => (correctRounds.value / rounds) * 100)

function toggle(i) {
  objects.value[i].tapped = !objects.value[i].tapped
}

function reset() {
  objects.value = makeObjects(objects.value.length)
}

function submit() {
  // simplistic: if at least 1 tapped, count as correct for demo
  if (count.value > 0) correctRounds.value++
  round.value++
  if (round.value > rounds) {
    // end of level: show summary then reset
    alert(`Round done! Correct rounds: ${correctRounds.value} / ${rounds}`)
    round.value = 1
    correctRounds.value = 0
  }
  // increase difficulty slightly
  const nextCount = Math.min(12, 7 + correctRounds.value * 2)
  objects.value = makeObjects(nextCount)
}
</script>

<style scoped>
.phone{max-width:420px;margin-top:20px;background:var(--color-background);border-radius:28px;overflow:hidden;border:1px solid var(--border);box-shadow:0 8px 32px var(--shadow-2),0 1px 2px var(--shadow-1)}
.topbar{background:var(--color-primary);padding:16px;display:flex;align-items:center;justify-content:space-between;color:#fff}
.topbar-title{font-weight:700}
.topbar-badge{background:rgba(255,255,255,0.22);padding:4px 10px;border-radius:20px;font-weight:600}
.progress-wrap{padding:12px 16px 0}
.progress-meta{display:flex;justify-content:space-between;font-size:0.75rem;color:var(--color-muted);margin-bottom:4px}
.progress-track{height:8px;background:var(--border);border-radius:99px;overflow:hidden}
.progress-fill{height:100%;background:var(--color-accent);border-radius:99px}
.game-area{padding:24px}
.game-prompt{text-align:center;font-weight:700;margin-bottom:16px}
.objects-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:16px}
.obj{width:56px;height:56px;border-radius:50%;background:var(--muted-fill);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.6rem}
.obj--tapped{background:#D1FAE5;border-color:var(--color-accent);position:relative}
.obj--tapped::after{content:'✓';position:absolute;top:-7px;right:-7px;width:20px;height:20px;background:var(--color-accent);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700}
.counter-display{text-align:center;font-size:2.5rem;font-weight:700;color:var(--color-primary);margin-bottom:8px}
.counter-hint{text-align:center;color:var(--color-muted);margin-bottom:8px}
.btn-row{display:flex;gap:12px;padding:12px}
.btn{flex:1;min-height:44px;border-radius:12px;font-weight:600;border:0;cursor:pointer}
.btn-primary{background:var(--color-primary);color:#fff}
.btn-secondary{background:transparent;border:2px solid var(--color-secondary);color:var(--color-text)}
</style>
