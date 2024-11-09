<script setup lang="ts">
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
import { useStore } from "@/store";

const isMenuVisible = ref(false);
const email = ref("");
const username = ref("");
const password = ref("");
const confirmedPassword = ref("");
const secret = ref("");
const router = useRouter();

const store = useStore();

const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const step = ref(1);

const goNextStep = () => {
  if (password.value !== confirmedPassword.value) {
    return alert("Пароли не совпадают");
  }
  step.value = 2;
};

const createUser = () => {
  if (secret.value !== "1111") {
    return (step.value = 1);
  }
  store.createUser(username.value, email.value, password.value);
  router.push("/");
};
</script>

<template>
  <Header @toggle="handleToggle" class="header" />
  <div class="regis_cont">
    <div v-if="step === 1">
      <div class="profilereg">PROFILE | REGISTRATION</div>
      <div class="diver">
        <div>
          <div class="label">Create email</div>
          <input v-model="email" class="input" type="text" />
        </div>
        <div>
          <div class="label">Create username</div>
          <input v-model="username" class="input" type="text" />
        </div>
        <div>
          <div class="label">Create password</div>
          <input v-model="password" class="input" type="password" />
        </div>
        <div class="enterer">
          <div>
            <div class="label">Confirm password</div>
            <input v-model="confirmedPassword" type="password" class="input" />
          </div>
          <div>
            <button @click="goNextStep" class="buttoner">Create User</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="step === 2">
      <div class="toCreate">
        <div>TO CREATE ACCOUNT DO NEXT STEPS</div>
      </div>

      <div class="step2">
        <div class="step2inner">
          <div class="step21">Confirm you email</div>
          <div class="step22">Click to confirm</div>
        </div>
        <div class="step2inner">
          <div class="step21">Enter the secret phrase</div>
          <input v-model="secret" class="steppassword" type="password" />
        </div>
      </div>
      <div class="sdsd">
        <button @click="createUser" class="buttoner2">Create User</button>
      </div>
    </div>
  </div>
  <Menu
    v-show="isMenuVisible"
    @toggle="handleToggle"
    class="menu-cont"
    :class="{ hidden: !isMenuVisible }"
  />
</template>

<style scoped>
.regis_cont {
  background-color: rgb(179, 245, 245);
  height: 100vh;
  padding: 5rem 10rem;
}

.step2 {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.step21 {
  color: white;
  font-weight: 700;
  font-size: 22px;
}

.step22 {
  background-color: yellow;
  color: black;
  font-size: 26px;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 700;
}

.step2inner {
  display: flex;
  flex-direction: row;
  gap: 4rem;
  align-items: center;
}

.steppassword {
  outline: none;
  border: none;
  background-color: rgb(48, 162, 232);
  color: white;
  padding: 1rem;
}

.menu-cont {
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
}
.profilereg {
  display: flex;
  justify-content: center;
  width: 250px;
  border-radius: 12px;
  padding: 1rem 0.5rem;
  background-color: aqua;
  color: white;
  text-align: center;
  font-weight: 700;
  margin-bottom: 5rem;
}
.label {
  color: white;
  font-weight: 700;
  margin-bottom: 10px;
}

.input {
  border: none;
  outline: none;
  background: aqua;
  width: 250px;
  border-radius: 12px;
  padding: 0.4rem 0.5rem;
  font-size: inherit;
  color: white;
}
.diver {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.enterer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttoner {
  outline: none;
  border: none;
  background-color: rgb(61, 245, 41);
  padding: 1rem;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 22px;
}

.buttoner2 {
  outline: none;
  border: none;
  background-color: rgb(48, 162, 232);
  padding: 1rem;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 22px;
}

.buttoner:hover,
.buttoner2:hover {
  transition: 0.4s;
  cursor: pointer;
  opacity: 0.7;
}

.toCreate {
  display: flex;
  justify-content: center;
}

.toCreate div {
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 18px;
}

.sdsd {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>
