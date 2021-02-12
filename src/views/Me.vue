
<template>
  <div>
    <AppBar/>
    <div class="main-content">
      <!--<h1>Личный кабинет</h1>-->
      <PersonalInfo/>
      <UsersList/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppBar from '../components/AppBar.vue'
import PersonalInfo from '../components/PersonalInfo.vue'
import UsersList from '../components/UsersList.vue'

export default {
  components: {
    AppBar, PersonalInfo, UsersList
  }
}

new Vue({
  el: "#user-info",
  data: {
    users: [
      {name: 'yasosu', secondname: 'bibu', surname: 'desu', email: 'a@a.ru', phone: '22',
       img: "https://sun9-67.userapi.com/impg/Uq2oCvD8D5gBVHMtHmmFk-j__iM9Q-0hjCQjTg/vW4vrYG-V0M.jpg?size=314x318&quality=96&proxy=1&sign=6ec78e4c11d99487db1f872aec8b7d06&type=album"},
      {name: 'yasosu', secondname: 'cock', surname: 'pjerde', email: 'b@b.ru', phone: '13',
       img: "https://sun9-67.userapi.com/impg/Uq2oCvD8D5gBVHMtHmmFk-j__iM9Q-0hjCQjTg/vW4vrYG-V0M.jpg?size=314x318&quality=96&proxy=1&sign=6ec78e4c11d99487db1f872aec8b7d06&type=album"}
    ]
  }
})

new Vue.component('user-card', {
  props: ['card'],
  template: `
    <img v-bind:src="card.img">
    <form v-on:submit.prevent="onSubmit"
          class="input-line" 
          v-for="prop in Object.keys(card).filter(n => n!=='img')" 
          v-bind="prop">
      <button type="button" class="btn btn-light" v-on:click="card[prop]=">
      </button>
    </form>
  `
})
new Vue({
  el: '#card-events',
  data: {
    message: {
      'name':       '',
      'secondname': '',
      'surname':    '',
      'email':      '',
      'phone':      ''
      },
    editing: [0,0,0,0,0]
  },
  methods : {
    xorediting: function (key) {
      this.editing[key] ^= 1
    },
    send : function (key) {

    }
  }

})
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>