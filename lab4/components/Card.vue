<script setup>
import { defineProps } from "vue";
import { useStore } from "@/store";
import profile1 from "@/assets/profile1.svg";

const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  pubDate: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["like"]);
const store = useStore();
const like = (id) => {
  emit("like", id);
};
const goTo = (path, id) => {
  store.setSelectedProfile(id);
  router.push(path);
};
</script>

<template>
  <div class="card-cont">
    <div class="card-inner">
      <div class="card_1">
        <div class="person" @click="goTo('/profile', props.id)">
          <div>{{ props.name }}</div>
          <div>Today, {{ props.pubDate }}</div>
        </div>
        <div class="rating">
          <div>Rating</div>
          <div class="stars">
            <div v-for="item in [1, 2, 3, 4, 5]">
              <span :class="item <= props.rating ? 'selectedstar' : ''">★</span>
            </div>
          </div>
        </div>
        <div class="photo cursor-pointer" @click="goTo('/statistic', props.id)">
          <img :src="profile1" />
        </div>
      </div>
      <div class="card-comment">{{ props.comment }}</div>
      <div class="card-like">
        <div @click="like(props.id)" class="like">LIKE</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-cont {
  display: flex;
  max-width: 400px !important;
}

.cursor-pointer:hover {
  cursor: pointer;
  transition: 0.4s;
}

.card-inner {
  background-color: rgba(91, 185, 205, 1);
  color: rgba(255, 255, 255, 1);
  padding: 0.2rem 1rem;
  border-radius: 10px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.card_1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.person {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 1rem;
  background-color: rgba(255, 255, 245, 0.15);
  border-radius: 10px;
  padding: 0.2rem;
  font-size: 20px;
  font-weight: 700;
}

.person:hover {
  cursor: pointer;
  transition: 0.4s;
}

.rating {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  font-size: 20px;
}

.stars {
  display: flex;
  flex-direction: row !important;
  gap: 0.3rem;
}

.card-comment {
  margin-top: 0.4rem;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-wrap: wrap;
}

.card-like {
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 0;
}

.like {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(67, 239, 39, 1);
  padding: 0.2rem 1rem;
  font-weight: 700;
}

.selectedstar {
  color: gold !important;
}

.like:hover {
  transition: 0.4s;
  cursor: pointer;
}
</style>
