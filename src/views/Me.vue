<template>
  <div>
    <AppBar/>
    <div class="cont">
      <div class="card">
        <img class="card-img-top" v-bind:src="userInfo.picture">
        <div class="card-body">
          <h5 class="card-title">
            {{ `${this.userInfo.last_name} ${this.userInfo.first_name} ${this.userInfo.father_name}` }}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ this.userInfo.phone }}</h6>
          <p class="card-text">{{ this.userInfo.about }}</p>
          <a v-bind:href="'mailto:'+userInfo.username">Написать</a>
        </div>
      </div>
    </div>

    <div v-if="isAdmin" class="history container-fluid">
      <ul class="list-group">
        <li class="list-group-item">История действий</li>
        <li v-for="action in actions" class="list-group-item" v-bind:key="action">
          {{ `[${(new Date(action.timestamp)).toString()}][${action.username}] ${action.action}` }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue';
import { API_URL } from '../api.js';
import { getCookie } from '../cookie.js';

export default {
  components: {
    AppBar
  },
  data () {
    return {
      userInfo: {},
      actions: []
    }
  },
  methods: {
    async fetchUserInfo () {
      const token = getCookie('session');
      let req = await fetch(`${API_URL}/api/userinfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token, username: this.$route.params.username })
      });
      let res = await req.json();
      this.userInfo = res;      
    },
    async fetchActions () {
      const token = getCookie('session');
      let req = await fetch(`${API_URL}/api/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token, username: this.$route.params.username })
      });
      let res = await req.json();
      this.actions = res;   
    }
  },
  beforeMount () {
    this.fetchUserInfo();
    this.fetchActions();
  },
  computed: {
    isAdmin () {
      return this.$store.getters.userInfo.admin;
    }
  }
}
</script>

<style scoped>
.card-img-top {
  max-width: 300px;
  max-height: 250px;
}

.cont {
  margin-top: 15px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>