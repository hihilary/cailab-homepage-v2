<template>
  <div class="page-container">
  <mt-header fixed title="Collaborators">
    <router-link to="/menu" slot="left">
      <mt-button icon="back">Back</mt-button>
    </router-link>
  </mt-header>
    <el-row justify="space-between">
      <el-col :xs="24" :sm="12" :xl="6" :md="8" :lg="8" v-for="(item, idx) in coworkers" :key="idx" >
        <div class="item-div-c">
          <img :src="getImg(item.img)" class="school-img">
          <span class="name">{{ item.name }}</span>
        </div>
      </el-col>
    </el-row>
  <p>We thank these research councils and industrial partners for their generous support</p>
  <div class="item-div">
    <img src="../assets/logo/bbsrc-logo.png" class="smallLogo">
  </div>
  <div class="item-div">
    <img src="../assets/logo/erasynbio-logo.png" class="smallLogo">
    </div>
  <div class="item-div">
    <img src="../assets/logo/EPSRC.png" class="smallLogo">
    </div>
  <div class="item-div">
    <img src="../assets/logo/wctrust.png" class="smallLogo">
    </div>
  <div class="item-div">
    <img src="../assets/logo/gates.png" class="smallLogo">
    </div>
  <div class="item-div">
    <img src="../assets/logo/thermo.png" class="smallLogo">
    </div>
  <div class="item-div">
    <img src="../assets/logo/agilent_tech.png" class="smallLogo">
    </div>
  <div class="item-div">
    <img src="../assets/logo/bgi.png" class="smallLogo">
    </div>
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
p{
  font-size: 16px;
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
  -webkit-align-items: center;
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
.item-div-c {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  height: 140px;
}
.item-div {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  -webkit-align-items: center;
  align-items: center;
  margin: 20px;
}
</style>
<style>

</style>
