import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons({}),
    presetAttributify(),
  ],
  shortcuts: [
    ['t-c', 'w-full h-full'],
    ['full', 'w-100vw h-100vh'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['text-ellipsis', 'truncate'],
    ['btn', 'h22 lh-20 px10 color-white border cursor-pointer'],
    ['border-1', 'border-black border-1px'],
  ],
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    [/^fs-(.+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
    [/^fw-(.+)$/, ([, height]) => ({ 'font-weight': `${height}` })],
    [/^block-(.+)$/, ([, size]) => ({ width: `${size}px`, height: `${size}px` })],
    [
      /^border-(\w+)-(.+)-(.*)$/,
      ([, color, width, style]) => ({
        'border-color': `${color}`,
        'border-width': `${width}`,
        'border-style': `${style ? style : 'solid'}`,
      }),
    ],
  ],
});
