<template>
  <div>
    <AppBar />
    <DeveloperForm />
    <FeedBackForm />
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import DeveloperForm from '../components/DeveloperForm.vue'
import FeedBackForm from '../components/FeedBackForm.vue'

export default {
  components: {
    AppBar, DeveloperForm, FeedBackForm
  },
  computed: {
  }
}
</script>

<style scoped>
</style>