<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ItemDisplay from './components/Itemdisplay.vue';
import { useCounter } from './composables/Counter.ts'; 
import { ref } from 'vue';

const { count, increment, reset } = useCounter();
const items = ref(['Item 1', 'Item 2', 'Item 3']);

const addItem = (item) => {
  items.value.push(item);
};

const isShow = ref(true);
</script>

<template>
  <div id="app">
    <div class="container">
      <Header />
      <ItemDisplay :items="items" @add-item="addItem" />
      <div>
        <h2>Counter: {{ count }}</h2>
        <button @click="increment">Increment</button>
        <button @click="reset">Reset</button>
      </div>
      
      <div v-if="isShow">Текст 1) Показать текст 2</div>
      <div v-if="!isShow">Текст 2) Показать текст 1</div>
      
      <button @click="isShow = true" v-if="!isShow">Показать текст 1</button>
      <button @click="isShow = false" v-if="isShow">Показать текст 2</button>

      <Footer />
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  height: 100vh; 
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}

.footer {

}
</style>
