<template>
  <div v-if="user">
    <UserCard :user="user">
      <button @click="editUser" class="edit-button">Edit</button>
    </UserCard>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
    <p><strong>Website:</strong> {{ user.website }}</p>
    <button @click="goBack">Back to Users</button>
  </div>
  <div v-else>
    <p>Loading user details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserCard from "@/components/Card.vue";

// Mock data for simplicity
const mockUserDetails = {
  1: {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    website: "www.johndoe.com",
  },
  2: {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    website: "www.janesmith.com",
  },
  3: {
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "555-123-4567",
    website: "www.michaeljohnson.com",
  },
};

const user = ref(null);
const route = useRoute();
const router = useRouter();

// Function to fetch user details
function fetchUserDetails(id) {
  user.value = mockUserDetails[id] || null;
}

onMounted(() => {
  const userId = route.params.id;
  fetchUserDetails(userId);
});

function editUser() {
  alert("Edit user functionality to be implemented!");
}

function goBack() {
  router.push("/");
}
</script>

<style scoped>
.edit-button {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #45a049;
}

button {
  margin-top: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #2196f3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1976d2;
}
</style>
