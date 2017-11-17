<template>
  <div>
    <div class="page-container">
      <h1>People</h1>
    </div>
    <Alumni/>
  </div>
</template>

<script>
export default {
  name: 'People',
  data () {
    return {}
  }
}
</script>

<style scoped>
div{
  box-sizing: border-box;
}
.page-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 74%;
  max-width: 1280px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
}
h1,
h2,
h3 {
  margin: 10px 0;
  font-weight: bold;
}
h1 {
  font-size: 36px;
  line-height: 40px;
}
</style>
