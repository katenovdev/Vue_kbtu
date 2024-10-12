<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserCard from "@/components/Card.vue";

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
const editableUser = ref({ name: "", email: "" });
const isEditing = ref(false);
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["updateUser"]);

function fetchUserDetails(id) {
  user.value = mockUserDetails[id] || null;
  if (user.value) {
    editableUser.value = { ...user.value };
  }
}

onMounted(() => {
  const userId = route.params.id;
  fetchUserDetails(userId);
});

function saveChanges() {
  user.value = {
    ...editableUser.value,
    phone: user.value.phone,
    website: user.value.website,
  };

  isEditing.value = false;
}

function updateUser(updatedUser) {
  const index = users.value.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = { ...users.value[index], ...updatedUser };
  }
}

function goBack() {
  router.push("/");
}
</script>

<template>
  <div v-if="user">
    <UserCard :user="user">
      <button @click="isEditing = !isEditing" class="edit-button">
        {{ isEditing ? "Cancel" : "Edit" }}
      </button>
    </UserCard>

    <div v-if="isEditing">
      <h3>Edit User</h3>
      <form @submit.prevent="saveChanges">
        <div>
          <label for="name">Name:</label>
          <input v-model="editableUser.name" id="name" type="text" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            v-model="editableUser.email"
            id="email"
            type="email"
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>

    <div v-else>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Website:</strong> {{ user.website }}</p>
    </div>

    <button @click="goBack">Back to Users</button>
  </div>
  <div v-else>
    <p>Loading user details...</p>
  </div>
</template>

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

form {
  margin-top: 10px;
}

label {
  display: block;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
