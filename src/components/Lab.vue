<template>
<div class="page-container">
  {{msg}}
  <div v-if="pics.length">
    <el-carousel :autoplay="autoplay" arrow="always" indicator-position="none" height="480px" :interval="5000" ref="carousel">
      <el-carousel-item v-for="(item, key) in pics" :key="key">
        <img :src="item" class="lab-pic">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="image-panel">
    <div v-for="(item, key) in thumbs" :key="key" class="img-div">
      <img :src="item" @click="changeImg(key)" class="img-single" @blur="onBlur" :tabIndex="key">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Lab',
  data () {
    return {
      pics: [],
      thumbs: [],
      index: 0,
      autoplay: true,
      msg: ''
    }
  },
  created () {
    this.$http.get('/api/listLabPics').then((response) => {
      let thumbs = []
      let pics = response.body
      for (let picItem of pics) {
        let thumb = this.getThumbURL(picItem)
        thumbs.push(thumb)
      }
      this.thumbs = thumbs
      this.pics = pics
    }, (response) => {
      this.msg = response.statusText
    })
  },
  methods: {
    changeImg (idx) {
      this.autoplay = false
      this.$refs.carousel.setActiveItem(idx)
    },
    onBlur () {
      this.autoplay = true
    },
    getThumbURL (url) {
      return url.replace(/(.*)\/(.*\.jpg)$/, '$1/thumbs/$2')
    }
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
}
.el-carousel {
  margin: auto;
}
.el-carousel__mask {
  opacity: 0.5;
}
.img-single {
  width: 96px;
  height: 64px;
  padding: 3px;
}
.image-panel {
  margin-top: 80px;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;

}
.img-single:hover {
  cursor: pointer;
}
.img-single:focus {
  padding: 0px;
  border: 3px solid grey;
}
.img-div {
  padding: 10px 0px 10px 20px;
}
</style>
