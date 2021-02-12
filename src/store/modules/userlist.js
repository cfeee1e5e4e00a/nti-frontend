import { API_URL } from '../../api.js';
import account from './account.js';

export default {
    actions: {
        async updateUsers (ctx) {
            let req = await fetch(`${API_URL}/api/userlist`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ token: account.getters.userInfo })
            });
            let res = await req.json();
            ctx.commit('setUserList', res);
        },
        async getUser (ctx, username) {
            // dk
            ctx
            username
        }
    },
    mutations: {
        setUserList (state, usrlst) {
            state.userList = usrlst
        }
    },
    state: {
        userList: []
    },
    getters: {
        getUsers(state) {
            return state.userList
        }
    }
}