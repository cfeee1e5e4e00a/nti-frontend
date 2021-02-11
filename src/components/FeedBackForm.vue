<template>
    <div class="container">

        <div class="form"> 
            <div class="contacts">
                <div class="mb-3">
                    <label class="form-label" >Почтовый адресс</label>
                    <input type="text" class="form-control" placeholder="your@adress.who" />
                </div>
                <div class="mb-3">
                    <label class="form-label" >Имя</label>
                    <input type="password" class="form-control" placeholder="your-beatiful-name" />
                </div>
            </div>
            <label class="form-label">Вопросы // Предложения</label>
            <input type="password" class="form-control" placeholder="Text">
            <button type="button" class="btn btn-success">Отправить</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FeedBackForm',
  data () {
    return {
      name:  '',
      email: ''
    }
  },
  components: {
  },
  computed: {

  }
}
</script>

<style scoped>
.container {
  display:         flex;
  flex-direction:  column;
  justify-content: center;
  align-items:     center;
  margin-top:      3rem;
}
.contacts {
  display:         flex;
  flex-direction:  row;
  justify-content: space-between;
  align-items:     center;
}
</style>