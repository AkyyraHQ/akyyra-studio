<template>
  <aside class="hidden w-64 flex-col border-r border-line bg-panel/80 px-6 py-8 md:flex">
    <div class="mb-10">
      <div class="text-xs uppercase tracking-[0.4em] text-textSoft">Akyyra</div>
      <div class="mt-2 text-2xl font-semibold text-text">Studio</div>
    </div>
    <nav class="flex flex-1 flex-col gap-2 text-sm">
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="nav-item">
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
    <div class="mt-6 rounded-2xl border border-line bg-panelSoft px-4 py-4 text-xs text-textSoft">
      Upload flow → Gemini → YouTube draft
    </div>
  </aside>
</template>

<script setup lang="ts">
const items = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Upload', to: '/upload' },
  { label: 'Videos', to: '/videos' },
  { label: 'Settings', to: '/settings' },
];
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  color: #9aa4b2;
  transition: all 150ms ease;
}

.nav-item.router-link-active {
  background: rgba(92, 225, 230, 0.12);
  color: #e6ecf5;
  box-shadow: 0 0 24px rgba(92, 225, 230, 0.2);
}

.nav-item:hover {
  color: #e6ecf5;
}
</style>
