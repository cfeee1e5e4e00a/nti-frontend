<template>
  <div class>
    <AppBar/>
    <div class="stash-container">
      <table v-for="(rack, i) in racks" class="stash-grid" v-bind:key="i">
        <tr v-for="(row, j) in rack" class="stash-grid-row" v-bind:key="j">
          <td v-for="(cell, k) in row" class="stash-grid-cell" v-bind:key="k">
            <button 
              v-if="!(target.rack === i
              && target.row === k
              && target.cell === j)"
              class="stash-cell-button"
              v-on:click="setTarget(i, k, j)"
              v-bind:class="status(getIdByCoordinates(translateCoordinates(i, k, j)))=='moving'?'blue':(cell?'green':'red')"></button>
            <button v-else
              class="stash-cell-button selected-color"  
              v-on:click="setTarget(i, k, j)"></button>
          </td>
        </tr>
      </table>
    </div>
    <div class="control-container">
      <div class="control-target">
        <span v-if="target.location.Rack==='Left'" class="badge bg-primary">Левый стеллаж</span>
        <span v-if="target.location.Rack==='Right'" class="badge bg-primary">Правый стеллаж</span>
        <span v-if="target.location.CellSide==='Right'" class="badge bg-primary">Правая сторона</span>
        <span v-if="target.location.CellSide==='Left'" class="badge bg-primary">Левая сторона</span>
        <span v-if="typeof target.location.CellPosition !== 'undefined'" class="badge bg-primary">ячейка {{ target.location.CellPosition }}</span>
      </div>
      <div class="onload-container">
        <button class="btn btn-primary"
          v-bind:disabled="target.id===-1"
          v-on:click="unload">Выгрузить товар</button>
      </div>
      <h3>{{ status(target.id) }} {{ target.row }} {{ target.cell }}</h3>
    </div>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue';
import { API_URL } from '../api.js';
import { getCookie } from '../cookie.js';

export default {
  components: {
    AppBar
  },
  data () {
    return {
      target: { location : {}, rack: -1, row: -1, cell: -1, id: -1 }
    }
  },
  methods: {
    setTarget (rack, row, cell) {
      const Racks = {
        0: { Rack: 'Left', CellSide: 'Left' },
        1: { Rack: 'Left', CellSide: 'Right' },
        2: { Rack: 'Right', CellSide: 'Left' },
        3: { Rack: 'Right', CellSide: 'Right' },
      };

      let location = Racks[rack];
      location.CellPosition = row * 9 + cell + 1;
      this.target.location = location;
      this.target.id = this.getIdByCoordinates(this.target.location);
      this.target.rack = rack;
      this.target.row = row;
      this.target.cell = cell;
    },
    translateCoordinates (rack, row, cell) {
      const Racks = {
        0: { Rack: 'Left', CellSide: 'Left' },
        1: { Rack: 'Left', CellSide: 'Right' },
        2: { Rack: 'Right', CellSide: 'Left' },
        3: { Rack: 'Right', CellSide: 'Right' },
      };

      let location = Racks[rack];
      location.CellPosition = row * 9 + cell + 1;
      location.id = this.getIdByCoordinates(this.target.location);
      location.rack = rack;
      location.row = row;
      location.cell = cell;
      return location;
    },
    getIdByCoordinates ({ Rack, CellSide, CellPosition }) {
      for (let i = 0; i < this.schedule.length; i++) {
        if (typeof this.schedule[i].location === 'undefined' || this.schedule[i].location === null) {
          continue;
        }
        if (this.schedule[i].location.Rack === Rack) {
          if (this.schedule[i].location.CellSide === CellSide) {
            if (this.schedule[i].location.CellPosition === CellPosition) {
              return this.schedule[i].id;
            }
          }
        }
      }
      return -1;
    },
    async unload () {
      const token = getCookie('session');
      let req = await fetch(`${API_URL}/api/unload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify({ token, id: this.target.id })
      });
      if (req.status != 200) {
        console.log(`${API_URL}/api/unload=${req.status}`);
        return;
      }
      this.target = { location : {}, rack: -1, row: -1, cell: -1, id: -1 };
    },
    status (id) {
      let index = this.schedule.findIndex(a=>a.id===id);
      return index!=-1?this.schedule[index].state:'bad target';
    }
  },
  computed: {
    racks () {
      return this.$store.getters.racks;
    },
    schedule () {
      return this.$store.getters.schedule;
    },
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
  margin: 0 auto;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.blue {
  background-color: blue;
}

.stash-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.control-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 15rem;
  margin-top: 25px;
}

.stash-cell-button {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.selected-color {
  background-color: yellow;
}

.badge {
  margin-right: 8px;
}

.control-target {
  margin-bottom: 15px;
}
</style>