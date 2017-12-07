<template>
  <div>
    <el-menu :router="true"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#ffffff"
      active-text-color="#ffeecc"
      >
      <el-menu-item index="1" route="/" class="brand">The Cai Lab</el-menu-item>
      <el-menu-item index="2" route="/about">Projects</el-menu-item>
      <el-menu-item index="3" route="/news_items">News</el-menu-item>
      <el-menu-item index="4" route="/publications">Publications</el-menu-item>
      <el-menu-item index="5" route="/users">People</el-menu-item>
      <el-menu-item index="6" route="/pictures">Lab</el-menu-item>
      <el-menu-item index="7" route="/software">Software</el-menu-item>
      <el-menu-item index="8" route="/collaborators">Collaborators</el-menu-item>
      <el-menu-item index="9" route="/contact">Contact</el-menu-item>
      <el-menu-item index="10" route="/openpositions" >Open Positions</el-menu-item>
      <li class="itemxx" @click="onOpenLogin" v-if="!adminLoggedIn">login</li>
      <li class="itemxx" @click="onLogout" v-else>logout</li>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
import Global from '@/Global'
export default {
  name: 'NavBar',
  data () {
    return {
      activeIndex: '1',
      adminLoggedIn: false
    }
  },
  created () {
    this.$http.post('/api/myIdentity', {}).then((response) => {
      if (response.body.id === 'admin') {
        this.adminLoggedIn = true
      }
    })

    Global.bus.$on('adminLogin', () => {
      // console.log('received adminLogin event')
      this.adminLoggedIn = true
    })
  },
  methods: {
    // handleSelect (key, keyPath) {
    //   console.log(key, keyPath)
    // }
    onOpenLogin () {
      Global.bus.$emit('openLoginDialog')
    },
    onLogout () {
      this.$http.post('/api/logout', {}).then((response) => {
        this.$message({message: 'You\'ve logged out', type: 'success'})
        this.adminLoggedIn = false
        Global.bus.$emit('adminLogout')
      })
    }
  }
}
</script>

<style scoped>
.brand {
  font-size: 20px;
}
.el-menu-demo {
  background-image: url("../assets/banner-bg-1.jpg");
  border-bottom: none;
  background-size:cover;
  display: -webkit-flex;
  display: flex;
  justify-content:center;
}
.el-menu-item {
  display: -webkit-inline-flex;
  display: inline-flex;
}
.special-nav-bar > .el-menu-demo {
  background-color: rgba(255,255,255, 0.1 );
  background-image: none;
  border-bottom: none;
}
.el-menu-item:hover {
  background-color: #545c64;
}
.special-nav-bar > ul >li:hover {
  background-color: rgba(255,255,255, 0.1 );
}
li.el-menu-item:focus {
  background-color: rgba(255,255,255, 0.1)  ;
}
.itemxx
{
  float: left;
  height: 60px;
  line-height: 60px;
  color: #fff;
  padding-left:20px;
  padding-right:20px;
  cursor: pointer;
}
.itemxx:focus
{
  outline:0px;
}
</style>
