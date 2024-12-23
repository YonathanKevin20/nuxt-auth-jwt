// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      endpoints: {
        getSession: { path: '/me', method: 'get' },
      },
      session: {
        dataType: {
          data: {
            id: 'number',
            username: 'string',
            role: 'string'
          }
        }
      },
      token: {
        signInResponseTokenPointer: '/data/token',
        cookieName: 'example.token',
        maxAgeInSeconds: 60 * 60 * 12 // 12 hours
      }
    }
  },

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
  ],

  nitro: {
    imports: {
      dirs: [
        './server/database/schemas',
      ]
    }
  },

  runtimeConfig: {
    databaseUrl: '',
    jwtSecret: '',
  }
})
