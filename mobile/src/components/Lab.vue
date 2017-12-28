<template>
<div class="page-container">
  <mt-header fixed title="Lab">
    <router-link to="/menu" slot="left">
      <mt-button icon="back">Back</mt-button>
    </router-link>
  </mt-header>
  {{msg}}
  <img v-lazy="item" class="lab-pic" v-for="(item, key) in pics" :key="key">
</div>
</template>

<script>

export default {
  name: 'Lab',
  components: {
  },
  data () {
    return {
      pics: [],
      thumbs: [],
      msg: '',
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
      console.log(this.pics)
    }, (response) => {
      this.msg = response.statusText
    })
  },
  methods: {
    getThumbURL (url) {
      return url.replace(/(.*)\/(.*\.jpg)$/, '$1/thumbs/$2')
    },
  }
}
</script>

<style scoped>
div{
  box-sizing: border-box;
}
.page-container {
  padding:0px;
  padding-top: 50px;
}
.lab-pic {
  width: 100%;
  margin: 10px 0px;
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
