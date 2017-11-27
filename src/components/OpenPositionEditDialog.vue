<template>
  <el-dialog class="position-dialog" width="500px" top="27vh" title="Open Position" :visible="visible" v-on:update:visible="val => this.$emit('update:visible', val)"> 
    Text:<el-input type="textarea" :autosize="{minRows: 1, maxRows: 6}" v-model="item.text"></el-input>
    Link:<el-input type="textarea" :autosize="{minRows: 1, maxRows: 6}" v-model="item.link"></el-input>
    <span slot="footer">
      <el-button type="primary" @click="editSubmit">Submit</el-button>
      <el-button @click="cancelDialog">Cancel</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'OpenPositionEditDialog',
  data () {
    return {
      item: {},
    }
  },
  props: ['visible', 'data'],
  watch: {
    data: function (val, oldVal) {
      this.item = {...val}
    }
  },
  methods: {
    cancelDialog () {
      this.item = {}
      this.$emit('update:visible', false)
    },
    editSubmit () {
      if (!this.item.text || (this.item.text = this.item.text.trim()).length === 0) {
        this.$message({message: 'Text is necessary!', type: 'warning'})
        return
      }
      if (this.item.link) {
        this.item.link = this.item.link.trim()
      }
      if (this.item.text === this.data.text && this.item.link === this.data.link) {
        this.cancelDialog()
      } else {
        this.$emit('textChanged', this.item)
      }
    }
  }
}
</script>

<style>
.publication-dialog .el-dialog__body {
  padding: 10px 20px 10px 20px;
}
.publication-dialog .el-dialog__header {
  padding: 20px 20px 5px 20px;
}
</style>