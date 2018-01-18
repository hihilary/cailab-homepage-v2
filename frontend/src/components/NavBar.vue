<template>
  <div>
    <el-menu :router="true"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#ffffff"
      active-text-color="#ffeecc"
      >
      <el-menu-item
        v-for="item in routes"
        :key="item.index"
        :index="item.index"
        :route="item.path"
        :class="item.class">
          {{item.text}}
      </el-menu-item>
      <li class="itemxx" @click="onOpenLogin" v-if="!adminLoggedIn">login</li>
      <li class="itemxx" @click="onLogout" v-else>logout</li>
    </el-menu>
  </div>
</template>

<script>
import Global from '@/Global'
export default {
  name: 'NavBar',
  data () {
    return {
      activeIndex: '1',
      adminLoggedIn: false,
      routes: [
        {
          index: '1',
          path: '/',
          text: 'The Cai Lab',
          class: 'brand',
        },
        {
          index: '2',
          path: '/about',
          text: 'Projects',
          class: '',
        },
        {
          index: '3',
          path: '/news_items',
          text: 'News',
          class: '',
        },
        {
          index: '4',
          path: '/publications',
          text: 'Publications',
          class: '',
        },
        {
          index: '5',
          path: '/users',
          text: 'People',
          class: '',
        },
        {
          index: '6',
          path: '/pictures',
          text: 'Lab',
          class: '',
        },
        {
          index: '7',
          path: '/collaborators',
          text: 'Collaborators',
          class: '',
        },
        {
          index: '8',
          path: '/contact',
          text: 'Contact',
          class: '',
        },
        {
          index: '9',
          path: '/openpositions',
          text: 'Open Positions',
          class: '',
        },

      ],
    }
  },
  created () {
    this.$http.get('/api/myIdentity', {}).then((response) => {
      if (response.body.id === 'admin') {
        this.adminLoggedIn = true
      }
    })

    Global.bus.$on('adminLogin', () => {
      // console.log('received adminLogin event')
      this.adminLoggedIn = true
    })
    this.activeIndex = this.routes.find(element => element.path === this.$route.path).index
  },
  beforeUpdate () {
    this.activeIndex = this.routes.find(element => element.path === this.$route.path).index
  },
  methods: {
    onOpenLogin () {
      Global.bus.$emit('openLoginDialog')
    },
    onLogout () {
      this.$http.post('/api/logout', {}).then((response) => {
        this.$message({message: 'You\'ve logged out', type: 'success'})
        this.adminLoggedIn = false
        Global.bus.$emit('adminLogout')
      })
    },
  }
}
</script>

<style scoped>
.brand {
  font-size: 20px;
}
.el-menu-demo {
  background-image: url("../assets/banner-bg-1.jpg");
  border-bottom: none;
  background-size:cover;
  display: -webkit-flex;
  display: flex;
  justify-content:center;
}
.el-menu-item {
  display: -webkit-inline-flex;
  display: inline-flex;
}
.special-nav-bar > .el-menu-demo {
  background-color: rgba(255,255,255, 0.1 );
  background-image: none;
  border-bottom: none;
}
.el-menu-item:hover {
  background-color: #545c64;
}
.special-nav-bar > ul >li:hover {
  background-color: rgba(255,255,255, 0.1 );
}
li.el-menu-item:focus {
  background-color: rgba(255,255,255, 0.1)  ;
}
.itemxx
{
  float: left;
  height: 60px;
  line-height: 60px;
  color: #fff;
  padding-left:20px;
  padding-right:20px;
  cursor: pointer;
}
.itemxx:focus
{
  outline:0px;
}
</style>
