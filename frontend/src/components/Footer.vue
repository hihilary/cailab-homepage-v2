<template>
  <footer>
    <p>We thank these research councils and industrial partners for their generous support</p>
    <div>
      <img src="../assets/logo/bbsrc-logo.png">
      <img src="../assets/logo/erasynbio-logo.png">
      <img src="../assets/logo/EPSRC.png" class="smallLogo">
    </div>
    <div>
      <img src="../assets/logo/wctrust.png">
      <img src="../assets/logo/gates.png">
    </div>
    <div>
      <img src="../assets/logo/thermo.png" class="smallLogo">
      <img src="../assets/logo/agilent_tech.png" class="smallLogo">
      <img src="../assets/logo/bgi.png" class="smallLogo">
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
footer {
  box-sizing: border-box;
  margin-left: 13%;
  width: 74%;
  line-height: 40px;
  font-size: 24px;
  font-weight: bold;
  padding: 40px 0;
  clear: both;
}
footer img {
  padding: 10px;
  width: 150px;
  height: auto;
  vertical-align: middle;
}
footer img.smallLogo{
  width: 110px;
}
</style>
