<template>
  <div class="page-container">
    <h1>News</h1>
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 652px;">
      <tbody>
        <tr class="el-table__row" v-for="(newsItem, key) in news" :key="key">
          <td class="el-table_1_column_1">
            <div class="cell" v-html="newsItem.description"></div>
          </td>
        </tr>
      </tbody>
    </table>

    <el-table :data="news" style="width: 100%">
      <el-table-column prop="description" label="Description" />
    </el-table>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/table.css'
import 'element-ui/lib/theme-chalk/table-column.css'
export default {
  name: 'News',
  data () {
    return {
      news: [],
    }
  },
  created () {
    this.$http.post('/api/listNews').then((response) => {
      let tmps = response.body
      // console.log(this.news)
      let descriptions = []
      for (let x of tmps) {
        let date = new Date(x.dateBegin).toLocaleDateString(
          undefined, {year: 'numeric', month: 'short', day: 'numeric'})
        if (x.dateEnd) {
          let endDate = new Date(x.dateEnd).toLocaleDateString(
          undefined, {year: 'numeric', month: 'short', day: 'numeric'})
          date += ' - ' + endDate
        }
        let htmlText = x.text.replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>')
        descriptions.push({description: `${date}, ${htmlText}`})
      }
      this.news = descriptions
    }, (response) => {
      this.msg = response.statusText
    })
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
.h1,
.h2,
.h3 {
  margin: 10px 0;
  font-weight: bold;
}
.h1 {
  font-size: 36px;
  line-height: 40px;
}
</style>