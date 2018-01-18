<template>
  <div class="page-container">
    <h1 class="title1">Software</h1>
    <h2 class="title2">PaperClip</h2>
    Parts Assembly automation - a software to design bridging sequences (“Clips”)
    for parts assembly.
    <br><br>
    <h2 class="title2">AutoGene</h2>
    DNA annotation automation - a software to automatically detect biological
    features inside DNA sequences.
    <br><br>
    <h2 class="title2">GenomeCarver</h2>
    Parts construction automation - a software to mine out biological parts
    from various genomes.
    <br><br>
    <h2 class="title2">YeastFab CAM</h2>
    Computer Assisted Manufacture for design, fabricate and characterize ~18,000
    standardized yeast genetic parts.
  </div>
</template>

<script>
// ========================================
// this component is abandonded, should be
// deleted later.
// ========================================
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
