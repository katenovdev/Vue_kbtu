// ~/store/index.ts
import { defineStore } from "pinia";
import { people } from "@/composable/person.js";

export const useStore = defineStore("counter", {
  state: () => ({
    counter: 0,
    user: null,
    users: [],
    selectedProfile: null,
    isPersonalProfile: true,
    profilePosts: [],
  }),
  actions: {
    increment() {
      this.counter++;
    },
    getUsers() {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      this.users = users;

      return this.users;
    },
    createUser(username: string, email: string, password: string) {
      const newUser = { PersonName: username, email, password };

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
    },
    loginUser(email: string, password: string) {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const user = existingUsers.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (user) {
        this.user = user;
        this.setSelectedProfile(user.id)
        return user;
      } else {
        return false;
      }
    },
    setCity(email: string, city: string) {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const userIndex = existingUsers.findIndex(
        (user: { email: string }) => user.email === email
      );
      console.log("USERINDEX", existingUsers[userIndex], city);
      if (userIndex !== -1) {
        existingUsers[userIndex].city = city;
        localStorage.setItem("users", JSON.stringify(existingUsers));
      } else {
        console.error("Пользователь не найден");
      }
    },
    setSelectedProfile(id: number) {
      this.getUsers();
      const selectedProfile = this.users.find((user) => user.id === id);
      this.selectedProfile = selectedProfile;
      this.isPersonalProfile = this.user?.id === this.selectedProfile?.id;
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");
      const profilePosts = posts.filter(
        (post) => post.profileId === this.selectedProfile.id
      );
      this.profilePosts = profilePosts;
    },
  },
});
