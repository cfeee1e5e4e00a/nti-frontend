<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Контора пидорасов</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul v-for="page in pages" class="navbar-nav" v-bind:key="page.name">
          <li class="nav-item">
            <a class="nav-link" v-bind:href="page.url" v-bind:class="currentPage===page.name?'active':''">
              {{ page.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppBar',
  data () {
    return {
      pages: [
        { name: 'Home', url: '/#/', title: 'Главная страница' },
        { name: 'About', url: '/#/about', title: 'О нас' },
        { name: 'Me', url: '/#/me', title: 'Личный кабинет' },
        { name: 'Schedule', url: '/#/schedule', title: 'Расписание' },
        { name: 'Stash', url: '/#/stash', title: 'Склад' },
        { name: 'Stream', url: '/#/stream', title: 'Стрим' }
      ]
    }
  },
  components: {
  },
  computed: {
    currentPage () {
      return this.$route.name;
    }
  }
}
</script>

<style>
.navbar {
  display: inline;
}
</style>