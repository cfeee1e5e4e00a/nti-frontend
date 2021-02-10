<template>
    <div class="container" max-width="560px">
      <div class="alert alert-secondary" role="developer" v-for="devr in developers" :key="devr.name">
      <h1>{{devr.name}}</h1>
      <ul v-for="prop in devr.properties" v-bind:key="prop.role">
          <li class="properties">
            <a>{{prop}}</a>
          </li>
        </ul>
      </div>
    </div>
</template>


<script>
export default {
  name: 'DeveloperForm',
  data () {
    return {
      developers: [
        { name: 'Yasosu Bibu', properties: {
            role: 'cock sucker', age: 54 ,  link: 'https://fuckmehard.vnos'}},
        { name: 'Pjer Deju', properties: {
            role: 'dungeon master', age: 10 , link: 'https://freecamwhores.ua'}}
      ]
    }
  },
  components: {
  },
  computed: {
    getDevelopers () {
      return this.developers;
    }
  }
}
</script>
