<template>
  <section class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
    <UploadDropzone />
    <MetadataEditor />
    <div class="lg:col-span-2 flex flex-wrap gap-3">
      <button class="rounded-full border border-line px-5 py-2 text-sm text-textSoft">Save Draft</button>
      <button class="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-canvas">Publish</button>
      <button class="rounded-full border border-line px-5 py-2 text-sm text-textSoft">Schedule</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import UploadDropzone from '~/components/UploadDropzone.vue';
import MetadataEditor from '~/components/MetadataEditor.vue';
</script>
