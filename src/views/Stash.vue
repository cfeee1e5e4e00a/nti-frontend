<template>
  <div class>
    <AppBar/>
    <div class="stash-container">
      <table v-for="rack in racks" class="stash-grid" v-bind:key="rack">
        <tr v-for="row in rack" class="stash-grid-row" v-bind:key="row">
          <td v-for="cell in row" class="stash-grid-cell" v-bind:key="cell" v-bind:class="cell?'red':'green'">
          </td>
        </tr>
      </table>
    </div>
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
    }
  },
  computed: {
    racks () {
      return this.$store.getters.racks;
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

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.stash-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

</style>