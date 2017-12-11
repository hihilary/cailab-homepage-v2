<template>
  <div>
    <div class="page-container">
      <h1>People</h1>
      <div class="leader">
        <img :src="getThumbPortraitPath(leader.portrait)" class="img-leader" @click="clickMember(leader)">
        <div class="info-leader">
          <h2>{{leader.title}}{{leader.name}}</h2>
          <div><a :href="'mailto:'+leader.email">{{leader.email}}</a></div>
          <a href="/static/YCai-CV-Full-2017-11-9.pdf">Dr. Cai's CV</a>&nbsp;&nbsp;|&nbsp;
          <router-link to="/about">Learn more about the lab</router-link>
        </div>
      </div>
      <div v-for="(member,idx) in crew" :key="idx" class="crew">
        <img :src="getThumbPortraitPath(member.portrait)" class="img-crew" @click="clickMember(member)">
        <div class="info-crew">
          <h5>{{member.title}}{{member.name}}</h5>
          <div><a :href="'mailto:'+member.email">{{member.email}}</a></div>
          <div v-if="!isFullText[idx]">
            {{shortDescription(member.description)}}... <span @click="changeFullText(idx)" class="full-text">More</span>
          </div>
          <div v-else>
            <span v-html="longDescription(member.description)" /><br>
            <span @click="changeFullText(idx)" class="full-text">Collapse</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title=bigPicDetail.name
      :visible.sync="bigPicVisible"
      @close="bigPicDetail={name: '', picturePath: ''}"
      width="664px"
      center>
      <div @click="bigPicVisible = false">
      <img :src="bigPicDetail.picturePath" class="img-full">
      </div>
    </el-dialog>
    <Alumni/>
  </div>
</template>

<script>

import crewMember from '../assets/people.json'
import ubb2html from '../tools/ubb2html'

export default {
  name: 'People',
  data () {
    return {
      leader: {
        'title': 'Dr. ',
        'name': 'Patrick Yizhi Cai',
        'email': 'yizhi.cai@manchester.ac.uk',
        'link': '/static/YCai-CV-Full-2017-11-9.pdf',
        'portrait': 'Patrick.jpg'
      },
      crew: crewMember,
      isFullText: [],
      bigPicVisible: false,
      bigPicDetail: {
        name: '',
        picturePath: '',
      }
    }
  },
  created () {
    for (let i in this.crew) {
      this.isFullText[i] = false
    }
  },
  methods: {
    shortDescription (longDescription) {
      if (longDescription) {
        return longDescription.replace(/\[br\]/, '').substr(0, 140)
      } else {
        return ''
      }
    },
    longDescription (ubb) {
      return ubb2html(ubb)
    },
    getFullPortraitPath (portrait) {
      return require('../assets/portraits/' + portrait)
    },
    getThumbPortraitPath (portrait) {
      return require('../assets/portraits/thumbs/' + portrait)
    },
    changeFullText (index) {
      this.$set(this.isFullText, index, !this.isFullText[index])
    },
    clickMember (member) {
      this.bigPicDetail = {
        name: member.title + member.name,
        picturePath: this.getFullPortraitPath(member.portrait)
      }
      this.bigPicVisible = true
    },
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
h2 {
  font-size: 30px;
  line-height: 40px;
}
h5 {
  font-size: 14px;
  line-height: 20px;
  margin: 5px 0;
  font-weight: bold;
}
.leader {
  background-color: rgb(245,245,245);
  border-color: rgb(227,227,227);
  color: rgb(51,51,51);
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  padding: 9px;
  min-height: 20px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  margin-bottom: 20px;
}
.img-leader {
  width: 250px;
  border-collapse: collapse;
  padding: 4px;
  vertical-align: middle;
  border: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  background-color: #fff;
  cursor: pointer;
  margin-right: 30px;
}
.info-leader, .info-crew {
  display: inline-block;
}
.crew {
  padding: 30px 10px 10px 10px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.img-crew {
  width: 200px;
  border-collapse: collapse;
  padding: 4px;
  vertical-align: middle;
  border: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  background-color: #fff;
  cursor: pointer;
  margin:0px 25px 0px 25px;
}
.img-full {
  width: 500px;
  border-collapse: collapse;
  padding: 4px;
  vertical-align: middle;
  border: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  background-color: #fff;
  margin:50px;
}
a, .full-text {
  color: rgb(0,136,204);
  text-decoration: none;
}
a:hover, .full-text:hover {
  color: rgb(0,85,128);
  text-decoration: underline;
}
.full-text {
  cursor: pointer;
}
</style>
