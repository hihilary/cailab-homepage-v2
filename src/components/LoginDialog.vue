<template>
  <el-dialog title="Login" :visible.sync="dialogFormVisible" width="300px">
    <el-input v-model="username" auto-complete="off"  placeholder="username"></el-input>
    <el-input type="password" v-model="password" auto-complete="off"  placeholder="password"></el-input>
    <div v-if="message">{{message}}</div>
    <div slot="footer">
      <el-button type="primary" @click="login">Submit</el-button>
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Global from '@/Global'
export default {
  data () {
    return {
      dialogFormVisible: false,
      username: '',
      password: '',
      message: '',
      formLabelWidth: '80px',
    }
  },
  name: 'LoginDialog',
  created () {
    Global.bus.$on('openLoginDialog', () => {
      this.dialogFormVisible = true
    })
  },
  methods: {
    login () {
      this.$http.post('/api/login', {password: this.password}).then((response) => {
        if (response.status === 200) {
          this.dialogFormVisible = false
          Global.bus.$emit('adminLogin')
        } else {
          this.message = response.body.message
        }
      })
    }
  }
}
</script>

<style scoped>
.el-input:first-of-type
{
  margin-bottom:20px;
}
</style>