// ~/store/index.ts
import { defineStore } from "pinia";

export const useStore = defineStore("counter", {
  state: () => ({
    counter: 0,
    user: null,
  }),
  actions: {
    increment() {
      this.counter++;
    },
    createUser(username: string, email: string, password: string) {
      const newUser = { username, email, password };

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

      if (userIndex !== -1) {
        existingUsers[userIndex].city = city; 
        localStorage.setItem("users", JSON.stringify(existingUsers));
      } else {
        console.error("Пользователь не найден");
      }
    },
  },
});
