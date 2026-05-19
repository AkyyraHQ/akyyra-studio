<template>
  <section class="space-y-6">
    <div class="grid gap-6 md:grid-cols-3">
      <VideoCard title="Monday Recap" description="Waiting for AI metadata" status="AI_GENERATING" />
      <VideoCard title="Creator Tips" description="Scheduled for tomorrow" status="SCHEDULED" />
      <VideoCard title="Growth Sprint" description="Draft ready" status="READY" />
    </div>
    <EmptyState message="Connect a YouTube channel to start uploading." />
  </section>
</template>

<script setup lang="ts">
import VideoCard from '~/components/VideoCard.vue';
import EmptyState from '~/components/EmptyState.vue';
</script>
