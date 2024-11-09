<script setup>
import burger from "@/assets/burger.svg"
import profile from "@/assets/profile.svg"
import { useStore } from "@/store";
import PeopleCard from "./PeopleCard.vue";

const emit = defineEmits(['toggle']);

const toggleClass = () => {
  emit('toggle'); 
}

const email = ref("")
const password = ref("")
const isVisible = ref(false)

const isShow = ref(false)
const router = useRouter();
const store = useStore();

const user = computed(() => store.user);

const showIt = () => {
  isShow.value = !isShow.value  
}
const goTo = (path) => {
  router.push(path); 
}

const openMenu = () => {
  isVisible.value=true
}

const login = () => {
  const res = store.loginUser(email.value, password.value)

  if (!res) return alert("Неверный логин или пароль")
  else isVisible.value = false
}

const logout = () => {
  store.user = null
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
    <div v-if="isShow && user" class="auth-dropdown">
      <div @click="goTo('/profile')" class="h_login">My Profile</div>
      <div @click="logout" class="h_reg">Logout</div>
    </div>
    <div v-else-if="isShow" class="auth-dropdown">
      <div @click="openMenu" class="h_login">LOGIN</div>
      <div @click="goTo('/registration')" class="h_reg">REGISTER</div>
    </div>
    <div v-else></div>
    <div v-if="isVisible" class="authorize">
      <div class="loginer">LOGIN</div>
      <div class="authinner">
        <input v-model="email" class="authinput" type="text" placeholder="ENTER USERNAME"> 
        <input v-model="password" class="authinput" type="password" placeholder="ENTER PASSWORD"> 
        <span class="forgot">Forgot password?</span>
        <div>
          <button @click="login" class="authb">AUTHORIZE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-background {
  background-color: rgba(255, 255, 255, 0.74);
  position: relative;
}

.authorize {
position: absolute;
background-color: rgb(209, 198, 198);
right: 32%;
top: 250%;
z-index: 1000;
/* padding: 1rem 5rem; */
width: 500px;
}

.loginer {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  background-color: rgb(98, 172, 233);
  color: white;
}

.auth-dropdown {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
}

.authinner {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.forgot {
  color: black;
  padding: 1rem;
  font-weight: 700;
  font-size: 20px;
  background-color: white;
  width: 160px;
}

.authinput {
  outline: none;
  border: none;
  padding: 1rem;
}

.authb {
  outline: none;
  border: none;
  background-color: rgb(94, 239, 94);
  padding: 1rem;
  color: white;
  font-weight: 700;
  font-size: 18px;
  border-radius: 12px;
}

.authb:hover {
  transition: .4s;
  cursor: pointer;
  opacity: 0.8;
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
