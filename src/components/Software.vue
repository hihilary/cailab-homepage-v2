<template>
  <div class="page-container">
    <div class="title1">Software</div>
    <div class="title2">PaperClip</div>
    Parts Assembly automation - a software to design bridging sequences (“Clips”) 
    for parts assembly. 
    <br><br>
    <div class="title2">AutoGene</div>
    DNA annotation automation - a software to automatically detect biological 
    features inside DNA sequences. 
    <br><br>
    <div class="title2">GenomeCarver</div>
    Parts construction automation - a software to mine out biological parts 
    from various genomes. 
    <br><br>
    <div class="title2">YeastFab CAM</div>
    Computer Assisted Manufacture for design, fabricate and characterize ~18,000 
    standardized yeast genetic parts. 
  </div>
</template>

<script>
export default {
  name: 'Software',
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
.title1,
.title2 {
  font-weight: bold;
  margin: 10px 0;
}
.title1 {
  font-size: 36px;
  line-height: 40px;
}
.title2 {
  font-size: 24px;
  line-height: 40px;
}
</style>
