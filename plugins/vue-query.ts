import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import type { NuxtApp } from '#app';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });
});
