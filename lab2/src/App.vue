<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="main-cont">
    <Header class="header" />
    <div class="wrapper">
      <div class="flexer">
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-cont {
  margin: 0;
  padding: 0;
  /* width: 100vw; */
  padding-top: 10px;
  height: 100vh;
  background-image: url("@/assets/background.svg");
  background-repeat: no-repeat;
  background-size: calc(100% + 20px) auto;
  background-position: center;
}

.wrapper {
  margin-top: 1rem;
  padding: 0 8rem;
}

.flexer {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: rgba(216, 218, 218, 0.8);
  padding: 20px 0;
}

.flexer::before {
  content: "";
  position: absolute;
  top: -20px; /* Positioning the top triangle */
  left: 50%;
  transform: translateX(-50%);
  border-left: 35rem solid transparent; /* Left triangle side */
  border-right: 35rem solid transparent; /* Right triangle side */
  border-bottom: 20px solid rgba(216, 218, 218, 0.8);
}

.flexer::after {
  content: "";
  position: absolute;
  bottom: 0; /* Align it with the bottom of the .flexer */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 0;
  border-bottom: 20px solid transparent; /* Bottom triangle */
  border-top: none;
}


</style>
