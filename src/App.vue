<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  beforeMount () {
    this.$store.dispatch('restoreFromCookie');
    this.$store.dispatch('updateDevelopers');
    this.$store.dispatch('updatePersonalInfo');
    this.$store.dispatch('updateUsers');
  }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}
</style>
