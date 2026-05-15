// @ts-check

import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"
import js from "@eslint/js"

export default defineConfig([js.configs.recommended, tseslint.configs.recommended, eslintConfigPrettier])
