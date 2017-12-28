<template>
  <div class="page-container">
    <mt-header fixed title="Contact">
      <router-link to="/menu" slot="left">
        <mt-button icon="back">Back</mt-button>
      </router-link>
    </mt-header>
    <h2>The Cai Lab</h2>
    Manchester Institute of Biotechnology<br> University of Manchester <br> 131 Princess Street Manchester <br> M1 7DN<br> Office Phone: +44 (0) 161 306 4214<br> Email: yizhi.cai@manchester.ac.uk<br>
    <br><br>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.7264438796788!2d-2.2380006839969857!3d53.473348872891464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb19490a08957%3A0x69c43e36aea0b21!2sManchester+Institute+of+Biotechnology!5e0!3m2!1szh-CN!2suk!4v1502295435431" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
    }
  },
}
</script>

<style scoped>
div {
  box-sizing: border-box;
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
h2 {
  font-size: 24px;
  line-height: 40px;
}
</style>
