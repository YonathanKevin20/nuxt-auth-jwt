<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { Login } from '~/schemas/LoginSchema'
import { LoginSchema } from '~/schemas/LoginSchema'

useHead({
  title: 'Login'
})
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/home'
  }
})

const state = reactive({
  username: '',
  password: ''
})
watchEffect(() => {
  if (state.username.length > 0 && state.password.length > 0) {
    errorMessage.value = ''
  }
})
const hidePassword = ref(true)
const errorMessage = ref('')
const pending = ref(false)

const { signIn } = useAuth()
const onSubmit = async (event: FormSubmitEvent<Login>) => {
  pending.value = true

  try {
    await signIn(event.data, { callbackUrl: '/home' })
  } catch (error: any) {
    const message = error.data.error?.message || error.data.message
    errorMessage.value = message
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold">Login</h1>

    <UForm :schema="LoginSchema" :state="state" class="space-y-4 max-w-lg my-4" @submit="onSubmit">
      <UAlert
        v-if="errorMessage"
        color="red"
        variant="soft"
        :title="errorMessage" />
      <UFormGroup label="Username" name="username">
        <UInput v-model="state.username" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          :type="hidePassword ? 'password' : 'text'"
          :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton
              v-show="hidePassword"
              color="black"
              variant="link"
              icon="i-mdi-eye"
              :padded="false"
              @click="hidePassword = !hidePassword" />
            <UButton
              v-show="!hidePassword"
              color="black"
              variant="link"
              icon="i-mdi-eye-off"
              :padded="false"
              @click="hidePassword = !hidePassword" />
          </template>
        </UInput>
      </UFormGroup>
      <UButton type="submit" label="Submit" :loading="pending" />
    </UForm>
  </main>
</template>
