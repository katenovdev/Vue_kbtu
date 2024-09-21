<template>
    <div>
      <h2>Item List</h2>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
        </li>
      </ul>
      <input v-model="newItem" placeholder="Add new item" />
      <button @click="addItem">Add Item</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ItemDisplay',
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        newItem: '',
      };
    },
    methods: {
      addItem() {
        if (this.newItem) {
          this.$emit('add-item', this.newItem);
          this.newItem = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  </style>
  