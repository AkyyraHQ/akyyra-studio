<template>
  <span class="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em]" :class="badgeClass">
    {{ status }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ status: string }>();

const badgeClass = computed(() => {
  if (props.status === 'PUBLISHED') return 'bg-brand/20 text-brand';
  if (props.status === 'FAILED') return 'bg-danger/20 text-danger';
  if (props.status === 'PROCESSING') return 'bg-warn/20 text-warn';
  return 'bg-panelSoft text-textSoft';
});
</script>
