<template>
<div class="page-container">
  {{msg}}
  <!-- <div v-if="pics.length"> -->
    <MyCarousel :autoplay="autoplay" arrow="always" indicator-position="none" height="480px" :interval="carouselInterval" ref="carousel" @change="onCarouselChange">
      <el-carousel-item v-for="(item, key) in pics" :key="key">
        <lazy-component>
          <img :src="item" class="lab-pic" @load="onPicLoad(key)">
        </lazy-component>
      </el-carousel-item>
    </MyCarousel>
  <!-- </div> -->
  <div class="image-panel">
    <div v-for="(item, key) in thumbs" :key="key" class="img-div">
      <img :src="item" @click="changeImg(key)" class="img-single" @blur="onBlur(key)" :tabIndex="key">
    </div>
  </div>
</div>
</template>

<script>
import MyCarousel from './MyCarousel'

export default {
  name: 'Lab',
  components: {
    MyCarousel,
  },
  data () {
    return {
      pics: [],
      thumbs: [],
      index: 0,
      autoplay: false,
      msg: '',
      lockedPicIdx: null,
      carouselInterval: 4000,
    }
  },
  created () {
    this.loadedPic = {}
    this.currentIdx = 0
    this.expectedPics = []

    this.$http.get('/api/labPics').then((response) => {
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
      this.lockedPicIdx = idx
      this.$refs.carousel.setActiveItem(idx)
      console.log('pause_click', this.lockedPicIdx)
    },
    onBlur (idx) {
      if (idx === this.lockedPicIdx) {
        this.lockedPicIdx = null
        console.log('blur', this.lockedPicIdx)
        this.onCarouselChange(idx)
      }
    },
    getThumbURL (url) {
      return url.replace(/(.*)\/(.*\.jpg)$/, '$1/thumbs/$2')
    },
    onPicLoad (key) {
      console.log('onPicLoad', key)
      this.loadedPic[key] = true

      if (this.expectedPics.length > 0) {
        this.expectedPics = this.expectedPics.filter(val => this.loadedPic[val] !== true)
      }

      if (this.lockedPicIdx === null && this.expectedPics.length === 0) {
        this.autoplay = true
        console.log('playing_load', this.lockedPicIdx)
      } else {
        console.log('loaded but not play')
      }
    },
    onCarouselChange (currentIdx) {
      console.log('carouselChange', currentIdx)
      this.currentIdx = currentIdx
      // console.log(currentIdx + 1)
      let nextIndex = currentIdx + 1
      if (nextIndex >= this.pics.length) nextIndex = 0
      // console.log('current', this.currentIdx, 'next', nextIndex, this.pics)
      this.expectedPics = []
      // if neither current picture nor next picture is loaded, pause.
      if (!this.loadedPic[currentIdx]) {
        this.expectedPics.push(currentIdx)
      }
      if (!this.loadedPic[nextIndex]) {
        this.expectedPics.push(nextIndex)
      }
      if (this.expectedPics.length > 0) {
        this.autoplay = false
        console.log('paused', this.lockedPicIdx)
      // otherwise, check if picture is locked (by clicking thumbs)
      } else if (this.lockedPicIdx === null) {
        this.autoplay = true
        console.log('playing', this.lockedPicIdx)
      }
      console.log('autoplay:', this.autoplay)
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
