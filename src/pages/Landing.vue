<template>
  <section class="landing-root">
    <header class="hero" role="banner" aria-labelledby="hero-title">
      <div class="hero-copy">
        <div class="eyebrow">Playful learning for children • Ages 8–10</div>
        <h1 id="hero-title" class="hero-title">KidsScore — playful math practice for ages 8–10</h1>
        <p class="hero-sub">Short, friendly mini-games that teach counting and arithmetic with positive reinforcement and adaptive difficulty.</p>

        <div class="hero-ctas">
          <button class="btn primary" @click="$emit('play')" aria-label="Play KidsScore now">Play Now</button>
          <a class="btn ghost" href="#parents" aria-label="Information for parents">For Parents</a>
        </div>

        <div class="coppa-note" role="note">
          <strong>Privacy & COPPA:</strong> We respect children's privacy. No personal data is collected without parental consent. <a href="#parents">Learn more</a>
        </div>
      </div>

      <div class="hero-art" aria-hidden="false">
        <!-- illustrative SVG matching the mockup's playful style -->
        <svg viewBox="0 0 320 220" class="illustration" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration showing playful counting activity">
          <rect x="0" y="0" width="320" height="220" rx="16" fill="var(--color-surface)" />
          <circle cx="80" cy="90" r="28" fill="var(--color-primary)" />
          <circle cx="140" cy="60" r="20" fill="var(--color-secondary)" />
          <circle cx="200" cy="110" r="24" fill="var(--color-accent)" />
          <g transform="translate(30,150)" fill="var(--color-text)">
            <rect width="260" height="10" rx="5" fill="rgba(0,0,0,0.05)" />
          </g>
        </svg>
      </div>
    </header>

    <section id="parents" class="parents">
      <h2>For parents</h2>
      <p>KidsScore is designed for short sessions and positive reinforcement. Parental controls and consent flows are available in the settings.</p>
    </section>
  </section>
</template>

<script setup>
// emits handled by parent App.vue
</script>

<style scoped>
.landing-root{font-family:var(--font-family);color:var(--color-text);padding:var(--space-l);max-width:1100px;margin:var(--space-m) auto}
.hero{display:flex;gap:var(--space-m);align-items:center;justify-content:space-between}
.hero-copy{flex:1}
.eyebrow{color:var(--color-muted);font-weight:600;margin-bottom:8px;font-size:var(--caption)}
.hero-title{font-size:var(--h1);margin:0 0 8px}
.hero-sub{color:var(--color-muted);margin-bottom:var(--space-m);font-size:var(--body)}
.hero-ctas{display:flex;gap:12px;margin-bottom:14px}
.btn{padding:10px 16px;border-radius:var(--radius-md);border:1px solid transparent;cursor:pointer;font-weight:700}
.btn.primary{background:var(--color-primary);color:white}
.btn.ghost{background:transparent;color:var(--color-text);border:1px solid rgba(0,0,0,0.06)}
.coppa-note{font-size:0.9rem;color:var(--color-muted);background:var(--color-surface);padding:12px;border-radius:var(--radius-sm)}
.hero-art{width:360px;flex-shrink:0}
.illustration{width:100%;height:auto;border-radius:var(--radius-md);box-shadow:0 8px 24px var(--shadow-1)}
.parents{margin-top:var(--space-m);padding:var(--space-m);background:var(--color-surface);border-radius:var(--radius-md)}

@media(max-width:900px){
  .hero{flex-direction:column-reverse}
  .hero-art{width:100%}
  .hero-title{font-size:1.5rem}
}
</style>
