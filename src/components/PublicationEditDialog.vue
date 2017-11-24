<template>
  <el-dialog class="publication-dialog" width="500px" top="27vh" title="Publication" :visible="visible" v-on:update:visible="val => this.$emit('update:visible', val)"> 
    <el-input type="textarea" autosize v-model="editingText"></el-input>
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
      this.$emit('update:visible', false)
    },
    editSubmit () {
      let submitText = this.editingText.trim()
      let ifSubmit = true
      if (submitText.length === 0) {
        ifSubmit = false
      }
      if (submitText === this.text) {
        ifSubmit = false
        this.editingText = submitText
      }
      if (ifSubmit) {
        this.$emit('textChanged', submitText)
      } else {
        this.$emit('update:visible', false)
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