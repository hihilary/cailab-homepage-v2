<template>
  <div class="page-container">
    <h1>Publications</h1>
      {{message}}
      <el-row>
        <el-col :offset="1" :span="20">
          <el-button type="info" @click="cancelEdit" icon="el-icon-arrow-left">Back</el-button>
          <el-button type="primary" @click="addNewItem" icon="el-icon-circle-plus-outline">New item</el-button>
          <el-button type="primary" plain @click="saveResult" icon="el-icon-circle-check-outline">Save</el-button>
        </el-col>
      </el-row>
      
      <el-row v-for="(item,key) in publications" :key="key" class="item" :gutter="20">
        <el-col :span="1" class="label">
          {{ item.index }}
        </el-col>
        <el-col :span="22">
          <el-input v-model="item.ubbText" type="textarea" autosize class="text-area"/>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-circle-close-outline" @click="deleteItem(key)"></i>
        </el-col>
      </el-row>

  </div>
</template>

<script>
export default {
  name: 'PublicationEdit',
  data () {
    return {
      publications: [],
      message: '',
    }
  },
  created () {
    this.$http.post('/api/publications').then((response) => {
      let publications = []
      let index = response.body.length
      for (let ubbText of response.body) {
        // let htmlText = x.replace(/\[b](.*?)\[\/b\]/g, '<b>$1</b>')
        publications.push({index, ubbText})
        index--
      }
      this.publications = publications
    }, (response) => {
      this.msg = response.statusText
    })
  },
  computed: {
    pubsubmit: function () {
      let newArray = []
      for (let i in this.publications) {
        newArray.push(this.publications[i].ubbText)
      }
      return newArray
    }
  },
  methods: {
    addNewItem () {
      this.publications.unshift({ index: this.publications.length + 1, ubbText: '' })
    },
    deleteItem (key) {
      this.publications.splice(key, 1)
    },
    cancelEdit () {
      this.$router.push({ path: '/publications' })
    },
    saveResult () {
      for (let i = 0; i < this.publications.length; i++) {
        let str = this.publications[i].ubbText.trim()
        this.publications[i].ubbText = str
        if (str.length === 0) {
          this.publications.splice(i, 1)
          i--
        }
      }
      this.$http.put('/api/publications', this.pubsubmit).then((response) => {
        this.$message({
          message: 'submit succeeded!',
          type: 'success'
        })
        this.$router.push({ path: '/publications' })
      }, (response) => {
        this.message = response.statusText
      })
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
.label{
  text-align: right;
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
.text-area > .el-textarea__inner {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.el-icon-circle-close-outline{
  cursor: pointer;
}
.item {
  display         : flex;
  justify-content : center;
  align-items     : center;
  -webkit-display         : flex;
  -webkit-justify-content : center;
  -webkit-align-items     : center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>