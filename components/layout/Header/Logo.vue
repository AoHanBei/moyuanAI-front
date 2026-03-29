<template>
  <div>
    <NuxtLinkLocale v-if="logo.light && logo.dark" :to="localePath('/')" class="flex items-center">
      <NuxtImg :src="logo.light" class="h-11 w-auto dark:hidden" />
      <NuxtImg :src="logo.dark" class="hidden h-11 w-auto dark:block" />
      <span v-if="showTitle && title" class="ml-3 self-center text-xl font-bold tracking-tight md:text-2xl">
        {{ $t(title) }}
      </span>
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
const { logo, title, showTitle } = useConfig().value.header;
const { localePath } = useI18nDocs();
</script>
