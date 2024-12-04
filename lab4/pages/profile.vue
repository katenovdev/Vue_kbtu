<script setup lang="ts">
import Header from "@/components/Header.vue";
import { useStore } from "@/store";

const isMenuVisible = ref(false);
const store = useStore();
const router = useRouter();
// const props = defineProps({
//   profile: {
//     type: Object,
//     required: true,
//   },
//   isPersonalProfile: {
//     type: Boolean,
//     default: false,
//   },
// });
const profile = computed(() => store.selectedProfile);
const isPersonalProfile = computed(() => store.isPersonalProfile);
const posts = computed(() => store.profilePosts);
const authProfile = computed(() => store.user);
const isFriend = computed(() => store.isFriend);

// const list = profile.posts;
const list = ref([]);

let itemsPerPage = 4;

const totalPages = computed(() => Math.ceil(list.value.length / itemsPerPage));
const currentPageInternal = ref(1);

const currentPage = computed(() => {
  return totalPages.value === 0 ? 0 : currentPageInternal.value;
});

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return list.value.slice(start, end);
});

const editableProfile = ref({ ...profile.value });

const subsribe = (profileId: number, toSubcribeProfileId: number) => {
  store.subscribe(profileId, toSubcribeProfileId);
  isFriend.value = true
};

watch(
  () => profile.value,
  (newProfile) => {
    editableProfile.value = { ...newProfile };
  }
);

const city = ref("");

const saveProfile = () => {
  store.setCity(profile.value.email, city.value);
  store.loginUser(profile.value.email, profile.value.password);
};

const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const goTo = (path, id) => {
  store.setSelectedProfile(id);
  router.push(path);
};
</script>

<template>
  <div>
    <Header @toggle="handleToggle" class="header" />
    <div class="profile-page">
      <div v-if="isPersonalProfile" class="profile-header">My profile</div>

      <div class="profile-content">
        <div class="left-panel">
          <div class="profile-avatar">
            <img src="@/assets/profile.svg" alt="Avatar" />
          </div>

          <!-- Editable fields for profile information -->
          <div class="profile-info">
            <div class="profile-name">{{ profile?.name }}</div>
            <div class="age-label">
              <p>Age:</p>
              <div>22</div>
            </div>
            <div class="age-label">
              <p>Name: {{ profile?.PersonName }}</p>
            </div>
            <div class="age-label">
              <p>City:</p>
              <div>{{ editableProfile.city }}</div>
            </div>
            <div v-if="isPersonalProfile" class="address-label">
              <input v-model="city" placeholder="Enter location" />
            </div>
            <div class="activity-label">Active now</div>
            <div class="current-rating">
              <p>Current rating:</p>
              <div class="stars">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span
                ><span>☆</span>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <div class="button-container">
            <button
              @click="goTo('/statistic', profile?.id)"
              class="btn-statistic"
            >
              Statistic
            </button>
            <button
              v-if="!isFriend && !isPersonalProfile && authProfile"
              @click="subsribe(authProfile?.id, profile?.id)"
              class="btn-follow"
            >
              Follow 
            </button>
            <button
              v-else-if="isFriend && !isPersonalProfile && authProfile"
              class="btn-follow"
            >
              Friend
            </button>
            <button
              v-if="isPersonalProfile"
              class="btn-save"
              @click="saveProfile"
            >
              SAVE
            </button>
            <button
              v-if="isPersonalProfile"
              class="btn-follow"
              @click="goTo('/friends')"
            >
              FRIENDS
            </button>
          </div>
        </div>
      </div>
      <div class="cards">
        <div v-for="post in posts" :key="post.createdDate" class="card">
          <p>{{ post.text }}</p>
          <small
            >Posted on: {{ new Date(post.createdDate).toLocaleString() }}</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.regis_cont {
  background-color: rgb(179, 245, 245);
  height: 100vh;
  padding: 5rem 10rem;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 16px;
}

.card {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  cursor: pointer;
}

.card h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #333;
}

.card p {
  margin: 0 0 8px;
  color: #555;
  font-size: 1rem;
}

.card small {
  display: block;
  color: #999;
  font-size: 0.85rem;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Убираем стандартный вид */
  margin: 0; /* Убираем отступы */
}

/* Скрываем стрелки для Firefox */
input[type="number"] {
  -moz-appearance: textfield; /* Меняем вид на текстовое поле */
}
.profile-info input {
  font-family: "Inknut Antiqua";
  border: none;
  background: none;
  font-weight: bold;
  outline: none;
  background: #2c82aa;
  font-size: 16px; /* Match the font size to regular text */
  color: #ffffff; /* Match the text color to regular text */
  width: 100%;
  margin-bottom: 10px;
  padding: 0;
  cursor: text; /* To indicate it’s editable if not readonly */
}

.profile-info input:read-only {
  cursor: default; /* Show regular cursor when input is read-only */
}

.profile-avatar {
  background: #00ffcd;
  height: 90%;
  display: flex;
  justify-content: center;
  border-radius: 50px;
  align-items: center;
}
.profile-page {
  line-height: 1.6;
  background: linear-gradient(to bottom, #89d4cf, #6fa0c7);
  padding: 20px;
  font-family: "Inknut Antiqua";
  color: #333;
  height: 100vh;
}

/* Banner */
.profile-name {
  font-family: "Inknut Antiqua";
  text-align: left;
  font-size: 44px;
  color: #005478;
}

/* Header */
.profile-header {
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 50px;
  color: #ffffff;
}
.activity-label {
  color: green;
  text-align: left;
  margin-bottom: 10px;
}
.address-label {
  margin: 10px 0;
}
.age-label {
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
}
.age-label p {
  line-height: 1;
  margin-right: 10px;
}
.age-label input {
  margin: 0;
  /* width: 10%; */
  text-align: center;
}
/* Profile Content */
.profile-content {
  display: flex;
  margin-top: 20px;
}

/* Left Panel */
.left-panel {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  margin-right: 20px;
}

.profile-avatar img {
  width: 100px;
  height: 100px;
}

.current-rating {
  display: flex;
  align-items: left;
  justify-content: center;
  align-items: center;
}

.stars {
  font-size: 20px;
  color: gold;
}

/* Right Panel */
.right-panel {
  width: 30%;
  padding: 20px;
}

.button-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  align-items: flex-end; /* Align buttons to the right */
  gap: 10px; /* Space between buttons */
  margin-bottom: 20px;
  margin-left: 20px;
}

.btn-statistic,
.btn-save {
  background-color: #4dc3ff;
  font-family: "Inknut Antiqua";
  line-height: 1;
  font-size: 25px;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 70%;
}

.btn-follow {
  background-color: #51ed49;
  font-family: "Inknut Antiqua";
  line-height: 1;
  font-size: 25px;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 70%;
}

.latest-posts {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.latest-posts button {
  background: #e0e0e0;
  padding: 8px 16px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
}

.post-card {
  background-color: #a8e0ff;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.btn-delete {
  background-color: #ff4d4d;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.pagination {
  text-align: center;
  font-size: 18px;
}
</style>
