<template>
  <div id="app" >
    <v-header :user="user"></v-header>

    <div class="nav-wrapper">
      <div class="nav-item"   @click="select(0)" :class="{'active':selectactive === 0}"><router-link to="/count">{{this.count}}</router-link></div>
      <div class="nav-item"   @click="select(1)" :class="{'active':selectactive === 1}"><router-link to="/comment">{{this.purpular}}</router-link></div>
      <div class="nav-item"   @click="select(2)" :class="{'active':selectactive === 2}"><router-link to="/person">{{this.person}}</router-link></div>
    </div>    
    <keep-alive>
      <router-view :change="change" :user="user" keep-alive></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'
import {getUser} from "./common/js/comment.js"
export default {
  data(){
    return {
      song:null,
      count:"总榜",
      purpular:"评论",
      person:'个人',
      change:[],
      selectactive:0,
      user:(()=>{
        return getUser();
      })(),
    }

  },
  methods:{
    select(type){
      this.selectactive = type;
    },
    handleScroll(){
      return false;
    }
  },
  directive:{
    onmousewheel(){
      return false;
    }
  },
  components:{
    'v-header':header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus"  rel="stylesheet/stylus">
  @import './common/stylus/border.styl'
  .nav-wrapper
    display:flex
    width:100%
    height:100px
    line-height:100px
    .nav-item
      flex:1
      text-align:center
      border-bottom:1px solid rgba(7,17,27,0.5)
      &.active
        border-color:green
        border-width:3px
      &>a
        display:block
        font-size:45px
        color:rgb(77,85,93)
        &:hover
          color:rgb(240,20,20)
</style>
