<template>
   <div class="count-back">
   		<div class="tools">
   			<div class="tool-nav" @click="addlist">
   				<span class="icon icon-playon"></span>
   				<span class="title">全播放</span>
   			</div>
   			<div class="tool-nav" @click="download">
   				<span class="icon icon-download"></span>
   				<span class="title">下载</span>
   			</div>
	        <div class="tool-nav" @click="selectshow">
	          <span class="icon icon-qrcode"></span>
	          <span class="title">多选</span>
	        </div>
	        	<div class="tool-nav">
	   				<span class="icon icon-music"></span>1
	   				<span class="title">列表</span>
	   			</div>
   		</div>
   		<div class="singer" ref="singsong">
   		<ul>
   			<li class="single" v-for="(item,index) in song"  >
   				<div class="title" >{{item.songName}} <i class="icon-sq icon-sq"></i></div>
   				<div class="author"><i class="icon-check_circle"></i>{{item.singerName}} </div>
   				<div class="icon">
   					<span v-show="showselect"><input type="checkbox" class="select" name="" :value="item.id" ></span>
   					<span class="icon-item icon-playon" @click="play(item)"></span>
   					<span class="icon-item icon-add_circle"></span>
   					<span class="icon-item icon-download"></i></span>
   				</div>
   			</li>
   		</ul>
   		</div>
   		<playsong :sing="sing" ref="playsongs"></playsong>
      <transition name="asce">
      <div class="listsong" >
        <div class="title-wrapper">
          <div class="icon"></div>
          <div class="title-item"><span class="title">播放队列</span><span class="num" ></span></div>
          <div class="clear"   >清空</div>
        </div>
         <div class="listsing" ref="listitem">
          <ul class="list-content">
            <li  class="singlesing">
              <div class="title" @click="play(item)"></div>
              <div class="icon icon-sq"></div>
              <div class="heng">-</div>
              <div class="auther"></div>
              <div class="delete icon-cha" ></div>
            </li>
          <li class="listnone">当前未添加任何歌曲</li>
          </ul>
       </div>
        <div class="close" >关闭</div>
      </div>
      </transition>
   </div>
</template>

<script type="text/ecmascript-6">
import playsong from "../playsong/playsong.vue"
import BScroll from 'better-scroll'
import $ from  'jquery'
export default {
  props:{
    singlist:{
      type:Array
    }
  },
  data(){
  	return {
  		song:null,
  		showselect:false,
  		sing:{songname:"one",singgerName:"two"}
  	}
  },
  methods:{
  	play(value){
  		this.sing=value;
      this.$refs.playsongs.singplay();
  	},
    selectshow(){
      $(".select").prop("checked",false); 
      this.showselect=!this.showselect;
    },
    addlist(){
      var ready = this;
      var songlist=$('.select');
      $.each(songlist,function(){
           if(ready.singlist.indexOf(this.value) < 0){
              ready.singlist.push(this.value);
           }
      });
      this.showselect =false;
    },
    download(){
      var ready = this;
      var songlist=$('.select');
      $.each(songlist,function(){
         if(this.checked){
           if(ready.singlist.indexOf(this.value) < 0){
              ready.singlist.push(this.value);
           }
         }
      });
      this.showselect = false;
    }
  },
  created(){
  	var ready = this;
    $.ajax({
    type: "get",
    async: false,
    url: "http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js",
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "JsonCallback", 
    scriptCharset: 'gbk',
    success: function(data) {
      ready.song=$.parseJSON(JSON.stringify(data)).songlist;
      ready.sing=ready.song[0];
      console.log(ready.sing);
    },
    error: function() {
      alert('获取api失败');
    }
  });
  	 this.$nextTick(()=>{
    	 this.scroll = new BScroll(this.$refs.singsong,{
                  click:true
         });
         this.scroll.hasHorizontalScroll=false;
         this.scroll.hasVerticalScroll=true;
         this.scroll.maxScrollY =-14000;
         this.scroll.scrollerHeight =14000;
    });
},
components:{
	playsong
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus"  rel="stylesheet/stylus">
	@import '../../common/stylus/border.styl'
	@import '../../common/stylus/icon.styl'
	.count-back
		position:absolute
		z-index:0
		left:0
		top:420px
		width:100%
		paading-bottom:48px
		overflow:hidden
		.tools
			font-size:0
			display:flex
			margin:30px
			.tool-nav
				flex:80px 0 0 0
				width:80px
				font-size:48px
				width:100%
				.icon
					color:green
				.title
					color:#000
		.singer
			font-size:0
			height:1090px
			overflow:hidden
			.single
				height:90px
				position:relative
				z-index:-10
				display:block
				padding:30px 0
				width:100%
				border(rgba(7,17,27,0.3))
				&:last-child
					border-none()
				.select
					border-radius:50%
					width:40px
					height:40px
				.title
					margin-left:30px
					color:#000
					font-size:40px
					font-weight:700
				.author
					margin-left:30px
					margin-top:10px
					font-size:36px
					color:gray
				.icon
					position:absolute
					top:30%
					right:10%
					font-size:48px
    .asce-enter-active,.asce-leave-active
      transition: all 0.3s linear
      transform:translateY(0)
    .asce-enter,.asce.leave
      transform:translateY(100%)
    .listsong
      position:absolute
      z-index:3
      left:0
      bottom:0
      width:100%
      background:#473C8B
      opacity:0.9
      overflow:hidden
      .title-wrapper
        position:relative
        left:0
        top:0
        display:flex
        align-items:center
        justify-content:center
        font-size:40px
        padding:30px
        border(rgb(255,255,255))
        .icon
          flex: 0 0 80px
          width:20%
        .title-item
          .title
            width:600px
            color:#fff
          .num
            color:red
        .clear
          position:absolute
          right:50px
          top:30px
          color:#838B8B
      .listsing
        font-size:48px
        height:100%
        overflow:hidden
        .list-content
          max-height:900px
          min-height:900px
          padding:30px
          .singlesing
            position:relative
            display:flex
            padding:10px 0
            border(rgba(7,17,27,0.3))
            font-size:40px
            .title
              flex:0 0 0 80px
              color:#fff
              font-weight:700
            .icon
              flex:0 0  80px 0
              margin:3px 10px
            .heng
              flex:0 80px 0 0 
              color:rgba(7,17,27,0.3)
            .auther
              flex:0 0 0 80px
              colro:rgb(7,17,27)
            .delete
              position:absolute
              right:6.9%
              top:16%
              font-size:40px
              color:red
          .listnone
            text-align:center
            color:orange
      .close
        position:absolute
        left:0
        bottom:0
        height:100px
        line-height:100px
        text-align:center
        color:#fff
        background:orange
        opacity:0.8
        font-size:48px
        width:100%
        border(rgb(255,255,255))
</style>
