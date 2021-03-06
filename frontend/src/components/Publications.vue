<template>
  <div class="page-container">
    <h1>Publications</h1>
    {{message}}
    <div v-loading="loading" element-loading-text="loading...">
        <el-button type="primary" @click="openNewItemDialog" v-if="canEdit" icon="el-icon-circle-plus-outline">New Item</el-button>
        <el-row :gutter="10" v-for="(item, key) in publications" :key="key" class="row-panel">
            <el-col :span="leftSpan">
              <span>{{item.index}}.</span>
              <span v-html="item.htmlText"></span>
            </el-col>
            <el-col :span="2" v-if="canEdit">
              <i class="el-icon-edit" @click="editItem(key)"></i>&nbsp;
              <i class="el-icon-delete" @click="deleteItem(key)"></i>
            </el-col>
        </el-row>
    </div>
    <PublicationEditDialog :visible.sync="ifShowEditDialog" :text="ubbText" @textChanged="textSubmit"/>
  </div>
</template>

<script>
import ubb2html from '../tools/ubb2html'
import Global from '@/Global'
import PublicationEditDialog from '@/components/PublicationEditDialog'

export default {
  name: 'Publications',
  data () {
    return {
      message: '',
      loading: true,
      publications: [],
      canEdit: false,
      ifShowEditDialog: false,
      ubbText: '',
      editingIndex: undefined,
    }
  },
  components: {
    'PublicationEditDialog': PublicationEditDialog
  },
  computed: {
    leftSpan: function () {
      if (this.canEdit === false) {
        return 24
      } else {
        return 22
      }
    },
    pubsubmit: function () {
      let newArray = []
      for (let item of this.publications) {
        newArray.push(item.ubbText)
      }
      return newArray
    }
  },
  created () {
    let strPubs = localStorage.getItem('publications') // get string of localStorage item
    if (strPubs) {
      try {
        this.loadPublications(JSON.parse(strPubs))
      } catch (err) {
        localStorage.removeItem('publications')
      }
    }

    this.$http.get('/api/publications').then((response) => {
      let backendPubs = response.body
      let publications = JSON.stringify(backendPubs)
      localStorage.setItem('publications', publications)
      this.loadPublications(backendPubs)
    }, (response) => {
      this.message = response.statusText
    })

    // edit button will appear when you are an admin while the component created.
    this.$http.get('/api/myIdentity', '').then((response) => {
      if (response.body.id === 'admin') {
        this.canEdit = true
      }
    }, (response) => {
      this.message = response.statusText
    })

    // edit button will appear when you log in while you are in this component already.
    Global.bus.$on('adminLogin', () => {
      // console.log('received adminLogin event')
      this.canEdit = true
    })

    Global.bus.$on('adminLogout', () => {
      // console.log('received adminLogout event')
      this.canEdit = false
    })
  },
  methods: {
    loadPublications (backendPubs) {
      let publications = []
      let index = backendPubs.length
      for (let x of backendPubs) {
        let ubbText = x
        let htmlText = ubb2html(x)
        publications.push({index, htmlText, ubbText})
        index--
      }
      this.loading = false
      this.publications = publications
    },
    toEditAllPage () {
      this.$router.push({ path: '/publication_edit' })
    },
    editItem (idx) {
      this.ifShowEditDialog = true
      this.ubbText = this.publications[idx].ubbText
      this.editingIndex = idx
    },
    textSubmit (editingText) {
      this.ifShowEditDialog = false
      if (this.editingIndex >= 0) {
        this.publications[this.editingIndex].ubbText = editingText
        this.$set(this.publications[this.editingIndex], 'htmlText', ubb2html(editingText))
        this.$http.put('/api/publications', this.pubsubmit).then((response) => {
          this.$message({type: 'success', message: 'Update succeeded!'})
        }, (response) => {
          this.$message.error('Update error!')
        })
      } else if (this.editingIndex === -1) {
        // console.log(this.editingIndex)
        this.publications.unshift({index: this.publications.length + 1, ubbText: editingText, htmlText: ubb2html(editingText)})
        this.$http.put('/api/publications', this.pubsubmit).then((response) => {
          this.$message({type: 'success', message: 'New item succeeded!'})
          this.ubbText = editingText
        }, (response) => {
          this.$message.error('New item error!')
        })
      }
      this.editingIndex = undefined
    },
    deleteItem (idx) {
      this.$confirm('Confirm deleting?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.publications.splice(idx, 1)
        this.$http.put('/api/publications', this.pubsubmit).then((response) => {
          this.$message({type: 'success', message: 'Delete succeeded!'})
        }, (response) => {
          this.$message.error('Delete error!')
        })
      }).catch(() => {
        this.$message({type: 'info', message: 'Delete canceled!'})
      })
    },
    openNewItemDialog () {
      this.editingIndex = -1
      this.ubbText = ''
      this.ifShowEditDialog = true
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
.row-panel {
  margin: 16px 0;
}
.el-icon-edit, .el-icon-delete{
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
</style>
