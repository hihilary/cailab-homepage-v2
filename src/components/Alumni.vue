<template>
  <div class="page-container">
    <h2>Alumni</h2>
    <ul>
      <li v-for="(item, key) in alumni" :key="key">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import alumni from '../assets/alumni.json'
export default {
  name: 'Alumni',
  data () {
    return {
      alumni,
    }
  },
  created () {
    // this.$http.post('/api/alumni').then((response) => {
    //   for (let x of response.body) {
    //     console.log(x)
    //     this.alumni.push(x)
    //   }
    // }, (response) => {
    //   this.msg = response.statusText
    // })
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
h2 {
  font-size: 24px;
  line-height: 40px;
}
</style>
