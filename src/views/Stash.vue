<template>
  <div class>
    <AppBar/>
    <div class="stash-container">
      <table v-for="(rack, i) in racks" class="stash-grid" v-bind:key="i">
        <tr v-for="(row, j) in rack" class="stash-grid-row" v-bind:key="j">
          <td v-for="(cell, k) in row" class="stash-grid-cell" v-bind:key="k">
            <button
              class="stash-cell-button"
              v-bind:disabled="!clickable"
              v-bind:class="!cell?'green':(getTask(convertCoordinates(i,k,j)).state==='moving'?'blue':'red')" 
              v-on:click="setTarget(i,k,j)"
              ></button> 
          </td>
        </tr>
      </table>
    </div>
    <div class="control-container">
      <div class="unload-container">
        <button class="btn btn-primary" v-on:click="unload">{{ unloadStage==='first'?'Выгрузить':'Выберите ячейку' }}</button>
        <div class="alert alert-danger" v-if="badFirstTargetMessage">
          Неподходящая ячейка.
        </div>
      </div>
      <div class="swap-container">
        <button class="btn btn-primary" v-on:click="swap">{{ swapStage==='first'?'Обменять':(swapStage==='second'?'Выберите 1-ю ячейку':'Выберите 2-ю ячейку') }}</button>
        <div class="alert alert-danger" v-if="badSecondTargetMessage">
          Неподходящая ячейка.
        </div>
      </div>
    </div>
    <!-- <h3></h3> -->
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
      clickable: false,
      targets: {
        firstTarget: {},
        secondTarget: {},
      },
      unloadStage: 'first',
      swapStage: 'first',
      badFirstTargetMessage: false,
      badSecondTargetMessage: false
    }
  },
  methods: {
    setTarget (rack, row, cell) {
      if (this.unloadStage === 'second') {
        let task = this.getTask(this.convertCoordinates(rack, row, cell));
        if (task.state !== 'store') {
          this.badFirstTargetMessage = true;
          setTimeout(function (ctx) { ctx.badFirstTargetMessage = false; }, 2000, this);
          return;
        }
        this.targets.firstTarget = task;
        this.unloadStage = 'third';
        this.unload();
      }
      if (this.swapStage === 'second') {
        let task = this.getTask(this.convertCoordinates(rack, row, cell));
        if (task.state !== 'store') {
          console.log(task);
          this.badSecondTargetMessage = true;
          setTimeout(function (ctx) { ctx.badSecondTargetMessage = false; }, 2000, this);
          return;
        }
        this.targets.firstTarget = task;
        this.swapStage = 'third';
        return;
      }
      if (this.swapStage === 'third') {
        let task = this.getTask(this.convertCoordinates(rack, row, cell));
        if (task.state !== 'not_found') {
          this.badSecondTargetMessage = true;
          setTimeout(function (ctx) { ctx.badSecondTargetMessage = false; }, 2000, this);
          return;
        }
        this.targets.secondTarget = task;
        console.log(this.targets.firstTarget);
        console.log(this.targets.secondTarget);
        this.swapStage = 'fourth';
        this.swap();
      }
    },
    convertCoordinates (rack, row, cell) {
      // console.log({ rack, row, cell });
      const Racks = {
        0: { Rack: 'Left', CellSide: 'Left' },
        1: { Rack: 'Left', CellSide: 'Right' },
        2: { Rack: 'Right', CellSide: 'Left' },
        3: { Rack: 'Right', CellSide: 'Right' },
      };

      return {
        Rack: Racks[rack].Rack,
        CellSide: Racks[rack].CellSide,
        CellPosition: row * 9 + cell + 1
      };
    },
    getTask ({ Rack, CellSide, CellPosition }) {
      // console.log({ Rack, CellSide, CellPosition }); 
      for (let i in this.schedule) {
        if (typeof this.schedule[i].location === 'undefined' || this.schedule[i].location === null) {
          continue;
        }
        if (
          this.schedule[i].location.Rack === Rack &&
          this.schedule[i].location.CellSide === CellSide &&
          this.schedule[i].location.CellPosition === CellPosition
        ) {
          return this.schedule[i];
        }
      }
      return {
        state: 'not_found',
        location : {
          Rack,
          CellSide,
          CellPosition
        }
      }
    },
    async unload () {
      if (this.unloadStage === 'first') {
        this.clickable = true;
        this.unloadStage = 'second';
        return;
      }
      if (this.unloadStage === 'third') {
        this.clickable = false;
        this.unloadStage = 'first';
        const token = getCookie('session');
        console.log(this.targets.firstTarget);
        let req = await fetch(`${API_URL}/api/unload`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          body: JSON.stringify({ token, id: this.targets.firstTarget.id })
        });
        this.targets.firstTarget = {};
        if (req.status != 200) {
          console.log(`${API_URL}/api/unload=${req.status}`);
          return;
        }
        return;
      }
    },
    async swap () {
      if (this.swapStage === 'first') {
        this.clickable = true;
        this.swapStage = 'second';
        return;
      }
      if (this.swapStage === 'fourth') {
        this.clickable = false;
        this.swapStage = 'first';
        const token = getCookie('session');
        console.log(this.targets.firstTarget);
        console.log(this.targets.secondTarget);
        let req = await fetch(`${API_URL}/api/move`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          body: JSON.stringify({
            token,
            id: this.targets.firstTarget.id,
            rack: this.targets.secondTarget.location.Rack,
            side: this.targets.secondTarget.location.CellSide,
            cell: this.targets.secondTarget.location.CellPosition
          })
        });
        this.targets.firstTarget = {};
        this.targets.secondTarget = {};
        if (req.status != 200) {
          console.log(`${API_URL}/api/move=${req.status}`);
          return;
        }
        return;
      }
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
  justify-content:space-between;
  align-items: center;
  margin-left: 3rem;
  margin-right: 3rem;
}

.control-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 3rem;
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

.unload-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}

.swap-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}

.alert {
  margin-left: 15px;
}
</style>