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

function goToUserDetails(id) {
  router.push(`/user/${id}`);
}

function updateUser(updatedUser) {
  const index = users.value.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = { ...users.value[index], ...updatedUser };
  }
}
</script>

<template>
  <div>
    <h1>User List</h1>
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      @click="goToUserDetails(user.id)"
    />
    <router-view @updateUser="updateUser" />
  </div>
</template>

<style scoped></style>
