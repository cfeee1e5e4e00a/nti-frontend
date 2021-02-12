import { API_URL } from '../../api.js';
import { getCookie, deleteCookie } from '../../cookie.js';

export default {
  actions: {
    async signIn (ctx, payload) {
      let req = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username: payload.username, password: payload.password })
      });
      if (req.status !== 200) {
        console.warn(`${API_URL}/api/login=${req.status}`);
        return;
      }
      let res = await req.json();
      document.cookie = `session=${res.token}`;
      ctx.commit('changeLoginState', true);

      await ctx.dispatch('getUsername');
    },
    async logOut (ctx) {     
      const token = getCookie('session');
      await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token })
      });
      deleteCookie('session');
      ctx.commit('changeLoginState', false);
      ctx.commit('setUserInfo', { username: '' });
    },
    restoreFromCookie (ctx) {
      const token = getCookie('session');
      console.log(token);
      if (typeof token !== 'undefined') {
        ctx.commit('changeLoginState', true);
        ctx.dispatch('getUsername');
      }
    },
    async getUsername (ctx) {
      const token = getCookie('session');
      let req = await fetch(`${API_URL}/api/current_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token })
      });
      let res = await req.json();
      console.log(res);
      ctx.commit('setUserInfo', res);
    }
  },
  mutations: {
    changeLoginState (state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  state: {
    loggedIn: false,
    userInfo: {
      username: ''
    }
  },
  getters: {
    loggedIn (state) {
      return state.loggedIn;
    },
    userInfo (state) {
      return state.userInfo;
    }
  }
}