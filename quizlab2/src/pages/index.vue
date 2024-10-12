<script setup>
import { ref } from "vue";
import UserCard from "@/components/Card.vue";
import { useRouter } from "vue-router";

const users = ref([
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Michael Johnson", email: "michael@example.com" },
]);

const router = useRouter();

function navigateToUser(userId) {
  router.push(`/user/${userId}`);
}
</script>

<template>
  <div>
    <h1>Users</h1>
    <div class="user-list">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @click="navigateToUser(user.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
