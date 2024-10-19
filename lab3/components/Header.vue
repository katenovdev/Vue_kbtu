<script setup>
import burger from "@/assets/burger.svg"
import profile from "@/assets/profile.svg"

const emit = defineEmits(['toggle']);

const toggleClass = () => {
  emit('toggle'); 
}

const isShow = ref(false)
const router = useRouter();

const showIt = () => {
  isShow.value = !isShow.value  
}
const goTo = (path) => {
  router.push(path); 
}
</script>

<template>
  <div class="header-background">
    <div class="flexer">
      <div @click="toggleClass" class="flexer_1"><img :src="burger"></img></div>
      <div>
        <div class="flexer_2">
          New trips on Fall season! Full details on our Instagram accounts.
        </div>
      </div>
      <div>
        <div @click="showIt" class="flexer_3">
        <img :src="profile" alt="">
        </div>
      </div>
    </div>
    <div v-show="isShow" class="auth-dropdown">
      <div @click="goTo('/login')" class="h_login">LOGIN</div>
      <div @click="goTo('/registration')" class="h_reg">REGISTER</div>
    </div>
  </div>
</template>

<style scoped>
.header-background {
  background-color: rgba(255, 255, 255, 0.74);
  position: relative;
}
.auth-dropdown {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
}
.auth-dropdown>div:hover {
  cursor: pointer;
  transition: .4s;
}
.h_login {
  display: flex;
  justify-content: center;
  background-color: green;
  color: blue;
  padding: 0.5rem;
  border: 1px solid black;
}
.h_reg {
  display: flex;
  justify-content: center;
  background-color: yellow;
  color: blue;
  padding: 0.5rem 1rem;
  border: 1px solid black;
}
.flexer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}
.flexer_3:hover {
  cursor: pointer;
  transition: .4s;
}

.flexer_1:hover {
  transition: .4s;
  cursor: pointer;

}

.flexer_2 {
  padding: 1rem 12rem;
  background: linear-gradient(rgba(229, 246, 124, 1), rgba(234, 238, 58, 1)) ;
  font-family: 'Inknut Antiqua';
  font-weight: 400;
  font-size: 26px;
  line-height: 44px;
  color: rgba(255, 119, 76, 1);
  border-radius: 10px;
}

.flexer_3{
  border-radius: 50%;
  background-color: rgba(126, 239, 255, 1);
  padding: 1rem;
}

</style>
