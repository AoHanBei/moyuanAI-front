<template>
  <nav class="flex items-center gap-2 xl:gap-3">
    <NuxtLinkLocale
      v-for="(item, i) in visibleNav"
      :key="i"
      :to="localePath(item.to)"
      :target="item.target"
      class="group"
    >
      <div
        class="whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold tracking-tight text-foreground/90 transition-colors hover:bg-muted hover:text-primary xl:px-5 xl:text-base"
        :class="isActive(item.to) && 'bg-muted text-primary'"
      >
        {{ $t(item.title) }}
      </div>
    </NuxtLinkLocale>
  </nav>
</template>

<script setup lang="ts">
const { nav } = useConfig().value.header;
const { localePath } = useI18nDocs();
const route = useRoute();
const visibleNav = computed(() => nav.filter(item => item.to === '/interview-resources'));

function isActive(to?: string) {
  if (!to)
    return false;
  return route.path === to || route.path.startsWith(`${to}/`);
}
</script>
