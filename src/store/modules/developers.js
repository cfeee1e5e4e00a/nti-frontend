export default {
    actions: {
        async updateDevelopers(ctx) {
            let req = await fetch("https://my-json-server.typicode.com/TJesT/fakerest/developers")
            let devs = await req.json()
            ctx.commit("setDevelopers", devs)
        }
    },
    mutations: {
        setDevelopers(state, devs) {
            state.developers = devs
        }
    },
    state: {
        developers: []
    },
    getters: {
        allDevelopers(state) {
            return state.developers
        }
    }
}