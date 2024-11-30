<script setup lang="ts">
import Header from "@/components/Header.vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import arrow from "@/assets/Arrow.svg";
import apexchart, { VueApexChartsComponent } from 'vue3-apexcharts'
import { ref, computed, watch } from "vue";

const store = useStore();
const router = useRouter();

const backToIndex = () => {
  router.push("/");
};

const chartRef = ref(null);

const posts = computed(() => store.profilePosts);

const chartOptions = ref({
  chart: {
    id: "posts-bar-chart",
  },
  xaxis: {
    categories: [],
    title: {
      text: "Дата создания",
    },
  },
  yaxis: {
    title: {
      text: "Количество постов",
    },
  },
  title: {
    text: "Количество постов по дате",
    align: "center",
  },
});

const series = ref([
  {
    name: "Количество постов",
    data: [],
  },
]);

const processPosts = (posts) => {
  const grouped = {};

  for (const post of posts) {
    const date = new Date(post.createdDate).toISOString().split("T")[0];
    grouped[date] = (grouped[date] || 0) + 1;
  }

  chartRef.value?.updateOptions({
    xaxis: {
      categories: Object.keys(grouped),
    },
  });

  chartRef.value?.updateSeries([
    {
      name: "Количество постов",
      data: Object.values(grouped),
    },
  ]);
};

watch(
  posts,
  (newPosts) => {
    processPosts(newPosts);
  },
  { immediate: true }
);


</script>

<template>
  <div>
    <Header class="header" />
    <div class="statistic-page">
      <div class="stat_header">
        <div class="arrow-cont" @click="backToIndex">
          <img
            :src="arrow"
            alt="Back"
            style="transform: rotate(180deg); filter: brightness(0) invert(1)"
          />
        </div>
        <div class="stat">Statistic</div>
      </div>
      <div id="chart">
        <apexchart
          ref="chartRef"
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistic-page {
  background: linear-gradient(to bottom, #89d4cf, #6fa0c7);
  padding: 3rem 6rem;
  font-family: "Inknut Antiqua";
  color: #333;
  height: 100vh;
}

.stat_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.arrow-cont {
  background-color: #6fa0c7;
  border-radius: 60%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.arrow-cont:hover {
  transform: scale(1.1);
}

.stat {
  font-size: 48px;
  font-weight: bold;
}
</style>
