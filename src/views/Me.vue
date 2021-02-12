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
import AppBar from '../components/AppBar.vue'
import PersonalInfo from '../components/PersonalInfo.vue'
import UsersList from '../components/UsersList.vue'

export default {
  components: {
    AppBar, PersonalInfo, UsersList
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>