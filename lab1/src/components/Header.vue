<script setup lang="ts">
import SearchImage from "../assets/search.svg";
</script>

<template>
  <header class="header">
    <div class="cursor-pointer">Mini blog</div>
    <div class="header2">
      <div class="cursor-pointer">Home</div>
      <div class="cursor-pointer">Politics</div>
      <div class="cursor-pointer">Tech</div>
      <div class="cursor-pointer">Entertainment</div>
      <div class="cursor-pointer">Travel</div>
      <div class="cursor-pointer">Sports</div>
      <div class="cursor-pointer">
        <img width="30" :src="SearchImage" alt="" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  text-align: center;
  padding: 1rem;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
}

.header2 {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
</style>
