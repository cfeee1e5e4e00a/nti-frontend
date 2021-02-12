<template>
    <form class="container">
        <img v-bind:src="getImage" class="img-thumbnail">
        <div class="input-container">
            <div class="input-line" v-for="p in Object.keys(getPersonal)" v-bind:key="p">
                <button type="button" class="btn btn-light" v-on:click="changeEditingState(p);message[p]=''" >
                    <svg v-if="getEditing()[p]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
                    <!-- <img v-if="getEditing()[p]" class="btn-edit-img" v-bind:src="getCloseIcon"> -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
                    <!-- <img v-else class="btn-edit-img" v-bind:src="getEditIcon"> -->
                    
                </button>
                <input v-if="getEditing()[p]" v-bind:placeholder="p" v-model="message[p]">
                <div v-else class="alert alert-secondary" role="alert">{{getPersonal[p]}}</div>

                <button v-if="getEditing()[p]" type="button" class="btn btn-light" v-on:click="send(p);changeEditingState(p)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                    </svg>
                    <!-- <img class="btn-submit-img" v-bind:src="getSubmitIcon" > -->
                </button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'PersonalInfo',
  data () {
    return {
        editing:  {
            "name":       0, 
            "surname":    0, 
            "secondName": 0, 
            "email":      0, 
            "phone":      0
        },
        message: {
            "name":       "",
            "surname":    "",
            "secondName": "",
            "email":      "",
            "phone":      ""
        }
    }
  },
  methods: {
      changePersonal(key) {
          let tmp = this.getPersonal
          tmp[key] = this.message[key]
          this.$store.dispatch('setPersonal', tmp)
      },
      getEditing() {
          return this.editing
      },
      send(p) {
          this.changePersonal(p)
      },
      setEditing(editing) {
          this.editing = editing
      },
      changeEditingState(key) {
          this.editing[key] ^= 1
      }
  },
  components: {
  },
  computed: {
      getImage() {
          return this.$store.getters.getAvatar
      },
      getPersonal() {
          return this.$store.getters.getPersonal
      },
      getEditIcon() {
          return this.$store.getters.getEditIcon
      },
      getCloseIcon() {
          return this.$store.getters.getCloseIcon
      },
      getSubmitIcon() {
          return this.$store.getters.getSubmitIcon
      }
  }
}
</script>

<style scoped>
.container {
  display:         flex;
  flex-direction:  row;
  justify-content: center;
  align-items:     center;
  margin-top:      3rem;
}
.alert {
    margin: 0;
    padding: 0;
}
.input-line {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.1rem;
}
.img-thumbnail {
    display:   flex;
    min-width: 10rem;
    max-width: 10rem;
}
.btn {
    padding: 0;
    margin:  1px;
    display: flex;

    min-width:  2rem;
    min-height: 2rem;
    max-width:  2rem;
    max-height: 2rem;
    align-items: center;
    justify-content: center;
}
/* .btn-edit-img {
    max-width:  1rem;
    max-height: 1rem;
}
.btn-submit-img {
    max-width:  1rem;
    max-height: 1rem;
} */
</style>
