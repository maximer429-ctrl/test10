<template>
  <div class="consent-root" role="dialog" aria-modal="true">
    <div class="consent-card">
      <h2>Parental Consent</h2>
      <p>Please confirm you are a parent or guardian and agree to allow this child to use KidsScore.</p>

      <div class="consent-details">
        <p><strong>We do not collect personal data</strong> without explicit parental consent.</p>
        <p>By consenting you agree to the minimal data policies described in our privacy settings.</p>
      </div>

      <div class="consent-actions">
        <button class="btn" @click="$emit('cancel')">Cancel</button>
        <button class="btn btn-primary" @click="consent">I consent</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['consented','cancel'])

function consent(){
  emit('consented')
}
</script>

<style scoped>
.consent-root{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(2,6,23,0.35);z-index:70}
.consent-card{background:var(--color-surface);padding:20px;border-radius:12px;max-width:520px;width:92%;box-shadow:0 10px 40px var(--shadow-2);border:1px solid var(--border);color:var(--color-text)}
.consent-card h2{margin-top:0}
.consent-actions{display:flex;gap:12px;justify-content:flex-end;margin-top:16px}
.btn{padding:10px 14px;border-radius:10px;border:1px solid transparent;cursor:pointer}
.btn-primary{background:var(--color-primary);color:#fff}
</style>
