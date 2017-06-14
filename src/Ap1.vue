<template>
  <div id="app">
    <v-header></v-header>
    <div class="nav-wrapper">
      <div class="nav-item"   @click="select(0,$event)"><router-link to="/count">{{this.count}}</router-link></div>
      <div class="nav-item"   @click="select(0,$event)"><router-link to="/purpular">{{this.purpular}}</router-link></div>
      <div class="nav-item"   @click="select(0,$event)"><router-link to="/person">{{this.person}}</router-link></div>
    </div>
    <keep-alive>
    <router-view :singlist="singlist"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'
export default {
  data(){
    return {
      song:null,
      count:"总榜",
      purpular:"热门",
      person:'个人',
      singlist:[],
      selectactive:0
    }
  },
  methods:{
    select(type,evet){
      if(!event._constructed){
        return;
      }
      this.selectactive = type;
    }
  },
  components:{
    'v-header':header
  }
}
</script>
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
      &>a
        display:block
        font-size:45px
        color:rgb(77,85,93)
        &:active
          color:rgb(240,20,20)
</style>
