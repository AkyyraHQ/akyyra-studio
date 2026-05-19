import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: ['./components/**/*.{vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  theme: {
    extend: {
      colors: {
        canvas: '#0B0D12',
        panel: '#121622',
        panelSoft: '#161B29',
        line: '#1F2433',
        brand: '#5CE1E6',
        brandMuted: '#1D6D78',
        text: '#E6ECF5',
        textSoft: '#9AA4B2',
        danger: '#FF6B6B',
        warn: '#F5C451'
      },
      fontFamily: {
        display: ['"Sora"', '"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(92, 225, 230, 0.15)',
      },
    },
  },
  plugins: [],
};
