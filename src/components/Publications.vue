<template>
  <div class="page-container">
    <h1>Publications</h1>
    <h1>{{message}}</h1>
    <div v-loading="loading" element-loading-text="loading...">
      <el-button type="primary" @click="onClick" v-if="canEdit">Edit</el-button>
      <p v-for="(publicationsItem, key) in publications" :key="key">
          <span>{{publicationsItem.index}}.</span>
          <span v-html="publicationsItem.htmlText"></span>
      </p>
    </div>
  </div>
</template>

<script>
import ubb2html from '../tools/ubb2html'
import Global from '@/Global'
export default {
  name: 'Publications',
  data () {
    return {
      message: '',
      loading: true,
      publications: [],
      canEdit: false,
    }
  },
  created () {
    this.$http.get('/api/listPublications').then((response) => {
      let publications = []
      let index = response.body.length
      for (let x of response.body) {
        let htmlText = ubb2html(x)
        publications.push({index, htmlText})
        index--
      }
      this.loading = false
      this.publications = publications
    }, (response) => {
      this.message = response.statusText
    })

    // edit button will appear when you are an admin while the component crated.
    this.$http.post('/api/myIdentity').then((response) => {
      // console.log(response.body)
      if (response.body.id === 'admin') {
        this.canEdit = true
      }
    })

    // edit button will appear when you log in while you are in this component already.
    Global.bus.$on('adminLogin', () => {
      console.log('received adminLogin event')
      this.canEdit = true
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