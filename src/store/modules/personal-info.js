export default {
    actions: {
        async updatePersonalInfo(ctx) {
            // Need to do some magic with data here
            // like: make req to server
            // ----- overwrite values if they exist
            // ----- dk
            ctx.commit("setAvatar", "https://sun9-67.userapi.com/impg/Uq2oCvD8D5gBVHMtHmmFk-j__iM9Q-0hjCQjTg/vW4vrYG-V0M.jpg?size=314x318&quality=96&proxy=1&sign=6ec78e4c11d99487db1f872aec8b7d06&type=album")
            ctx.commit("setPersonal", {
                "name":       "andrei",
                "surname":    "dmitriy",
                "secondName": "cockand",
                "email":      "ya@ti.@",
                "phone":      "8(228)228-22-82"
            })
        },
        setPersonal(ctx, personal) {
            ctx.commit("setPersonal", personal)
        }
    },
    mutations: {
        setPersonal(state, personal) {
            state.personal = personal
        },
        setAvatar(state, image) {
            state.image = image
        },
        
    },
    state: {
        image:    "",
        personal: {},

        closeIcon:  "https://sun9-41.userapi.com/impg/OVgUpBZng9TY-ez5ahquRLhpq-ClnG95pECzDQ/7lEP7Ej0nW8.jpg?size=860x929&quality=96&proxy=1&sign=d937a77bf5d7ed4e76acf27ed8f2903c&type=album",
        editIcon:   "https://sun9-20.userapi.com/impg/XI1mRWNxQe_DI_wb5KVbBgJ6FAq_EKPMP-hycw/rETV9hbQzjc.jpg?size=900x920&quality=96&proxy=1&sign=028a4c5e3aa56fe9ee519bc9d8f75bd3&type=album",
        submitIcon: "https://sun9-38.userapi.com/impg/rkr1Y7LocDkppjPP844-FZqdK-GXU-U5VxY03Q/JfjEFzJSJmk.jpg?size=512x512&quality=96&proxy=1&sign=b2e82a054b5ab55cb160b1d50647c9ce&type=album"
    },
    getters: {
        getAvatar(state) {
            return state.image
        },
        getPersonal(state) {
            return state.personal
        },
        getEditIcon(state) {
            return state.editIcon
        },
        getCloseIcon(state) {
            return state.closeIcon
        },
        getSubmitIcon(state) {
            return state.submitIcon
        }
    },
}