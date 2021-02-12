<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Контора пидорасов</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul v-for="page in pages" class="navbar-nav" v-bind:key="page.name">
          <li v-if="page.requireLog?(isLoggedIn?true:false):true" class="nav-item">
            <a class="nav-link" v-bind:href="page.url" v-bind:class="currentPage===page.name?'active':''">
              {{ page.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!isLoggedIn" class="login">
      <a class="btn btn-success" href="/#/signin">Войти</a>
      <a class="btn btn-outline-success" href="/#/signup">Регистрация</a>
    </div>
    <div v-else class="login">
      <h6 class="username">{{ username }}</h6>
      <button class="btn btn-success" v-on:click="logOut">Выйти</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppBar',
  data () {
    return {
      pages: [
        { name: 'Home',     url: '/#/',         title: 'Главная страница', requireLog: false },
        { name: 'About',    url: '/#/about',    title: 'О нас',            requireLog: false },
        { name: 'Me',       url: '/#/me',       title: 'Личный кабинет',   requireLog: true  },
        { name: 'Schedule', url: '/#/schedule', title: 'Расписание',       requireLog: true  },
        { name: 'Stash',    url: '/#/stash',    title: 'Склад',            requireLog: true  },
        { name: 'Stream',   url: '/#/stream',   title: 'Стрим',            requireLog: true  }
      ]
    }
  },
  methods: {
    async logOut () {
      await this.$store.dispatch('logOut');
      // window.location.reload();
    }
  },
  components: {
  },
  computed: {
    currentPage () {
      return this.$route.name;
    },
    isLoggedIn () {
      return this.$store.getters.loggedIn;
    },
    username () {
      return this.$store.getters.userInfo.username;
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.btn {
  margin-right: 15px;
}

.username {
  margin-left: 15px;
  margin-right: 15px;
}
</style>