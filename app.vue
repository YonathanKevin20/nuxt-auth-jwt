<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <UContainer class="flex flex-col h-screen">
      <nav class="flex items-center my-4">
        <Auth />
      </nav>
      <NuxtPage />
      <Footer />
    </UContainer>
  </NuxtLayout>
</template>
