<script setup>
import Header from "./components/Header.vue";
import Images from "./components/Images.vue";
</script>

<template>
  <Header />
  <div class="container">
    <Images />
  </div>

</template>

<style scoped>
.container {
  background: rgba(226, 225, 225, 0.267);
  height: 100vh;
}
</style>
