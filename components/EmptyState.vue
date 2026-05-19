<template>
  <div class="rounded-3xl border border-line bg-panel/70 p-8 text-center text-sm text-textSoft">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script>
