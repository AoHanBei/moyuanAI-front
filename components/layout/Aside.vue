<template>
  <UiScrollArea orientation="vertical" class="relative h-full overflow-hidden py-6 pr-6 text-sm md:pr-4" type="hover">
    <LayoutHeaderNavMobile v-if="isMobile" class="mb-5 border-b pb-2" />
    <LayoutSearchButton v-if="config.search.inAside" />

    <LayoutAsideTree
      v-if="tree.length"
      :links="tree"
      :level="0"
      class="pt-2"
    />
  </UiScrollArea>
</template>

<script setup lang="ts">
defineProps<{ isMobile: boolean }>();

const { navDirFromPath } = useContentHelpers();
const config = useConfig();
const { locale, defaultLocale, navigation } = useI18nDocs();
const route = useRoute();

const sectionPath = computed(() => {
  const segments = route.path.split('/');
  const depth = locale.value === defaultLocale ? 2 : 3;
  return segments.slice(0, depth).join('/') || '/';
});

const tree = computed(() => {
  if (!config.value.aside.useLevel)
    return navigation.value;

  return navDirFromPath(sectionPath.value, navigation.value) ?? [];
});
</script>
