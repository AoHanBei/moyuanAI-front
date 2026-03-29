import type { Theme } from '@/lib/themes';
import { themes } from '@/lib/themes';

interface Config {
  theme?: Theme['name'];
}

const FIXED_RADIUS = 0.75;

export function useThemes() {
  const { value: color } = useColorMode();
  const isDark = color === 'dark';

  const defaultTheme = useConfig().value.theme;
  const config = useCookie<Config>('theme', {
    default: () => ({
      theme: defaultTheme.color as Color,
    }),
  });

  const allColors: Color[] = [
    'zinc',
    'rose',
    'blue',
    'green',
    'orange',
    'red',
    'slate',
    'stone',
    'gray',
    'neutral',
    'yellow',
    'violet',
  ];

  const theme = computed(() => config.value.theme);
  const radius = computed(() => FIXED_RADIUS);
  const themeClass = computed(() => `theme-${theme.value}`);

  function setTheme(themeName: Theme['name']) {
    config.value.theme = themeName;
  }

  function setRadius() {
    // radius is fixed at 0.75rem
  }

  function setClassTheme() {
    document.body.classList.remove(
      ...allColors.map(color => `theme-${color}`),
    );
    document.body.classList.add(themeClass.value);
    document.body.style.setProperty('--radius', `${FIXED_RADIUS}rem`);
  }

  const themePrimary = computed(() => {
    const t = themes.find(t => t.name === theme.value);
    return `hsl(${t?.cssVars[isDark ? 'dark' : 'light'].primary})`;
  });

  return {
    themeClass,
    theme,
    setTheme,
    radius,
    setRadius,
    setClassTheme,
    allColors,
    themePrimary,
  };
}
