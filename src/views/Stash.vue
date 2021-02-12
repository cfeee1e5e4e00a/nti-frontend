<template>
  <div class>
    <AppBar/>
    <table class="stash-grid">
      <tr v-for="row in leftStash" class="stash-grid-row" v-bind:key="row">
        <td v-for="cell in row" class="stash-grid-cell" v-bind:key="cell">
          {{ cell }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'

export default {
  components: {
    AppBar
  },
  data () {
    return {
      leftStash: [
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f']
      ]
    }
  }
}
</script>

<style scoped>
.stash-grid {
  border: 1px #ced4da solid;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
}

.stash-grid-cell {
  text-align: center;
  border: 1px #ced4da solid;
  width: 32px;
  height: 32px;
}
</style>