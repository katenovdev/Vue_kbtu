// ~/store/index.ts
import { defineStore } from "pinia";

export const useStore = defineStore("counter", {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
  },
});
