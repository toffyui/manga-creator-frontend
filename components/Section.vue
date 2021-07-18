<template>
  <section :id="id" class="bg-white md:py-4 py-2">
    <div class="container max-w-5xl flex flex-wrap mx-auto m-4">
      <h1
        class="w-full my-2 md:text-5xl text-2xl font-bold leading-tight text-center text-gray-800"
      >
        {{ $t(title) }}
      </h1>
      <div class="w-full mb-4">
        <div
          class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded"
        ></div>
      </div>
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
