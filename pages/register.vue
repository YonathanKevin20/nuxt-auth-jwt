<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { Register } from '~/schemas/RegisterSchema'
import { RegisterSchema } from '~/schemas/RegisterSchema'

useHead({
  title: 'Register'
})
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/home'
  }
})

const state = reactive({
  username: '',
  password: '',
  confirm_password: ''
})
watchEffect(() => {
  if (state.username.length > 0 && state.password.length > 0) {
    errorMessage.value = ''
  }
})
const hidePassword = ref(true)
const hideConfirmPassword = ref(true)
const errorMessage = ref('')
const pending = ref(false)

const { signUp } = useAuth()
const onSubmit = async (event: FormSubmitEvent<Register>) => {
  pending.value = true

  try {
    await signUp(event.data, { callbackUrl: '/home', redirect: true })
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
    <h1 class="text-2xl font-bold">Register</h1>

    <UForm :schema="RegisterSchema" :state="state" class="space-y-4 max-w-lg my-4" @submit="onSubmit">
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
      <UFormGroup label="Confirm Password" name="confirm_password">
        <UInput
          v-model="state.confirm_password"
          :type="hideConfirmPassword ? 'password' : 'text'"
          :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton
              v-show="hideConfirmPassword"
              color="black"
              variant="link"
              icon="i-mdi-eye"
              :padded="false"
              @click="hideConfirmPassword = !hideConfirmPassword" />
            <UButton
              v-show="!hideConfirmPassword"
              color="black"
              variant="link"
              icon="i-mdi-eye-off"
              :padded="false"
              @click="hideConfirmPassword = !hideConfirmPassword" />
          </template>
        </UInput>
      </UFormGroup>
      <UButton type="submit" label="Submit" :loading="pending" />
    </UForm>
  </main>
</template>
