import terser from "@rollup/plugin-terser"
import resolve from "@rollup/plugin-node-resolve"
import css from "rollup-plugin-css-only"
import copy from "rollup-plugin-copy"
import typescript from "@rollup/plugin-typescript"
import { generateSW } from "rollup-plugin-workbox"

function shoelaceIcon(iconName) {
  return {
    src: `node_modules/@shoelace-style/shoelace/dist/assets/icons/${iconName}.svg`,
    dest: "static/epubeditor/assets/icons/",
  }
}

export default {
  input: "static-src/main.ts",
  output: {
    file: "static/epubeditor/main.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    typescript(),
    terser(),
    resolve(),
    css({ output: "main.css" }),
    copy({
      copyOnce: true,
      targets: [
        shoelaceIcon("box-arrow-up-right"),
        shoelaceIcon("list"),
        shoelaceIcon("circle-half"),
        shoelaceIcon("moon"),
        shoelaceIcon("sun"),
        shoelaceIcon("envelope"),
        shoelaceIcon("chevron-left"),
        shoelaceIcon("book"),
        shoelaceIcon("chevron-right"),
        shoelaceIcon("pencil"),
        shoelaceIcon("three-dots-vertical"),
        shoelaceIcon("bookshelf"),
        shoelaceIcon("ear"),
        shoelaceIcon("file-earmark-image"),
        shoelaceIcon("file-earmark-play"),
        shoelaceIcon("file-earmark-break"),
        shoelaceIcon("file-earmark-font"),
        shoelaceIcon("file-earmark-text"),
        shoelaceIcon("file-earmark-ruled"),
        shoelaceIcon("play-circle"),
        shoelaceIcon("check"),
        shoelaceIcon("check-circle"),
        shoelaceIcon("arrow-left-circle"),
        shoelaceIcon("trash"),
        shoelaceIcon("arrow-left-short"),
        shoelaceIcon("arrows-collapse"),
        shoelaceIcon("arrows-collapse-vertical"),
        shoelaceIcon("arrows-expand"),
        shoelaceIcon("arrows-expand-vertical"),
        shoelaceIcon("exclamation-octagon"),
        shoelaceIcon("info-circle"),
      ],
    }),
    generateSW({
      cacheId: "epubeditor",
      swDest: "static/epubeditor/sw.js",
      globDirectory: "static/epubeditor",
      globPatterns: ["**/*.{png,jpg,jpeg,gif,webp,svg,ico}"], // TODO '**/*.{js,css,png,jpg,jpeg,gif,webp,svg,ico}'
      modifyURLPrefix: {
        "": "/static/epubeditor/",
      },
      sourcemap: true,
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
            const pathname = url.pathname.toLowerCase()
            return sameOrigin && isCachableUrl && !(
              pathname.endsWith('.smil') ||
              pathname.endsWith('.xhtml')
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
            const pathname = url.pathname.toLowerCase()
            return sameOrigin && isCachableUrl && (
              pathname.endsWith('.smil') ||
              pathname.endsWith('.xhtml')
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
    }),
  ],
}
