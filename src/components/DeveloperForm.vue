<template>
    <div class="container">
        <div class="alert alert-secondary" role="developer" v-for="devr in allDevelopers" :key="devr.name" max-width="1rem">
            <div class="card" width="250px">
                <img v-bind:src="devr.img" class="card-img-top" width="250px" height="250px"> 
                <div class="card-body">
                    <h3 class="card-title">{{devr.name}}</h3>
                </div>
            </div>
            <div class="devr-properties">
                <ul v-for="prop in devr.properties" v-bind:key="prop.role">
                    <li class="properties">
                        <a>{{prop.key + ': ' + prop.val}}</a>
                    </li>
                </ul>
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
  display:         flex;
  flex-direction:  column;
  justify-content: center;
  align-items:     center;
  margin-top:      3rem;
}

.alert {
  
  display:         flex;
  flex-direction:  row;
  justify-content: center;
  align-items:     center;
}

.card {
  min-width: 250px;
  max-width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>
