<template>
  <div class="container">
    <h2>Вход</h2>
    <div class="form">
      <div class="mb-3">
        <label class="form-label">Электронная почта</label>
        <input type="text" class="form-control" v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Пароль</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary btn-lg" v-on:click="signIn">Войти</button>
      </div>
      <div v-if="badAccess" class="alert alert-danger">
        Неверный пароль или логин
      </div>
    </div>
    <a href="/#/restore">Забыли пароль?</a>
    <a href="/#/signup">У вас еще нет аккаунта?</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      badAccess: false
    }
  },
  methods: {
    async signIn () {
      this.badAccess = false;
      await this.$store.dispatch('signIn', { username: this.email, password: this.password });
      if (!this.isLoggedIn) {
        this.badAccess = true;
        return;
      }
      window.location.href = '/#/';
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.loggedIn;
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
  margin-bottom: 15px;
}

.mb-3 {
  min-width: 16rem;
}

.d-grid {
  margin-bottom: 11px;
}
</style>