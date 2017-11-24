<template>
  <div class="page-container">
    <h1>News</h1>{{msg}}
    <div v-loading="loading" element-loading-text="loading...">
      <el-button type="primary" @click="onClick" v-if="canEdit">Edit All</el-button>
        <el-row v-for="(item, key) in news" :key="key" v-if="ifShowPage(key)" class="row-panel">
          <el-col :span="leftSpan">
            <span v-html="item.description"></span>
          </el-col>
          <el-col :span="2" v-if="canEdit">
            <i class="el-icon-edit" @click="editItem(key)"></i>&nbsp;
            <i class="el-icon-delete" @click="deleteItem(key)"></i>
          </el-col>
        </el-row>
      <el-pagination layout="prev, pager, next" :total="news.length" :page-size="pageSize" :current-page.sync="currentPage" />
    </div>
    <NewsEditDialog :visible.sync="ifShowEditDialog" :data="data"/>
  </div>
</template>

<script>
import ubb2html from '../tools/ubb2html'
import Global from '@/Global'
import NewsEditDialog from '@/components/NewsEditDialog'

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
      ifShowEditDialog: false,
      editingIndex: undefined,
      data: {}
    }
  },
  components: {
    'NewsEditDialog': NewsEditDialog
  },
  computed: {
    leftSpan: function () {
      if (this.canEdit === false) {
        return 24
      } else {
        return 22
      }
    },
    newsSubmit: function () {
      let newArray = []
      for (let x of this.news) {
        newArray.push({dateBegin: x.dateBegin, dateEnd: x.dateEnd, text: x.text})
      }
      return newArray
    }
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
        news.push({description: `${date}, ${htmlText}`, dateBegin: x.dateBegin, dateEnd: x.dateEnd, text: x.text})
      }
      this.loading = false
      this.news = news
      // console.log(this.news)
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

    Global.bus.$on('adminLogin', () => {
      console.log('received adminLogin event')
      this.canEdit = true
    })
  },
  methods: {
    onClick () {
      this.$router.push({ path: '/news_edit' })
    },
    ifShowPage (idx) {
      return idx >= (this.currentPage - 1) * 20 && idx < (this.currentPage) * 20
    },
    editItem (idx) {
      this.ifShowEditDialog = true
      this.editingIndex = idx
      let dateBegin = ''
      let dateEnd = ''
      if (this.news[idx].dateBegin) {
        dateBegin = new Date(this.news[idx].dateBegin)
      }
      if (this.news[idx].dateEnd) {
        dateEnd = new Date(this.news[idx].dateEnd)
      }
      this.data = {dateBegin, dateEnd, text: this.news[idx].text}
      console.log(this.data)
    },
    deleteItem (idx) {
      this.$confirm('Confirm deleting?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.news.splice(idx, 1)
        this.$http.put('/api/updateNews', this.newsSubmit).then((response) => {
          this.$message({type: 'success', message: 'Delete succeeded!'})
        }, (response) => {
          this.$message.error('Delete error!')
        })
      }).catch(() => {
        this.$message({type: 'info', message: 'Delete canceled!'})
      })
    },
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