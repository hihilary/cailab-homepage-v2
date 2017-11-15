<template>
  <div>
    <el-carousel indicator-position="outside" height="500px" class="home-carousel">
      <el-carousel-item>
        1
      </el-carousel-item>
      <el-carousel-item>
        2
      </el-carousel-item>
      <el-carousel-item>
        3
      </el-carousel-item>
    </el-carousel>
    <NavBar class="special-nav-bar" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(3n) {
  background-image: url("../assets/banner-bg-1.jpg");
}

.el-carousel__item:nth-child(3n+1) {
  background-image: url("../assets/banner-bg-2.jpg");
}
.el-carousel__item:nth-child(3n+2) {
  background-image: url("../assets/banner-bg-3.jpg");
}
.special-nav-bar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index:100;
}
</style>
<style>

</style>
