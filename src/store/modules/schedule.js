import { API_URL } from '../../api.js';
import { getCookie } from '../../cookie.js';

export default {
  actions: {
    async startUpdateSchedule (ctx) {
      let timer = setInterval(async () => {
        const token = getCookie('session');
        if (typeof token === 'undefined') {
          return;
        }
        let req = await fetch(`${API_URL}/api/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ token })
        });
        let res = await req.json();
        ctx.commit('setSchedule', res);
      }, 1000);
      ctx.commit('setTimer', timer);
    },
    stopUpdateSchedule (ctx) {
      ctx.commit('clearTimer');
    }
  },
  mutations: {
    setTimer (state, timer) {
      state.timer = timer;
    },
    clearTimer (state) {
      clearTimeout(state.timer);
    },
    setSchedule (state, schedule) {
      state.schedule = schedule;

      let table = new Array(4);
      for (let rack = 0; rack < table.length; rack++) {
        table[rack] = new Array(9);
        for (let i = 0; i < table[rack].length; i++) {
          table[rack][i] = new Array(6).fill(0);
        }
      }

      for (let task of schedule) {
        if (typeof task.location === 'undefined' || task.location === null) {
          continue;
        }

        let pos = task.location.CellPosition;

        if (task.location.Rack === 'Left' && task.location.CellSide === 'Left') {
          table[0][(pos - 1)%9][Math.round((pos - 1)/9)] = 1;
        }
        if (task.location.Rack === 'Left' && task.location.CellSide === 'Right') {
          table[1][(pos - 1)%9][Math.round((pos - 1)/9)] = 1;
        }
        if (task.location.Rack === 'Right' && task.location.CellSide === 'Left') {
          table[2][(pos - 1)%9][Math.round((pos - 1)/9)] = 1;
        }
        if (task.location.Rack === 'Right' && task.location.CellSide === 'Right') {
          table[3][(pos - 1)%9][Math.round((pos - 1)/9)] = 1;
        }
      }

      state.racks = table;
    }
  },
  state: {
    schedule: [],
    racks: []
  },
  getters: {
    schedule (state) {
      return state.schedule;
    },
    racks (state) {
      return state.racks;
    }
  }
}