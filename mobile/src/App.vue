<template>
  <div id="app">
    <router-view/>
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
}
h1,h2{
  letter-spacing:0.02em;
}
.page-container {
  font-size: 16px;
  /* line-height: 30px; */
  text-align: left;
  padding: 50px 20px;
}

</style>
