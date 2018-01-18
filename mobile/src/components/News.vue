<template>
  <div class="page-container">
    <mt-header fixed title="News">
      <router-link to="/menu" slot="left">
        <mt-button icon="back">Back</mt-button>
      </router-link>
    </mt-header>

    <div v-for="(item, key) in news" :key="key" class="row-panel">
      <span v-html="item.description"></span>
    </div>

  </div>
</template>

<script>
import ubb2html from '../../../frontend/src/tools/ubb2html'

export default {
  name: 'News',
  data () {
    return {
      news: [],
      loading: true,
      msg: '',
      currentPage: 1,
      pageSize: 20,
    }
  },
  components: {
  },
  computed: {
  },
  created () {
    let strNews = localStorage.getItem('news') // get string of localStorage item
    if (strNews) {
      try {
        this.loadNews(JSON.parse(strNews))
      } catch (err) {
        localStorage.removeItem('news')
      }
    }

    this.$http.get('/api/news').then((response) => {
      let backendNews = response.body
      let news = JSON.stringify(backendNews)
      localStorage.setItem('news', news)
      this.loadNews(backendNews)
      // console.log(this.news)
    }, (response) => {
      this.msg = response.statusText
    })
  },
  methods: {
    loadNews (backendNews) {
      let news = []
      for (let x of backendNews) {
        news.push({description: this.getDescription(x), dateBegin: x.dateBegin, dateEnd: x.dateEnd, text: x.text})
      }
      this.loading = false
      this.news = news
    },
    getDescription (news) {
      let date = new Date(news.dateBegin).toLocaleDateString(
        'en-GB', {year: 'numeric', month: 'short', day: 'numeric'})
      if (news.dateEnd) {
        let endDate = new Date(news.dateEnd).toLocaleDateString(
          'en-GB', {year: 'numeric', month: 'short', day: 'numeric'})
        date += ' - ' + endDate
      }
      let htmlText = ubb2html(news.text)
      return `${date}, ${htmlText}`
    },
  }
}
</script>

<style scoped>
div{
  box-sizing: border-box;
}

.row-panel {
  max-width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #ddd;
  padding: 8px;
  border-spacing: 0;
}
.row-panel:hover {
  background-color: #f5f5f5;
}
.el-icon-delete, .el-icon-edit {
  cursor: pointer;
}
.new-button {
  margin-bottom: 5px;
}
.oper-panel {
  text-align: center;
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
.el-pagination {
  margin-top: 8px;
}
</style>
