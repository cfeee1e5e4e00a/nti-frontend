<template>
    <form class="container">
        <img v-bind:src="getImage" class="img-thumbnail">
        <div class="input-container">
            <div class="input-line" v-for="p in Object.keys(getPersonal)" v-bind:key="p">
                <button type="button" class="btn btn-light" v-on:click="changeEditingState(p);message[p]=''" >
                    <img v-if="getEditing()[p]" class="btn-edit-img" v-bind:src="getCloseIcon">
                    <img v-else class="btn-edit-img" v-bind:src="getEditIcon">
                    
                </button>
                <input v-if="getEditing()[p]" v-bind:placeholder="p" v-model="message[p]">
                <div v-else class="alert alert-secondary" role="alert">{{getPersonal[p]}}</div>

                <button v-if="getEditing()[p]" type="button" class="btn btn-light" v-on:click="send(p);changeEditingState(p)">
                    <img class="btn-submit-img" v-bind:src="getSubmitIcon" >
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
.btn-edit-img {
    max-width:  1rem;
    max-height: 1rem;
}
.btn-submit-img {
    max-width:  1rem;
    max-height: 1rem;
}
</style>
