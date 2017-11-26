<template>
  <el-dialog class="publication-dialog" width="500px" top="27vh" title="Publication" :visible="visible" v-on:update:visible="val => this.$emit('update:visible', val)"> 
    <el-input type="textarea" :autosize="{minRows: 2, maxRows: 6}" v-model="editingText"></el-input>
    <span slot="footer">
      <el-button type="primary" @click="editSubmit">Submit</el-button>
      <el-button @click="cancelDialog">Cancel</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'PublicationEditDialog',
  data () {
    return {
      editingText: '',
    }
  },
  props: ['visible', 'text'],
  watch: {
    text: function (val, oldVal) {
      this.editingText = val
    }
  },
  methods: {
    cancelDialog () {
      this.editingText = ''
      this.$emit('update:visible', false)
    },
    editSubmit () {
      this.editingText = this.editingText.trim()
      if (this.editingText.length === 0) {
        this.$message({message: 'Content is necessary!', type: 'warning'})
        return
      }
      if (this.editingText === this.text) {
        this.cancelDialog()
      } else {
        this.$emit('textChanged', this.editingText)
      }
    }
  },
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