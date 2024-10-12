<template>
  <header class="header">
    <h1 class="title">My Website</h1>
    <button @click="goToHomepage" class="homepage-btn">Homepage</button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHomepage() {
  router.push('/')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(45deg, #2196F3, #21CBF3);
  color: white;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.homepage-btn {
  padding: 8px 16px;
  font-size: 16px;
  color: #2196F3;
  background-color: white;
  border: 2px solid #2196F3;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.homepage-btn:hover {
  background-color: #2196F3;
  color: white;
}
</style>
