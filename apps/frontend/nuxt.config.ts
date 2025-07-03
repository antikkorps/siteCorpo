// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    public: {
      pocketbaseUrl: process.env.POCKETBASE_URL || "http://127.0.0.1:8090",
    },
  },

  css: ["~/assets/css/main.css"],
  ssr: true,
  nitro: {
    preset: "node-server",
  },
  app: {
    head: {
      title: "Nuxt PocketBase Monorepo",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Monorepo avec Nuxt et PocketBase" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
