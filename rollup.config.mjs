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
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/box-arrow-up-right.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/list.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/circle-half.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/moon.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/sun.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/envelope.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/chevron-left.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/book.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/chevron-right.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/pencil.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/three-dots-vertical.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/bookshelf.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/ear.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/ear-fill.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-image.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-play.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-break.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-font.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-text.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/file-earmark-ruled.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/play-circle.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/check.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/check-circle.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/arrow-left-circle.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/trash.svg',
          dest: 'static/epubeditor/assets/icons/'
        },
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/arrow-left-short.svg',
          dest: 'static/epubeditor/assets/icons/'
        }
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
            return sameOrigin && isCachableUrl && !(
              url.pathname.toLowerCase().endsWith('.smil') ||
              url.pathname.toLowerCase().endsWith('.xml') ||
              url.pathname.toLowerCase().endsWith('.opf') ||
              url.pathname.toLowerCase().endsWith('/')
            )
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
            return sameOrigin && isCachableUrl && (
              url.pathname.toLowerCase().endsWith('.smil') ||
              url.pathname.toLowerCase().endsWith('.xml') ||
              url.pathname.toLowerCase().endsWith('.opf') ||
              url.pathname.toLowerCase().endsWith('/')
            )
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
