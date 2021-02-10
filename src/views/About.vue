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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
}
</style>