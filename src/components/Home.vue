<template>
  <div>
    <el-carousel :autoplay="false" indicator-position="none" height="500px" class="home-carousel">
      <el-carousel-item>
        <div class="container">
          <div class="leftDiv">
            <img src="../assets/pic_art/newcairobot.png" class="robot">
          </div>
          <div class="rightDiv">
            <div class="font56">Synthetic Genomics</div>
            <div class="font42">Design, Synthesis, Characterization.</div>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="container">
          <div class="leftDiv">
            <img src="../assets/pic_art/CAIDNA.png" class="dna">
          </div>
          <div class="rightDiv">
            <div class="font56">Synthetic Genomics</div>
            <div class="font42">
              <router-link to="/"><b>Click here</b></router-link>
              to learn more about our research.
            </div>
          </div>
        </div>
      </el-carousel-item>
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
            <div class="font56">Synthetic Genomics</div>
            <div class="font42">
              <router-link to="/"><b>Click here</b></router-link>
              to learn more about open positions in the lab.
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <NavBar class="special-nav-bar" />

    <el-row type="flex" justify="center" class="mid-panel">
      <el-col :span="5">
        <div>
          <img src="../assets/pic_art/germ2.png" class="germ"><br>
          <div class="font18">News</div>
          <router-link to="/news_items" class="panel-link">Click here</router-link> to learn more about recent news from the Cai Lab. 
          <router-link to="/publications" class="panel-link">Click here</router-link> to find a list of recent publications from the Cai Lab.
        </div>
      </el-col>
      <el-col :span="2" />
      <el-col :span="5">
        <div>
          <img src="../assets/pic_art/germ1.png" class="germ"><br>
          <div class="font18">Projects</div>
          The Cai Lab is a Synthetic Biology research group based out of the University of Edinburgh.
          <router-link to="/about" class="panel-link">Click here</router-link> in order to learn more about our research.
        </div>
      </el-col>
      <el-col :span="2" />
      <el-col :span="5">
        <div>
          <img src="../assets/pic_art/germ3.png" class="germ"><br>
          <div class="font18">Open positions</div>
          The Cai Lab has several open positions.
          <router-link to="/openpositions" class="panel-link">Click here</router-link> to get involved with the lab as a student or as a researcher.
        </div>
      </el-col>
    </el-row>
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
  font-size: 26px;
  line-height: 1.25;
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
  font-weight: bold;
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
img.robot {
  height: 228px;
  width: 200px;
}
img.dna {
  height: 175px;
  width: 75px;
}
.mid-panel{
  margin-top: 40px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  -moz-text-size-adjust:100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
.germ {
  width: 100px;
  height: auto;
}
.font18{
  font-size: 18px;
  font-weight: bold;;
  margin: 10px 0;
}
.panel-link {
  color: #08c;
}
a.panel-link:hover {
  color: #005580;
}
</style>

