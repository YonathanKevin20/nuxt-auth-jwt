<script setup lang="ts">
import { version } from '~/package.json'
</script>

<template>
  <footer class="mt-auto border-t border-slate-400 px-1.5 py-2.5 flex justify-between items-center">
    <span class="text-sm text-gray-500">v{{ version }}</span>
    <DarkModeSwitcher />
  </footer>
</template>
