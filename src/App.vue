<template>
  <div id="app">
    <nav class="app_footer">
      <div class="logo">ИП Береснев</div>
      <div class="links">
        <router-link to="/">Главная</router-link>
        <router-link to="/add">Добавить</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
};

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

body {
  background: url(./assets/back.jpg);
  background-size: cover;
  background-attachment: fixed;
  margin: 0;
  font-family: Arial, sans-serif;
}

.app_footer {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  margin: 0 auto;
}

.logo {
  font-family: 'Pacifico', cursive;
  font-size: 1.5em;
  color: #333;
  background: linear-gradient(90deg, #ff9a9e, #fad0c4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-bottom: 10px;
  margin-left: 0;
}

.links {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-gap: 30px;
  gap: 30px;
  margin-right: 0;
  font-size: 0.6em;
}

.links a {
  text-decoration: none;
  color: #a74e51;
  font-weight: bold;
  transition: color 0.3s ease;
}

.links a:hover {
  color: #007bff;
}

@media (min-width: 768px) {
  .app_footer {
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .logo {
    margin-left: 20px;
  }

  .links {
    margin-right: 20px;
    font-size: 0.8em;
  }
}

</style>
