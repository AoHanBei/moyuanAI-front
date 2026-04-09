<template>
  <li>
    <!-- Folder -->
    <div v-if="link.children">
      <template v-if="folderStyle === 'group'">
        <div
          class="text-foreground/70 mt-2 flex items-center gap-2 rounded-md px-2 text-xs font-semibold outline-none"
          :class="[link.navTruncate !== false && 'h-8']"
        >
          <LayoutAsideTreeItemButton :link />
        </div>
        <LayoutAsideTree :links="link.children" :level="level" />
      </template>
      <template v-else>
        <button
          class="text-foreground/80 hover:bg-muted hover:text-primary flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm"
          :class="[link.navTruncate !== false && 'h-8']"
          @click="isOpen = !isOpen"
        >
          <SmartIcon
            v-if="folderStyle === 'tree'"
            name="lucide:chevron-down"
            class="transition-transform"
            :class="[!isOpen && '-rotate-90']"
          />
          <LayoutAsideTreeItemButton :link />
          <SmartIcon
            v-if="folderStyle === 'default'"
            name="lucide:chevron-down"
            class="ml-auto transition-transform"
            :class="[!isOpen && '-rotate-90']"
          />
        </button>
        <div v-show="isOpen">
          <LayoutAsideTree :links="link.children" :level="level + 1" />
        </div>
      </template>
    </div>
    <!-- Page -->
    <NuxtLinkLocale
      v-else
      :to="link._path"
      class="text-foreground/80 hover:bg-muted hover:text-primary flex items-center gap-2 rounded-md p-2 text-sm"
      :class="[
        isActive && 'bg-muted !text-primary font-medium',
        link.navTruncate !== false && 'h-8',
      ]"
    >
      <LayoutAsideTreeItemButton :link />
    </NuxtLinkLocale>
  </li>
</template>

<script setup lang="ts">
import type { NavItem } from '@ztl-uwu/nuxt-content';

const { link, level } = defineProps<{
  link: NavItem;
  level: number;
}>();

const { collapse, collapseLevel, folderStyle: defaultFolderStyle } = useConfig().value.aside;

const collapsed = useCollapsedMap();
const route = useRoute();

function normalizePath(p: string) {
  const out = p.replace(/\/+$/, '');
  return out === '' ? '/' : out;
}

function isInSection(currentPath: string, sectionPath: string) {
  const current = normalizePath(currentPath);
  const section = normalizePath(sectionPath);
  return current === section || current.startsWith(`${section}/`);
}

function defaultOpen() {
  // Always unfold the section that contains the current page,
  // so users can immediately see where they are in the sidebar.
  if (link.children && isInSection(route.path, link._path))
    return true;
  if (link.collapse !== undefined)
    return !link.collapse;
  if (collapse)
    return false;

  return level < collapseLevel && !collapse;
}

const savedState = collapsed.value.get(link._path);
const isOpen = ref(savedState ?? defaultOpen());

watch(isOpen, (v) => {
  collapsed.value.set(link._path, v);
});

watch(
  () => route.path,
  (path) => {
    if (link.children && isInSection(path, link._path) && !isOpen.value)
      isOpen.value = true;
  },
);

const isActive = computed(() => normalizePath(link._path) === normalizePath(route.path));

const folderStyle = computed(() => link.sidebar?.style ?? defaultFolderStyle);
</script>
