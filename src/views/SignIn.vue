<template>
  <div class="container">
    <form class="form">
      <div class="mb-3">
        <label class="form-label">Логин</label>
        <input type="text" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Пароль</label>
        <input type="password" class="form-control">
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary btn-lg">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
}

.form {
  border: 1px solid #ced4da;
  border-radius: .25rem;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 15px;
  padding-bottom: 5px;
  margin-bottom: 25px;
}

.d-grid {
  margin-bottom: 11px;
}
</style>