<template>
  <div class="page-container">
    <h1>Publications</h1>
    <div>{{message}}</div>
    <el-button type="primary" @click="onClick">Edit</el-button>
    <p v-for="(publicationsItem, key) in publications" :key="key">
        
        <span>{{publicationsItem.index}}.</span>
        <span v-html="publicationsItem.htmlText"></span>
        
    </p>
  </div>
</template>

<script>
export default {
  name: 'Publications',
  data () {
    return {
      message: 'loading',
      publications: [],
    }
  },
  created () {
    this.$http.post('/api/listPublications').then((response) => {
      let publications = []
      let index = response.body.length
      for (let x of response.body) {
        let htmlText = x.replace(/\[b](.*?)\[\/b\]/g, '<b>$1</b>')
        publications.push({index, htmlText})
        index--
      }
      this.message = ''
      this.publications = publications
    }, (response) => {
      this.msg = response.statusText
    })
  },
  methods: {
    onClick () {
      this.$router.push({ path: '/publication_edit' })
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