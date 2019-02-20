<template>
  <div>
    <div class="page-container">
      <mt-header fixed title="People">
      <router-link to="/menu" slot="left">
        <mt-button icon="back">Back</mt-button>
      </router-link>
    </mt-header>
      <div class="leader">
        <img v-lazy="getFullPortraitPath(leader.portrait)" class="img-leader" @click="clickMember(leader)">
        <div class="info-leader">
          <h2>{{leader.title}}{{leader.name}}</h2>
          <div><a :href="'mailto:'+leader.email">{{leader.email}}</a></div>
          <br>
          <div><a href="/static/YCai-CV-Full-2017-11-9.pdf">Dr. Cai's CV</a></div>
        </div>
      </div>
      <div v-for="(member,idx) in crew" :key="idx" class="crew">
        <img v-lazy="getFullPortraitPath(member.portrait)" class="img-crew" @click="clickMember(member)">
        <div class="info-crew">
          <h4>{{member.title}}{{member.name}}</h4>
          <div class="email"><a :href="'mailto:'+member.email">{{member.email}}</a></div>
          <template v-if="longDescription(member.description).length <= shortDescriptionLength">
            <div><span v-html="longDescription(member.description)" /></div>
          </template>
          <template v-else>
            <div v-if="!isFullText[idx]">
              {{shortDescription(member.description)}}... <span @click="changeFullText(idx)" class="full-text-link">More</span>
              <div @click="changeFullText(idx)" class="full-text">
                <svg aria-hidden="true" data-fa-processed="" data-prefix="fal" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="icon"><path fill="currentColor" d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" class=""></path></svg>
              </div>
            </div>
            <div v-else>
              <span v-html="longDescription(member.description)" /><br>
              <div @click="changeFullText(idx)" class="full-text">
                <svg aria-hidden="true" data-fa-processed="" data-prefix="fal" data-icon="angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="icon"><path fill="currentColor" d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" class=""></path></svg>
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>
    <Alumni/>
  </div>
</template>

<script>

import crewMember from '../assets/people.json'
import ubb2html from '../tools/ubb2html'
import Alumni from './Alumni'

export default {
  name: 'People',
  components: {
    Alumni,
  },
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
      },
      shortDescriptionLength: 140,
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
        return longDescription.replace(/\[br\]/, '').substr(0, this.shortDescriptionLength)
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
h1,
h2,
h3 {
  margin: 20px 0;
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
h4 {
  font-size: 22px;
  /* line-height: 26px; */
  margin: 5px 0;
  font-weight: bold;
}
.page-container{
  padding: 0px;
}
.leader {
  margin-top: 20px;
  margin-bottom: 20px;
}
.img-leader {
  width: 100%;
}
.info-leader, .info-crew {
  padding: 10px 20px;
}
/* .crew {
  padding: 30px 10px 10px 10px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: flex-start;
  align-items: flex-start;
} */
.img-crew {
  width: 100%;
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
.full-text {
  color: rgb(0,136,204);
  text-decoration: none;
  text-align:center;
}
.full-text-link {
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
.email {
  margin: 5px 0;
}
.icon {
  width: 50px;
  height: 50px;
}
</style>
