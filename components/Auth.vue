<script setup lang="ts">
const { signOut, status } = useAuth()
</script>

<template>
  <div class="ml-auto">
    <div v-if="status === 'authenticated'">
      <UButton
        @click="signOut({ callbackUrl: '/login' })"
        label="Sign Out"
        variant="link"
        color="gray" />
    </div>
    <div v-else>
      <UButton
        to="/register"
        label="Register"
        variant="link"
        color="gray" />
      <UButton
        to="/login"
        label="Login"
        variant="link"
        color="gray" />
    </div>
  </div>
</template>
