<template>
    <div>
        <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#fff">
        <el-menu-item index="1" route="/" class="brand">The Cai Lab</el-menu-item>
        <el-menu-item index="2" route="/about">Projects</el-menu-item>
        <el-menu-item index="3" route="/news_items">News</el-menu-item>
        <el-menu-item index="4" route="/publications">Publications</el-menu-item>
        <el-menu-item index="5" route="/users">People</el-menu-item>
        <el-menu-item index="6" route="/pictures">Lab</el-menu-item>
        <el-menu-item index="7" route="/software">Software</el-menu-item>
        <el-menu-item index="8" route="/collaborators">Collaborators</el-menu-item>
        <el-menu-item index="9" route="/contact">Contact</el-menu-item>
        <el-menu-item index="10" route="/openpositions" class="badge badge-important">Open Positions</el-menu-item>
        </el-menu>
        <div class="line"></div>
    </div>

</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
}
.special-nav-bar > .el-menu-demo {
  background-color: rgba(255,255,255, 0.1 );
  background-image: none;
  border-bottom: none;
}
</style>
