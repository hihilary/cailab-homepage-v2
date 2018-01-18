<template>
  <div id="app">
    <NavBar v-if="$route.path != '/'" /><!--don't display in root directory-->
    <router-view/>
    <Footer/>
    <LoginDialog/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0px;
  min-width:1024px;
}
h1,h2{
  letter-spacing:0.02em;
}

</style>
