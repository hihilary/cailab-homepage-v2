<template>
  <div class="container">
    <div class="home-first-panel">
      <div class="font56">CAI LAB</div>
      <img src="../assets/pic_art/newcairobot.png" class="robot">
      <div class="font42">Synthetic Genomics</div>
      <div class="font42">Design, Synthesis, Characterization.</div>
      <div class="font42">Automated.</div>
    </div>
    <svg aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="angle-double-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="icon svg-inline--fa fa-angle-double-down fa-w-10 fa-3x"><path fill="currentColor" d="M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z" class=""></path></svg>
    <Nav/>
  </div>
</template>

<script>
import Nav from './Nav'

export default {
  name: 'Home',
  components: {
    Nav,
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div{
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color: inherit;
}
.home-first-panel {
  background-image: url("../assets/banner-bg-1.jpg");
  padding: 20px;
  color:#fff;
  img,div {
    margin: 10px;
  }
}
.inline {
  display: inline-block;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  line-height: 1.25;
}
a:hover{
  text-decoration: underline;
}
img.robot {
  height: 228px;
  width: 200px;
}
.font56{
  font-weight: bold;
  font-size: 56px;
}
.font42{
  font-size: 42px;
}
.germ {
  width: 100px;
  height: auto;
  display: inline-block;
  margin-right:10px;
}
.germ-text {
  padding-bottom: 5px;
}

.mid-panel{
  margin-top: 40px;
  font-size: 14px;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding:8px;
  >div {
    margin-top:10px;
    margin-bottom: 10px;
  }
}

.flex-col{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.flex-row{
  display: flex;
  align-items: center;
  justify-content: center;
}

.font24{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}
.icon {
  width:50px;
  height:50px;
}
</style>

