<template>
  <div class="page-container">
    <mt-header fixed title="Publications">
      <router-link to="/menu" slot="left">
        <mt-button icon="back">Back</mt-button>
      </router-link>
    </mt-header>
    {{message}}
    <div>
      <div v-for="(item, key) in publications" :key="key" class="row-panel">
        <span>{{item.index}}.</span>
        <span v-html="item.htmlText"></span>
      </div>
    </div>
  </div>
</template>

<script>
import ubb2html from '../../../frontend/src/tools/ubb2html'

export default {
  name: 'Publications',
  data () {
    return {
      message: '',
      loading: true,
      publications: [],
    }
  },
  components: {
  },
  computed: {
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

    this.$http.get('/api/listPublications').then((response) => {
      let backendPubs = response.body
      let publications = JSON.stringify(backendPubs)
      localStorage.setItem('publications', publications)
      this.loadPublications(backendPubs)
    }, (response) => {
      this.message = response.statusText
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
  }
}
</script>

<style scoped>
div{
  box-sizing: border-box;
}
.row-panel {
  margin: 16px 0;
}
.divn-edit, .divn-delete{
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
