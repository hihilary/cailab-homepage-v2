<template>
  <div class="page-container">
    <h1>News</h1>
    <table class="table-panel">
        <tbody>
          <tr v-for="(item, key) in news" :key="key">
            <td>
              <div class="date-line">
                <el-date-picker v-if="!item.wayOfDate" v-model="item.dateBegin" type="date" placeholder="start date" format="DD-MM-yyyy"></el-date-picker>
                <div v-if="item.wayOfDate" class="multiple-date">
                  <el-date-picker  v-model="item.dateBegin" type="date" placeholder="start date" format="DD-MM-yyyy"></el-date-picker> -
                  <el-date-picker v-model="item.dateEnd" type="date" placeholder="End date" format="DD-MM-yyyy"></el-date-picker>
                </div>
                <el-switch v-model="item.wayOfDate" active-text="multiple days event"></el-switch>
                <i class="el-icon-delete delete-icon" @click="deleteItem(key)"></i>
              </div>
              <el-input type="textarea" v-model="item.htmlText" autosize class="text-area"/>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      news: [],
      canEdit: false,
    }
  },
  created () {
    this.$http.get('/api/news').then((response) => {
      let tmps = response.body
      let news = []
      for (let x of tmps) {
        let item = {}
        item.dateBegin = new Date(x.dateBegin)
        let wayOfDateTmp = false
        if (x.dateEnd) {
          let endDate = new Date(x.dateEnd)
          item.dateEnd = endDate
          wayOfDateTmp = true
        }
        item.wayOfDate = wayOfDateTmp
        item.htmlText = x.text
        news.push(item)
      }
      this.news = news
    }, (response) => {
      this.msg = response.statusText
    })
  },
  methods: {

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
table {
  max-width: 100%;
  border-color: grey;
  border-collapse: collapse;
  background-color: transparent;
}
tbody {
  vertical-align: middle;
}
td {
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:rgb(221,221,221);
  padding: 8px;
}
tr:hover {
  background-color: #f5f5f5;
}
.el-date-editor.el-input {
  width: 135px;
}
.multiple-date {
  display: inline-block;
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
.date-line {
  margin:5px 0;
}
.table-panel {
  width: 100%
}
.text-area > .el-textarea__inner {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>