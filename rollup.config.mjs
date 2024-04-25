import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only'
import copy from 'rollup-plugin-copy';
import typescript from "@rollup/plugin-typescript";
import {generateSW} from "rollup-plugin-workbox";


export default {
  input: 'static-src/main.ts',
  output: {
    file: 'static/epubeditor/main.js',
    format: 'es',
  },
  plugins: [
    typescript(),
    terser(),
    resolve(),
    css({output: 'main.css'}),
    copy({
      copyOnce: true,
      targets: [
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/list.svg', dest: 'static/epubeditor/assets/icons/list.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/circle-half.svg', dest: 'static/epubeditor/assets/icons/circle-half.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/moon.svg', dest: 'static/epubeditor/assets/icons/moon.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/sun.svg', dest: 'static/epubeditor/assets/icons/sun.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/chevron-left.svg', dest: 'static/epubeditor/assets/icons/chevron-left.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/book.svg', dest: 'static/epubeditor/assets/icons/book.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/chevron-right.svg', dest: 'static/epubeditor/assets/icons/chevron-right.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/pencil.svg', dest: 'static/epubeditor/assets/icons/pencil.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/three-dots-vertical.svg', dest: 'static/epubeditor/assets/icons/three-dots-vertical.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/bookshelf.svg', dest: 'static/epubeditor/assets/icons/bookshelf.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/ear.svg', dest: 'static/epubeditor/assets/icons/ear.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-image.svg', dest: 'static/epubeditor/assets/icons/file-earmark-image.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-play.svg', dest: 'static/epubeditor/assets/icons/file-earmark-play.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-break.svg', dest: 'static/epubeditor/assets/icons/file-earmark-break.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-font.svg', dest: 'static/epubeditor/assets/icons/file-earmark-font.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-text.svg', dest: 'static/epubeditor/assets/icons/file-earmark-text.svg'},
        {src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-ruled.svg', dest: 'static/epubeditor/assets/icons/file-earmark-ruled.svg'}
      ]
    }),
    generateSW({
      cacheId: 'epubeditor',
      swDest: 'static/epubeditor/sw.js',
      globDirectory: 'static/epubeditor',
      globPatterns: ['**/*.{js,css,png,jpg,jpeg,gif,webp,svg,ico}'],
      modifyURLPrefix: {
        '': '/static/epubeditor/'
      },
      inlineWorkboxRuntime: true,
      sourcemap: false,
      runtimeCaching: [
        {
          handler: "CacheFirst",
          method: "GET",
          urlPattern: ({url, sameOrigin}) => {
            const parts = url.pathname.split('/');
            const isCachableUrl = (
              parts.includes('books') ||
              parts.includes('covers') ||
              parts.includes('history') ||
              parts.includes('resources') ||
              parts.includes('about')
            )
            return sameOrigin && isCachableUrl && !url.pathname.endsWith('.smil')
          },
          options: {
            cacheName: 'epubeditor-cache-first',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 7,
            }
          }
        },
        {
          handler: "NetworkFirst",
          method: "GET",
          urlPattern: ({url, sameOrigin}) => {
            const parts = url.pathname.split('/');
            const isCachableUrl = (
              parts.includes('books') ||
              parts.includes('covers') ||
              parts.includes('history') ||
              parts.includes('resources') ||
              parts.includes('about')
            )
            return sameOrigin && isCachableUrl && url.pathname.endsWith('.smil')
          },
          options: {
            cacheName: 'epubeditor-network-first',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 7,
            }
          }
        }
      ]
    })
  ]
};
