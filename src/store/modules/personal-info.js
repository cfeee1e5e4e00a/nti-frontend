export default {
    actions: {
        async updatePersonalInfo(ctx) {
            // Need to do some magic with data here
            // like: make req to server
            // ----- overwrite values if they exist
            // ----- dk
            ctx.commit("setAvatar", "https://sun9-67.userapi.com/impg/Uq2oCvD8D5gBVHMtHmmFk-j__iM9Q-0hjCQjTg/vW4vrYG-V0M.jpg?size=314x318&quality=96&proxy=1&sign=6ec78e4c11d99487db1f872aec8b7d06&type=album")
            ctx.commit("setPersonalInfo", {
                "name":       "",
                "surname":    "",
                "secondName": "",
                "email":      "",
                "phone":      ""
            })
            ctx.commit("setEditing", {
                "name":       0, 
                "surname":    0, 
                "secondName": 0, 
                "email":      1, 
                "phone":      0
            })
        },
        changeEditingState(ctx, key)  {
            ctx.commit("changeEditingState", key)
        }
    },
    mutations: {
        setPersonalInfo(state, personal) {
            state.personal = personal
        },
        setAvatar(state, image) {
            state.image = image
        },
        setEditing(state, editing){
            state.editing = editing
        },
        changeEditingState(state, key)  {
            state.editing[key] ^= 1
        }
    },
    state: {
        image:    "",
        personal: {},
        editing:  {},

        editIcon: "https://sun9-20.userapi.com/impg/XI1mRWNxQe_DI_wb5KVbBgJ6FAq_EKPMP-hycw/rETV9hbQzjc.jpg?size=900x920&quality=96&proxy=1&sign=028a4c5e3aa56fe9ee519bc9d8f75bd3&type=album",
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
        getEditing(state) {
            return state.editing
        },
        getSubmitIcon(state) {
            return state.submitIcon
        }
    },
}