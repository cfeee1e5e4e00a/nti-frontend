<template>
  <div class="container">
    <h2>Регистрация</h2>
    <div class="form">
      <div class="mb-3">
        <label class="form-label">Электронная почта</label>
        <input type="text" class="form-control" v-model="email">
      </div>
      <div class="alert alert-primary" role="alert">
        Пароль должен содержать не менее 8 и не более 20 символов, содержать как минимум одну букву,
        цифру и хотя бы один знак препинания !@#$%^&*.,:;-+=
      </div>
      <div class="mb-3">
        <label class="form-label">Пароль</label>
        <input v-model="firstPassword" v-on:input="checkPassword" type="password" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Повторите пароль</label>
        <input v-model="secondPassword" v-on:input="checkPassword" type="password" class="form-control">
      </div>
      <div class="alert alert-danger" id="badPassword" v-if="badPassword">
        Неподходящий пароль
      </div>
      <div class="alert alert-warning" id="passwordsDontEqual" v-if="!passwordsEqual">
        Пароли должны совпадать
      </div>
      <div class="d-grid gap-2">
        <button v-on:click="signUp" class="btn btn-primary btn-lg">Зарегистрироваться</button>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../api.js';

export default {
  data () {
    return {
      email: '',
      firstPassword: '',
      secondPassword: '',
      passwordsEqual: true,
      badPassword: false,
    }
  },
  methods: {
    async signUp () {
      if (!this.badPassword && this.passwordsEqual) {
        await fetch(`${API_URL}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ username: this.email, password: this.firstPassword })
        });
      }
      window.location.href = '/#/signin';
    },
    checkPassword () {
      if (this.firstPassword !== this.secondPassword) {
        this.passwordsEqual = false;
      } else {
        this.passwordsEqual = true;
      }

      if (this.firstPassword.length === 0) {
        this.badPassword = false;
        return;
      }

      if (
        (this.firstPassword.length >= 8 || this.firstPassword.length <= 20)
        && (/[A-Z]/g.test(this.firstPassword))
        && (/[0-9]/g.test(this.firstPassword))
        && (/[!@#$%^&*.,:;\-+=]/g.test(this.firstPassword))
      ) {
        this.badPassword = false;
      } else {
        this.badPassword = true;
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
}

.form {
  border: 1px solid #ced4da;
  border-radius: .25rem;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 15px;
  padding-bottom: 5px;
}

.d-grid {
  margin-bottom: 11px;
}

.alert {
  hyphens: manual;
  min-width: 16rem;
  max-width: 16rem;
}

.alert-hidden {
  display: none;
}
</style>