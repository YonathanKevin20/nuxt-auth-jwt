<script setup lang="ts">
useHead({
  title: 'Home'
})

const { data } = useAuth()
</script>

<template>
  <div v-if="data">Hello, {{ data?.data.username }}</div>
</template>
