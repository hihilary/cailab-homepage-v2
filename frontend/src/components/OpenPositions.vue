<template>
  <div class="page-container">
    <h1>Open Positions</h1>{{msg}}
    <div v-loading="loading" element-loading-text="loading...">
      <el-button type="primary" @click="openNewItemDialog" v-if="canEdit" icon="el-icon-circle-plus-outline">New Item</el-button>
      <p v-if="positions&&positions.length">We are currently looking to fill a few openings:</p>
      <el-row :gutter="10" v-for="(item, key) in positions" :key="key" class="row-panel">
        <el-col :span="leftSpan">
          <span>{{key+1}}. {{item.text}}: <a :href="item.link" target="_blank" v-if="item.link&&item.link.trim().length">link</a></span>
        </el-col>
        <el-col :span="2" v-if="canEdit">
          <i class="el-icon-edit" @click="editItem(key)"></i>&nbsp;
          <i class="el-icon-delete" @click="deleteItem(key)"></i>
        </el-col>
      </el-row>
      <p v-if="positions&&positions.length">Our group also has a number of PhD student openings. Please get in touch with Prof. Cai to discuss potential projects if interested.</p>
      <p v-else>To enquire about open positions, please send your CV and a cover letter to Dr. Patrick Cai at <a :href="'mailto:yizhi.cai@manchester.ac.uk'">yizhi.cai@manchester.ac.uk</a></p>
    </div>
    <OpenPositionEditDialog :visible.sync="ifShowEditDialog" :data="positionPass" @textChanged="positionSubmit"/>
  </div>
</template>

<script>
import Global from '@/Global'
import OpenPositionEditDialog from '@/components/OpenPositionEditDialog'

export default {
  name: 'OpenPositions',
  data () {
    return {
      loading: true,
      msg: '',
      canEdit: false,
      positions: [],
      positionPass: {},
      ifShowEditDialog: false,
      editingIndex: undefined,
    }
  },
  components: {
    'OpenPositionEditDialog': OpenPositionEditDialog
  },
  computed: {
    leftSpan: function () {
      if (this.canEdit === false) {
        return 24
      } else {
        return 22
      }
    },
  },
  created () {
    this.$http.get('/api/listOpenPositions').then((response) => {
      this.positions = response.body
      this.loading = false
    }, (response) => {
      this.msg = response.statusText
    })

    this.$http.post('/api/myIdentity', {}).then((response) => {
      if (response.body.id === 'admin') {
        this.canEdit = true
      }
    }, (response) => {
      this.msg = response.statusText
    })

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
    openNewItemDialog () {
      this.ifShowEditDialog = true
      this.editingIndex = -1
      this.positionPass = {}
    },
    deleteItem (idx) {
      this.$confirm('Confirm deleting?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.positions.splice(idx, 1)
        console.log(this.positions)
        this.$http.put('/api/updateOpenPositions', this.positions).then((response) => {
          this.$message({type: 'success', message: 'Delete succeeded!'})
        }, (response) => {
          this.$message.error('Delete error!')
        })
      }).catch(() => {
        this.$message({type: 'info', message: 'Delete canceled!'})
      })
    },
    editItem (idx) {
      this.ifShowEditDialog = true
      this.editingIndex = idx
      this.positionPass = this.positions[idx]
    },
    positionSubmit (item) {
      this.ifShowEditDialog = false
      if (item.link && !item.link.match(/^https?:\/\//)) {
        item.link = 'http://' + item.link
      }
      if (this.editingIndex >= 0) {
        this.$set(this.positions, this.editingIndex, item)
        this.$http.put('/api/updateOpenPositions', this.positions).then((response) => {
          this.$message({type: 'success', message: 'Update succeeded!'})
        }, (response) => {
          this.$message.error('Update error!')
        })
      } else if (this.editingIndex === -1) {
        this.positions.unshift(item)
        this.$http.put('/api/updateOpenPositions', this.positions).then((response) => {
          this.$message({type: 'success', message: 'New item succeeded!'})
        }, (response) => {
          this.$message.error('New item error!')
        })
      }
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
  margin: 14px 0;
}
.el-icon-edit, .el-icon-delete{
  cursor: pointer;
}
a {
  color: #08c;
  text-decoration: none;
}
a:hover {
  color: #005580;
  text-decoration: underline;
}
</style>
