<script setup lang="ts">
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";

const isMenuVisible = ref(false);
const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
</script>

<template>
  <Header @toggle="handleToggle" class="header" />
  <div class="regis_cont">
    <div>
      <div class="profilereg">PROFILE | REGISTRATION</div>
      <div>
        <div class="label">Create email</div>
        <input class="input" type="text" />
      </div>
    </div>
  </div>
  <Menu
    v-show="isMenuVisible"
    @toggle="handleToggle"
    class="menu-cont"
    :class="{ hidden: !isMenuVisible }"
  />
</template>

<style scoped>
.regis_cont {
  background-color: rgb(179, 245, 245);
  height: 100vh;
  padding: 5rem 10rem;
}
.menu-cont {
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
}
.profilereg {
  display: flex;
  justify-content: center;
  width: 250px;
  border-radius: 12px;
  padding: 1rem 0.5rem;
  background-color: aqua;
  color: white;
  text-align: center;
  font-weight: 700;
  margin-bottom: 5rem;
}
.label {
    color: white;
    font-weight: 700;
    margin-bottom: 10px;
}

.input {
  border: none;
  outline: none;
  background: aqua;
  width: 250px;
  border-radius: 12px;
  padding: 0.4rem 0.5rem;
  font-size: inherit;
  color: white;
}
</style>
