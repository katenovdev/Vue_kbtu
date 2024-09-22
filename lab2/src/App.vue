<script setup>
import Header from "@/components/Header.vue";
import unknown from "@/assets/unknown.svg";
import triangle from "@/assets/triangle.svg";
import arrow from "@/assets/Arrow.svg";
</script>

<template>
  <div class="main-cont">
    <Header class="header" />
    <div class="wrapper">
      <div class="flexer">
        <div class="flexer_date">
          <div class="flexer_dater">13.09.2024</div>
        </div>
        <div class="flexer_topic">
          <div class="flexer_topic_name">Adventure</div>
          <div class="sorter">
            <div><img :src="unknown" alt="" /></div>
            <div class="rating">Rating</div>
            <div><img :src="triangle" alt="" /></div>
          </div>
          <div class="arrow">
            <div class="arrow-cont">
              <img :src="arrow" alt="" />
            </div>
            <div class="pagin">1/5</div>
          </div>
        </div>
      </div>
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
  background: rgba(216, 218, 218, 0.8);
  padding: 5rem;
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
  border-color: rgba(216, 218, 218, 0.8) rgba(216, 218, 218, 0.8) transparent
    transparent;
}

.flexer_date {
  display: flex;
}
.flexer_dater {
  background-color: rgba(91, 185, 205, 1);
  padding: 0 1rem;
  border-radius: 8px;
  font-family: "Inknut Antiqua";
  font-size: 36px;
  line-height: 42.84px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 2px 2px rgba(91, 185, 205, 1);
}

.flexer_topic {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
}

.flexer_topic_name {
  background-color: rgba(91, 185, 205, 1);
  padding: 0 3rem;
  font-size: 36px;
  line-height: 42.84px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  font-weight: 700;
}

.sorter {
  background-color: rgba(238, 252, 247, 1);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  gap: 15px;
}

.rating {
  color: rgba(29, 227, 144, 1);
  font-family: "Jersey 15";
  font-size: 26px;
  font-weight: 700;
}

.arrow {
  position: relative;
}

.arrow-cont {
  position: absolute;
  top: -3rem;
  right: 50%;
}

.pagin {
  position: absolute;
  right: 1.5rem;
  bottom: -1rem;
  color: rgba(255, 255, 255, 1);
  font-size: 48px;
  line-height: 60px;
  font-family: "Italianno";
}
</style>
