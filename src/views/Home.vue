<template>
  <div>
    <AppBar />
    <div class="container">
      <h1>Современные технологии автоматизации</h1>
      <div class="about-container">
        <iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/9Z690O2ma3o"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
        <div class="about-text-container">
          <label class="about-text">Автоматизированное складское помещение без использования человеческих
            ресурсов уже на вашем производстве.</label>
          <label class="about-text">Наша компания работает на рынке автоматизации с 2008 года. Мы автоматизировали более 150
            производственных предприятий.</label>
          <label class="about-text">Более 60% клиентов обращаются к нам повторно с другими задачами автоматизации.
          Главным нашим подразделением является автоматизация складских помещений по типу компании Amazon.</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'

export default {
  components: {
    AppBar
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; 
}

.about-container {
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.about-text-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.youtube {
  padding-top: 5px;
  margin-left: 25px;
  margin-right: 25px;
}

.about-text {
  margin-left : 25px;
  margin-bottom: 10px;
  max-width: 25rem;
}

h1 {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>