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
    isFriend: false,
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
      this.isFriend = false;
      if (user) {
        this.user = user;
        this.setSelectedProfile(user.id);
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

      this.isFriend = false;
      const selectedProfile = this.users.find((user) => user.id === id);
      this.selectedProfile = selectedProfile;
      this.isPersonalProfile = this.user?.id == this.selectedProfile?.id;
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");
      const profilePosts = posts.filter(
        (post) => post.profileId === this.selectedProfile.id
      );
      console.log(this.user)
      console.log(this.selectedProfile)
      if (this.user?.id === this.selectedProfile?.id)
        this.isPersonalProfile = true;
      this.profilePosts = profilePosts;
      if (this.user?.friends?.includes(selectedProfile?.id))
        this.isFriend = true;
    },
    subscribe(profileId: number, toSubscribeProfileId: number) {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const user = existingUsers.find(
        (user: { id: number; email: string; password: string }) =>
          profileId === user.id
      );

      if (user) {
        if (user.friends?.length > 0) {
          user.friends = [...user.friends, toSubscribeProfileId];
        } else {
          user.friends = [toSubscribeProfileId];
        }

        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        const userIndex = existingUsers.findIndex(
          (user: { id: number }) => user.id === profileId
        );
        if (userIndex !== -1) {
          existingUsers[userIndex] = user;
          localStorage.setItem("users", JSON.stringify(existingUsers));
          this.user = user;

          this.isFriend = true;
        } else {
          console.error("Пользователь не найден");
        }
      }
    },
    getFriendsList(profileId: number) {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const user = existingUsers.find(
        (user: { id: number; email: string; password: string }) =>
          profileId === user.id
      );

      if (user) {
        let friendIds = user.friends;

        const friendsProfiles: any[] = [];
        friendIds.forEach((id: number) => {
          const user = existingUsers.find(
            (user: { id: number; email: string; password: string }) =>
              id === user.id
          );
          if (user) {
            friendsProfiles.push(user);
          }
        });

        return friendsProfiles;
      }
    },
  },
});
