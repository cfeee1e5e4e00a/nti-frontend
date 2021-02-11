import { API_URL } from '../../api.js';

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

      await ctx.dispatch('getUserInfo');
    },
    async logOut (ctx) {
      function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      function setCookie(name, value, options = {}) {

        options = {
          path: '/',
          // при необходимости добавьте другие значения по умолчанию
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
      
        document.cookie = updatedCookie;
      }      

      function deleteCookie(name) {
        setCookie(name, "", {
          'max-age': -1
        })
      }
      
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
        ctx.dispatch('getUserInfo');
      }
    },
    async getUserInfo (ctx) {
      function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      const token = getCookie('session');
      let req = await fetch(`${API_URL}/api/userinfo`, {
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