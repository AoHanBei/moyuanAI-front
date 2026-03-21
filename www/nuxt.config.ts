// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['..'],
  i18n: {
    defaultLocale: 'zhcn',
    locales: [
      {
        code: 'zhcn',
        name: '简体中文',
        language: 'zh-CN',
      },
    ],
  },
  ogImage: {
    fonts: [
      'Geist:400',
      'Geist:700',
    ],
  },
  content: {
    highlight: {
      langs: ['mdc', 'mermaid', 'tsx'],
    },
  },
  compatibilityDate: '2025-05-13',
});

