require("dotenv").config();
const { API_BASE_URL, API_OGP_URL } = process.env;

export default {
  /*
   ** Headers of the page
   */
  head: {
    title: "漫画ツクール",
    htmlAttrs: {
      lang: "ja",
      prefix: "og: http://ogp.me/ns#",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "You can easily create an Manga style image.\r\n漫画風の画像ををかんたんに作れるサービスです",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "MangaCreator\r\n漫画ツクール",
      },
      { hid: "og:type", property: "og:type", content: "article" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://manga.art-creator.net",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "MangaCreator\r\n漫画ツクール",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "You can easily create an Manga style image.\r\n漫画風の画像ををかんたんに作れるサービスです",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://yuilog.xyz/wp-content/uploads/2021/07/background.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://yuilog.xyz/wp-content/uploads/2021/07/background.jpg",
      },
      { name: "twitter:site", content: "@yui_active" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "https://yuilog.xyz/wp-content/uploads/2021/07/manga-favicon.jpg",
      },
    ],
  },

  target: "static",

  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/i18n.js"],

  components: true,

  env: {
    API_BASE_URL,
    API_OGP_URL,
  },
  buildModules: ["@nuxtjs/tailwindcss", "@aceforth/nuxt-optimized-images"],
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    ["cookie-universal-nuxt", { parseJSON: false }],
  ],

  /*
   ** Build configuration
   */
  build: {},
};
