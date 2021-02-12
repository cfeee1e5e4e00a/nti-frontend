<template>
  <div class="container">
    <div class="card" width="250px" role="developer" v-for="devr in allDevelopers" :key="devr.name">
      <img v-bind:src="devr.img" class="card-img-top" width="250px" height="250px"> 
      <div class="card-body">
        <h3 class="card-title">{{ devr.name }}</h3>
        <h6 class="card-subtitle mb-2 text-muted">возраст {{ devr.properties[1].val }}</h6>
        <p class="card-text">{{ devr.properties[0].val }}</p>    
        <a v-bind:href="devr.properties[2].val" class="card-link">Личный Сайт</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeveloperForm',
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
    allDevelopers () {
      return this.$store.getters.allDevelopers
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
}

.card {
  margin-right: 25px;
  margin-bottom: 25px;
  min-width: 250px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>