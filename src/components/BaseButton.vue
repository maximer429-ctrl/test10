<template>
  <button :class="btnClass" :disabled="disabled"><slot /></button>
</template>

<script setup>
import { computed } from 'vue'
defineProps({ variant: { type: String, default: 'primary' }, disabled: { type: Boolean, default: false } })

const props = defineProps(['variant','disabled'])
const btnClass = computed(() => ['btn', props.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'])
</script>

<style scoped>
/* button styling delegated to components.css */
</style>
