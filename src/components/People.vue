<template>
  <div>
    <div class="page-container">
      <h1>People</h1>
    </div>
    <div>{{leader.title}}{{leader.name}}</div>
    <div>{{leader.email}}</div>
    <div v-for="(member,idx) in crew" :key="idx">
      <div>{{member.title}}{{member.name}}</div>
      <div>{{member.email}}</div>
      <div>{{shortDescription(member.description)}}</div>
    </div>
    <Alumni/>
  </div>
</template>

<script>

import crewMember from '../assets/people.json'

export default {
  name: 'People',
  data () {
    return {
      leader: {
        'title': 'Dr. ',
        'name': 'Patrick Yizhi Cai',
        'email': 'yizhi.cai@manchester.ac.uk',
        'link': '/static/YCai-CV-Full-2017-11-9.pdf',
        'protrait': 'patrick.jpg'
      },
      crew: crewMember,
    }
  },
  methods: {
    shortDescription (longDescription) {
      if (longDescription) {
        return longDescription.replace(/\[br\]/, '').substr(0, 140)
      } else {
        return ''
      }
    }
  },
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
</style>
