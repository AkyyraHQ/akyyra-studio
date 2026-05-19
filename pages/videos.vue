<template>
  <section class="grid gap-6 md:grid-cols-2">
    <VideoCard title="Launch Day" description="Processing upload" status="PROCESSING" />
    <VideoCard title="AI Tips" description="Published" status="PUBLISHED" />
    <VideoCard title="Workflow Update" description="Failed upload" status="FAILED" />
  </section>
</template>

<script setup lang="ts">
import VideoCard from '~/components/VideoCard.vue';
</script>
