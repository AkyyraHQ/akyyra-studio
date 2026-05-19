<template>
  <div class="rounded-3xl border border-line bg-panel/70 p-6">
    <div class="flex items-start justify-between">
      <div>
        <div class="text-xs uppercase tracking-[0.3em] text-textSoft">{{ status }}</div>
        <div class="mt-2 text-lg font-semibold text-text">{{ title }}</div>
      </div>
      <StatusBadge :status="status" />
    </div>
    <div class="mt-4 text-xs text-textSoft">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import StatusBadge from './StatusBadge.vue';

defineProps<{ title: string; description: string; status: string }>();
</script>
