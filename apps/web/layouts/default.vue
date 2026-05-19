<template>
  <div class="min-h-screen bg-atmosphere">
    <div class="flex min-h-screen">
      <SidebarNav />
      <div class="flex-1">
        <TopBar />
        <main class="px-6 pb-12 pt-6 md:px-10">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarNav from '~/components/SidebarNav.vue';
import TopBar from '~/components/TopBar.vue';
</script>
