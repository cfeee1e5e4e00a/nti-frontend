<template>
  <div>
    <AppBar />
    <DeveloperForm />
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import DeveloperForm from '../components/DeveloperForm.vue'

export default {
  components: {
    AppBar, DeveloperForm
  }
}
</script>

<style scoped>
</style>