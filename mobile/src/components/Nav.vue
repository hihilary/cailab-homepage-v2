<template>
  <div class="mid-panel">
    <router-link :to="item.link" class="flex-row" v-for="item in items" :key="item.title">
      <img :src="item.img" class="germ">      
      <div class="inline germ-text">
        <div class="font24">{{item.title}}</div>
        {{item.text}}
      </div>
    </router-link>
  </div>
</template>

<script>
import germ1 from '../assets/pic_art/germ1.png'
import germ2 from '../assets/pic_art/germ2.png'
import germ3 from '../assets/pic_art/germ3.png'
import germ4 from '../assets/pic_art/germ4.png'
import germ5 from '../assets/pic_art/germ5.png'
import germ6 from '../assets/pic_art/germ6.png'
import germ7 from '../assets/pic_art/germ7.png'

export default {
  name: 'Nav',
  data () {
    return {
      items: [
        {
          title: 'News',
          img: germ2,
          link: '/news_items',
          text: 'Learn more about recent news from the Cai Lab.',
        },
        {
          title: 'Publications',
          img: germ4,
          link: '/publications',
          text: 'Learn more about all publications from the Cai Lab.',
        },
        {
          title: 'Projects',
          img: germ1,
          link: '/projects',
          text: 'The Cai Lab is a Synthetic Biology research group based out of the University of Manchester. Click here in order to learn more about our research.',
        },
        {
          title: 'People',
          img: germ5,
          link: '/users',
          text: 'Click here to download Patrick Yizhi Cai\'s CV and meet the cailab members',
        },
        {
          title: 'Lab',
          img: germ6,
          link: '/lab',
          text: 'Click here to take a look on lab pictures',
        },
        {
          title: 'Collaborators',
          img: germ7,
          link: '/collaborators',
          text: 'We thank these research councils and industrial partners for their generous support',
        },
        {
          title: 'Contact',
          img: germ1,
          link: '/contact',
          text: 'Click here to find out where is Cailab and how to get contact with it.',
        },
        {
          title: 'Open Positions',
          img: germ3,
          link: '/openpositions',
          text: 'The Cai Lab has several open positions. Click here to get involved with the lab as a student or as a researcher.',
        },
      ],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div{
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color: inherit;
}
.germ {
  width: 100px;
  height: auto;
  display: inline-block;
  margin-right:10px;
}
.germ-text {
  padding-bottom: 5px;
}

.mid-panel{
  font-size: 14px;
  text-align: left;
  // display: flex;
  // flex-direction: column;
  padding:8px;
  >div {
    margin-top:10px;
    margin-bottom: 10px;
  }
}

.flex-col{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.flex-row{
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.font24{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>