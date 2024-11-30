<script setup lang="ts">
import { ref, computed } from "vue";
import Header from "@/components/Header.vue";
import unknown from "@/assets/unknown.svg";
import triangle from "@/assets/triangle.svg";
import arrow from "@/assets/Arrow.svg";
import Card from "@/components/Card.vue";
import Menu from "@/components/Menu.vue";
import { posts } from "@/composable/posts.js";
import { useStore } from "@/store";

const isMenuVisible = ref(false);
const isDropdownVisible = ref(false);
const list = ref([]);
const currentPage = ref(1);
const itemsPerPage = 4;
const store = useStore();
const counter = computed(() => store.counter);
const people = ref([]);

const topic = ref("Adventure");
const currentSort = ref("Date");

onMounted(() => {
  people.value = store.getUsers();
  // localStorage.setItem("posts", JSON.stringify(posts)); only first time
  // localStorage.setItem("users", JSON.stringify(people)); only first time
  init();
});

const sortList = () => {
  if (currentSort.value === "Date") {
    list.value.sort((a, b) => new Date(b.PubDate) - new Date(a.PubDate));
  } else if (currentSort.value === "Rating") {
    list.value.sort((a, b) => b.Rating - a.Rating);
  }
};

const init = () => {
  list.value = people.value.filter((item) => item.Topic === "Adventure");
  sortList();
};

init();

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return list.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(list.value.length / itemsPerPage);
});

const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const sortByPubDate = () => {
  currentSort.value = "Date";
  sortList();
  toggleDropdown();
};

const sortByRating = () => {
  currentSort.value = "Rating";
  sortList();
  toggleDropdown();
};

const handleLike = (id) => {
  const person = list.value.find((item) => item.id === id);
  if (person) person.Rating += 1;
};

const handleFilter = (filter) => {
  list.value = people.value.filter((item) => item.Topic == filter);
  isMenuVisible.value = !isMenuVisible.value;
  topic.value = filter;
};
</script>

<template>
  <div class="main-cont">
    <Header @toggle="handleToggle" class="header" />
    <div class="wrapper">
      <div class="flexer">
        <div class="flexer_date">
          <div class="flexer_dater">13.09.2024</div>
        </div>
        <div class="flexer_topic">
          <div class="flexer_topic_name">{{ topic }}</div>
          <div class="sorter">
            <div class="dropdown-wrapper">
              <div class="cursor-pointer" @click="toggleDropdown">
                <div class="sorter">
                  <div class="cursor-pointer" @click="sortByPubDate">
                    <img :src="unknown" alt="" />
                  </div>
                  <div class="rating">{{ currentSort }}</div>
                  <div class="cursor-pointer" @click="sortByRating">
                    <img :src="triangle" alt="" />
                  </div>
                </div>
              </div>
              <div v-if="isDropdownVisible" class="dropdown-menu">
                <div class="dropdown-item" @click="sortByPubDate">Date</div>
                <div class="dropdown-item" @click="sortByRating">Rating</div>
              </div>
            </div>
          </div>
          <div class="arrow">
            <div class="arrow-cont mt2 cursor-pointer" @click="prevPage">
              <img :src="arrow" alt="" style="transform: rotate(180deg)" />
            </div>
            <div class="pagin">{{ currentPage }}/{{ totalPages }}</div>
            <div class="arrow-cont cursor-pointer" @click="nextPage">
              <img :src="arrow" alt="" />
            </div>
          </div>
        </div>
        <div class="cards">
          <Card
            v-for="person in paginatedList"
            :key="person.id"
            :id="person.id"
            :name="person?.PersonName"
            :avatar="person.Avatar"
            :pubDate="person.PubDate"
            :rating="person.Rating"
            :comment="person.Commentary"
            @like="handleLike"
          />
        </div>
      </div>
      <div class="ff">
        <div class="flexer2"></div>
        <div class="flexer3"></div>
      </div>
    </div>
    <Menu
      @toggle="handleToggle"
      @filter="handleFilter"
      class="menu-cont"
      :class="{ hidden: !isMenuVisible }"
    />
  </div>
</template>

<style scoped>
.main-cont {
  margin: 0;
  padding: 0;
  padding-top: 10px;
  background-image: url("@/assets/background.svg");
  background-repeat: no-repeat;
  background-size: calc(100% + 20px) auto;
  background-position: center;
  padding-bottom: 3rem;
  position: relative;
  min-height: 100vh;
}

.menu-cont {
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
}

.hidden {
  transform: translateX(-150%);
}

.hidden {
  transform: translateX(-150%);
}

.cursor-pointer:hover {
  cursor: pointer;
  transition: 0.4s;
}

.wrapper {
  margin-top: 1rem;
  padding: 0 8rem;
}
.flexer {
  margin-top: 2rem;
  position: relative;
  background: rgba(216, 218, 218, 0.8);
  padding: 1rem;
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

.mt2 {
  margin-right: 110px;
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
.arrow-cont:hover {
  cursor: pointer;
  transition: 0.4s;
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
.cards {
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 4rem;
  justify-content: center;
}

.cards div {
  max-width: 500px;
}

/* Оформление для дропдауна */
.dropdown-wrapper {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  top: 100%;
  left: -16px;
  width: 121%;

  text-align: center;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
