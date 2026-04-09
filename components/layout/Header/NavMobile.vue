<template>
  <div>
    <LayoutHeaderNavMobileItem
      v-for="(item, i) in visibleNav"
      :key="i"
      :item="item"
      :index="i"
    />
  </div>
</template>

<script setup lang="ts">
const { nav } = useConfig().value.header;
const visibleNav = computed(() => nav.filter(item => item.to === '/interview-resources'));
</script>
