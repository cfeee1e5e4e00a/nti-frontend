<template>
    <form class="container">
        
        <div class="list-container">
            <a>Список пользователей</a>
            <div class="list-line" v-for="user in getUsers" v-bind:key="user">
                <div class="alert alert-secondary" role="alert">{{user}}</div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'UsersList',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
  },
  computed: {
      getUsers() {
          return this.$store.getters.getUsers
      }
  }
}
</script>

<style scoped>
.container {
  max-width:       6rem;
  display:         flex;
  flex-direction:  row;
  justify-content: center;
  align-items:     center;
  margin-top:      3rem;
}
.list-container {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:     right;
}
.list-line {
    margin: 0;
    padding: 0;
    padding-right: 10rem;
}
</style>
