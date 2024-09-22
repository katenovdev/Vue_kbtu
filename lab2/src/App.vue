<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="main-cont">
    <Header class="header" />
    <div class="wrapper">
      <div class="flexer"></div>
      <div class="ff">
        <div class="flexer2"></div>
        <div class="flexer3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-cont {
  margin: 0;
  padding: 0;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(216, 218, 218, 0.8);
  padding: 20px 0;
}

.flexer::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 35rem solid transparent;
  border-right: 35rem solid transparent;
  border-bottom: 20px solid rgba(216, 218, 218, 0.8);
}
.ff {
  display: flex;
}
.flexer2 {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 584.5px 0 0;
  border-color: rgba(216, 218, 218, 0.8) transparent transparent transparent;
}
.flexer3 {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 0px 0px 584.5px; 
  border-color:  rgba(216, 218, 218, 0.8)  rgba(216, 218, 218, 0.8) transparent transparent
}

</style>
