<template>
  <div class="page-container">
    <h1>News</h1>{{msg}}
    <div v-loading="loading" element-loading-text="loading...">
      <el-button type="primary" @click="onClick" v-if="canEdit">Edit All</el-button>
        <div v-for="(newsItem, key) in news" :key="key" v-if="ifShowPage(key)" class="item-panel">
          <span v-html="newsItem.description"></span>
        </div>
      <el-pagination layout="prev, pager, next" :total="news.length" :page-size="pageSize" :current-page.sync="currentPage" />
    </div>
  </div>
</template>

<script>
import ubb2html from '../tools/ubb2html'
export default {
  name: 'News',
  data () {
    return {
      news: [],
      canEdit: false,
      loading: true,
      msg: '',
      currentPage: 1,
      pageSize: 20,
    }
  },
  computed: {
  },
  created () {
    this.$http.get('/api/listNews').then((response) => {
      let tmps = response.body
      let news = []
      for (let x of tmps) {
        let date = new Date(x.dateBegin).toLocaleDateString(
          'en-GB', {year: 'numeric', month: 'short', day: 'numeric'})
        if (x.dateEnd) {
          let endDate = new Date(x.dateEnd).toLocaleDateString(
          'en-GB', {year: 'numeric', month: 'short', day: 'numeric'})
          date += ' - ' + endDate
        }
        let htmlText = ubb2html(x.text)
        // console.log(htmlText)
        news.push({description: `${date}, ${htmlText}`})
      }
      this.loading = false
      this.news = news
    }, (response) => {
      this.msg = response.statusText
    })

    this.$http.post('/api/myIdentity').then((response) => {
      if (response.body.id === 'admin') {
        this.canEdit = true
      }
    }, (response) => {
      this.msg = response.statusText
    })
  },
  methods: {
    onClick () {
      this.$router.push({ path: '/news_edit' })
    },
    ifShowPage (itemIdx) {
      return itemIdx >= (this.currentPage - 1) * 20 && itemIdx < (this.currentPage) * 20
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
  text-align: left;
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
.item-panel {
  max-width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #ddd;
  padding: 8px;
}
.item-panel:hover {
  background-color: #f5f5f5;
}
</style>

<style>
a {
  color: rgb(0,136,204);
  text-decoration: none;
}
a:hover {
  color: rgb(0,85,128);
}
</style>