<template>
    <form class="container">
        <img v-bind:src="getImage" class="img-thumbnail">
        <div class="input-container">
            <div class="input-line" v-for="p in Object.keys(getPersonal)" v-bind:key="p">
                <a>{{getPersonal[p]}}</a>
                <button type="button" class="btn btn-light" v-on:click="changeEditingState(p)" >
                    <img class="btn-edit-img" v-bind:src="getEditIcon">
                </button>
                
                <input v-if="getEditing[p]?true:false" v-bind:placeholder="p" v-model="message[p]">
                <div class="alert alert-secondary" role="alert" v-else>{{getPersonal[p]}}</div>

                <button type="button" class="btn btn-light" >
                    <img class="btn-submit-img" v-bind:src="getSubmitIcon">
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
        message: {
            "name":          "",
            "surname":       "",
            "secondaryName": "",
            "email":         "",
            "phone":         ""
        }
    }
  },
  methods: {
      async changeEditingState(key) {
          await this.$store.dispatch('changeEditingState', key)
      },
      async changePersonal(key) {
          await this.$store.dispatch('setPersonal', {...this.data(), key:this.data().message[key]})
      },
      async getEditing() {
          return await this.$store.dispatch("getEditing")
      },
      async send(key, m) {
          if(m=="")return
          await this.$store.dispatch("setTarget", m)
          this.message[key] = m
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
