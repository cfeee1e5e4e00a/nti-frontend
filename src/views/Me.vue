<template>
  <div>
    <AppBar/>
    <h3>Кабинет Сотрудника</h3>
    <PersonalInfo/>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import PersonalInfo from '../components/PersonalInfo.vue'

export default {
  components: {
    AppBar, PersonalInfo
  }
}
</script>

<style scoped>

</style>