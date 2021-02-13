<template>
  <div>
    <AppBar/>
    <button class="btn btn-primary" v-on:click="downloadCsv">Скачать таблицу</button>
    <table class="table">
      <thead>
        <tr>
          <th v-for="title in titles" v-bind:key="title.id">{{ title.label }}</th>
          <th>Состояние</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in schedule" v-bind:key="task.id">
          <td v-for="title in titles" v-bind:key="title.id">
            {{ task[title.name] }}
          </td>
          <td>
            <span v-if="task.state==='pending'" class="badge bg-primary">ожидается</span>
            <span v-if="task.state==='store'" class="badge bg-success">на хранении</span>
            <span v-if="task.state==='moving'" class="badge bg-warning">передвигается по складу</span>
            <span v-if="task.state==='out'" class="badge bg-secondary">отбыл</span>
          </td>
        </tr> 
      </tbody>
    </table>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import { API_URL } from '../api.js';
import { getCookie } from '../cookie';

export default {
  data () {
    return {
      titles: [
        { name: 'id', label: 'ID' },
        { name: 'name', label: 'Название' },
        { name: 'model', label: 'Модель' },
        { name: 'date', label: 'Дата' },
        { name: 'load_time', label: 'Время прибытия' },
        { name: 'unload_time', label: 'Время отбытия' },
        { name: 'manufacturer', label: 'Производитель' },
      ]
    }
  },
  methods: {
    async downloadCsv () {
      const token = getCookie('session');
      let req = await fetch(`${API_URL}/api/items.csv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token })
      });
      let res = await req.blob();

      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = window.URL.createObjectURL(res);
      a.download = 'database.csv';
      a.click();
      window.URL.revokeObjectURL(a.href);
      a.remove();
    }
  },
  components: {
    AppBar
  },
  computed: {
    schedule () {
      return this.$store.getters.schedule;
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 15px;
}
</style>