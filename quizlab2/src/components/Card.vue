<template>
    <div class="user-card" @click="handleUserClick">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <slot></slot> 
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  // Define props
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })
  
  // Define emits
  const emit = defineEmits(['click'])
  
  function handleUserClick() {
    emit('click')
  }
  </script>
  
  <style scoped>
  .user-card {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .user-card:hover {
    background-color: #f0f0f0;
  }
  </style>
  