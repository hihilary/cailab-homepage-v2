<template>
  <el-dialog class="news-dialog" width="500px" top="27vh" title="News" :visible="visible" v-on:update:visible="val => this.$emit('update:visible', val)"> 
    <el-switch v-model="ifMultipleDate" active-text="multiple days event" class="margin-between"></el-switch>
    <div class="margin-between">
      <el-date-picker v-model="item.dateBegin" type="date" placeholder="start date" format="dd-MM-yyyy"></el-date-picker>
      <span v-if="ifMultipleDate">
          --
        <el-date-picker v-model="item.dateEnd" type="date" placeholder="End date" format="dd-MM-yyyy"></el-date-picker>
      </span>
    </div>
    <el-input type="textarea" autosize v-model="item.text" class="margin-between"></el-input>
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
  props: ['visible', 'data'],
  watch: {
    data: function (val, oldVal) {
      this.item = {...val}
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
      this.$emit('update:visible', false)
    },
    editSubmit () {
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
