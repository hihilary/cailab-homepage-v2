<template>
  <div>
    <el-carousel :autoplay="false" indicator-position="none" height="500px" class="home-carousel">
      <el-carousel-item>
        <div class="container">
          <div class="leftDiv">
            while(!missionComplete)<br>
									{<br>
										&nbsp;&nbsp;&nbsp;design();<br>
										&nbsp;&nbsp;&nbsp;synthesize();<br>
										&nbsp;&nbsp;&nbsp;characterize();<br>
									}<br>
          </div>
          <div class="rightDiv">
            <div class="font56">Synthetic Genomics<br></div>
            <div class="font42">
              <router-link to="/"><b>Click here</b></router-link>
              to learn more about open positions in the lab.
            </div>
          </div>
        </div>
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
  name: 'Home',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.el-carousel__item:nth-child(3n + 1) {
  background-image: url("../assets/banner-bg-2.jpg");
}
.el-carousel__item:nth-child(3n + 2) {
  background-image: url("../assets/banner-bg-3.jpg");
}
.special-nav-bar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 100;
}
div{
  box-sizing: border-box;
}
.container {
  display: -webkit-flex;
  display: flex;
  color:#fff;
  width: 76%;
  margin-top: 100px;
  margin-left: 13%;
  height: 400px;
  -webkit-align-items: center;
          align-items: center;
  -webkit-justify-content: center;
          justify-content: center;
  font-size: 14px;
}
.leftDiv {
  -webkit-flex: 2;
          flex: 2;
  text-align: left;
  font-weight: bold;
  font-size: 26px;
  padding: 15px;
}
.rightDiv {
  -webkit-flex: 3;
          flex: 3;
  text-align: left;
  padding: 15px;
}
.leftSpace{
  -webkit-flex: initial;
          flex: initial;
  width: 80px;
  min-width: 10px;
}
.font56{
  font-size: 56px;
}
.font42{
  font-size: 42px;
}
a{
  text-decoration: none;
  color: inherit;
}
a:hover{
  text-decoration: underline;
}

</style>
<style>

</style>
