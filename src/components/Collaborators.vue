<template>
  <div class="page-container">
    <h1>Collaborators</h1>
    <el-row justify="space-between">
      <el-col :xs="24" :sm="12" :xl="6" :md="8" :lg="8" v-for="(item, idx) in coworkers" :key="idx" >
        <div class="item-div">
          <img :src="getImg(item.img)" class="school-img">
          <span class="name">{{ item.name }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import collaborators from '../assets/collaborators.json'

export default {
  name: 'Collaborators',
  data () {
    return {
      coworkers: collaborators
    }
  },
  methods: {
    getImg (imgName) {
      return require('../assets/logo/unilogos/' + imgName)
    }
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
.co-container {
  align-items: center;
}
.school-img {
  width: 100px;
  padding: 20px;
}
.name {
  padding: 20px;
  font-size: 120%;
  line-height: 110%;
  font-weight: bold;
}
.item-div {
  display: flex;
  align-items: center;
  height: 140px;
}
</style>
<style>

</style>
