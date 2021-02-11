import { API_URL } from '../../api.js';

export default {
  actions: {
    async signIn (ctx, payload) {
      console.log(`${payload.username} ${payload.password}`);
      let req = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username: payload.username, password: payload.password })
      });
      let res = await req.json();
      document.cookie = `session=${res.token}`;
      console.log(`sucksess ${document.cookie}`);
      ctx.commit('changeLoginState', true);
    },
    async logOut (ctx) {
      function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      const token = getCookie('session');
      await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token })
      });
      ctx.commit('changeLoginState', false);
    },
    restoreFromCookie (ctx) {
      function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      const token = getCookie('session');
      console.log(token);
      if (typeof token !== 'undefined') {
        ctx.commit('changeLoginState', true);
      }
    }
  },
  mutations: {
    changeLoginState (state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    }
  },
  state: {
    loggedIn: false
  },
  getters: {
    loggedIn (state) {
      return state.loggedIn;
    }
  }
}