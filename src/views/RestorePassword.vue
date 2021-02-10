<template>
  <div class="container">
    <h2>Восстановление пароля</h2>
    <div class="form">
      <div class="mb-3">
        <label class="form-label">Логин</label>
        <input type="text" class="form-control">
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary btn-lg">Восстановить</button>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  data () {
    return {
      showModal: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
}

.form {
  border: 1px solid #ced4da;
  border-radius: .25rem;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 15px;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.mb-3 {
  min-width: 16rem;
}

.d-grid {
  margin-bottom: 11px;
}
</style>