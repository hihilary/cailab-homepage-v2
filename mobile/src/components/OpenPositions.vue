<template>
  <div class="page-container">
    <mt-header fixed title="Contact">
      <router-link to="/menu" slot="left">
        <mt-button icon="back">Back</mt-button>
      </router-link>
    </mt-header>
    {{msg}}
    <div v-loading="loading" element-loading-text="loading...">
      <p v-if="positions&&positions.length">We are currently looking to fill a few openings:</p>
      <li v-for="(item, key) in positions" :key="key" class="row-panel">
          <a :href="item.link" target="_blank" v-if="item.link&&item.link.trim().length">{{item.text}}</a>
      </li>
      <p v-if="positions&&positions.length">Our group also has a number of PhD student openings. Please get in touch with Prof. Cai to discuss potential projects if interested.</p>
      <p v-else>To enquire about open positions, please send your CV and a cover letter to Dr. Patrick Cai at <a :href="'mailto:yizhi.cai@manchester.ac.uk'">yizhi.cai@manchester.ac.uk</a></p>
    </div>
  </div>
</template>

<script>

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
.row-panel {
  margin: 20px;
}
a{
  text-decoration: none;
  color: inherit;
}
</style>
