<template>
  <el-dialog class="news-dialog" width="500px" top="27vh" title="News" :visible="visible" @update:visible="val => this.$emit('update:visible', val)"> 
    <el-switch v-model="ifMultipleDate" active-text="multiple days event" class="margin-between"></el-switch>
    <div class="margin-between">
      <el-date-picker v-model="item.dateBegin" type="date" placeholder="start date" format="dd-MM-yyyy"></el-date-picker>
      <span v-if="ifMultipleDate">
          --
        <el-date-picker v-model="item.dateEnd" type="date" placeholder="End date" format="dd-MM-yyyy" @change="dateEndChanged"></el-date-picker>
      </span>
    </div>
    <el-input type="textarea" :autosize="{minRows: 2, maxRows: 6}" v-model="item.text" class="margin-between"></el-input>
    <span slot="footer">
      <el-button type="primary" @click="editSubmit">Submit</el-button>
      <el-button @click="cancelDialog">Cancel</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'NewsEditDialog',
  data () {
    return {
      item: {},
      ifMultipleDate: false
    }
  },
  props: ['visible', 'newsdata'],
  watch: {
    newsdata: function (val, oldVal) {
      this.item = {...val} // value copy
      // this.item = val
      if (val.dateEnd) {
        this.ifMultipleDate = true
      } else {
        this.ifMultipleDate = false
      }
    }
  },
  methods: {
    cancelDialog () {
      this.item = {}
      this.$emit('update:visible', false)
    },
    editSubmit () {
      if (!this.item.dateBegin) {
        this.$message({message: 'Start date is necessary!', type: 'warning'})
        return
      }
      if (!this.item.text) {
        this.$message({message: 'Content is necessary!', type: 'warning'})
        return
      }
      this.item.text = this.item.text.trim()
      if (this.item.text.length === 0) {
        this.$message({message: 'Content is necessary!', type: 'warning'})
        return
      }
      if (this.item.dateBegin === this.newsdata.dateBegin &&
      this.item.dateEnd === this.newsdata.dateEnd && this.item.text === this.newsdata.text) {
        this.cancelDialog()
      } else {
        this.$emit('dataChanged', this.item)
      }
    },
    dateEndChanged () {
      if (!this.item.dateEnd) {
        this.ifMultipleDate = false
      }
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input {
  width: 135px;
}
.multiple-date {
  display: inline-block;
}
.margin-between {
  margin: 5px 0;
}
</style>
