<template>
  <div class="onboarding-root" role="dialog" aria-modal="true">
    <div class="onboarding-card">
      <h2>Welcome to KidsScore</h2>
      <p>Short, friendly mini-games that teach counting and arithmetic with positive reinforcement.</p>

      <ol class="steps">
        <li><strong>Play short rounds</strong> — quick sessions for focused learning.</li>
        <li><strong>Safe by design</strong> — no personal data without parental consent.</li>
        <li><strong>Progress & rewards</strong> — gentle encouragement that builds confidence.</li>
      </ol>

      <div class="actions">
        <button class="btn btn-primary" @click="$emit('skip-onboarding')">Continue</button>
        <button class="btn" @click="$emit('request-parent-consent')">I'm a parent (Consent)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.onboarding-root{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(2,6,23,0.35);z-index:60}
.onboarding-card{background:var(--color-surface);padding:20px;border-radius:12px;max-width:520px;width:92%;box-shadow:0 10px 40px var(--shadow-2);border:1px solid var(--border);color:var(--color-text)}
.onboarding-card h2{margin-top:0}
.steps{margin:12px 0 18px;padding-left:18px}
.actions{display:flex;gap:12px;justify-content:flex-end}
.btn{padding:10px 14px;border-radius:10px;border:1px solid transparent;cursor:pointer}
.btn-primary{background:var(--color-primary);color:#fff}
</style>
