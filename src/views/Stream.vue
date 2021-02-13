<template>
  <div>
    <AppBar/>
    <h1 v-if="!isAdmin">Вы не имеете доступа к видео трансляции :(</h1>
    <iframe v-if="isAdmin">
    </iframe>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'

export default {
  components: {
    AppBar
  },
  computed: {
    isAdmin () {
      return this.$store.getters.userInfo.admin;
    }
  },
  beforeMount () {
    this.$store.dispatch('getUsername');
  }
}
</script>

<style scoped>

</style>