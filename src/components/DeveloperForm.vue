<template>
    <div class="container">
        <div class="alert alert-secondary" role="developer" v-for="devr in developers" :key="devr.name">
            <div class="card">
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
      developers: [
        { name: 'Yasosu Bibu', img: '', properties: [
            {key: 'role', val: 'cock sucker'}, 
            {key: 'age',  val: 54} ,  
            {key: 'link', val: 'https://fuckmehard.vnos'}]},
        { name: 'Pjer Deju',   img: '', properties: [
            {key: 'role', val: 'dungeon master'}, 
            {key: 'age',  val: 10} ,  
            {key: 'link', val: 'https://freecamwhores.ua'}]},
            
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
