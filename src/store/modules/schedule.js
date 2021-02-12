import { API_URL } from '../../api.js';
import { getCookie } from '../../cookie.js';

export default {
  actions: {
    async updateSchedule (ctx) {
      let timer = setInterval(async () => {
        const token = getCookie('session');
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
      // for (let task of schedule) {
      //   if (typeof task.location !==)
      // }
    }
  },
  state: {
    schedule: [],
    leftStash: [],
    rightStash: []
  },
  getters: {
    schedule (state) {
      return state.schedule;
    }
  }
}