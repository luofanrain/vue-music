


<template>
   <div class="playsong">
   		<div class="icon icon-cd"></div>
   		<div class="message" >
   			<div class="singName">{{sing.songName}}</div>
   			<div class="auther">{{sing.singerName}}</div>
   		</div>
   		<div class="play icon-playon" @click="singplay" v-show="!playshow"></div>
   		<div class="play icon-stop-a" @click="singplay"  v-show="playshow"></div>
   		  <video class="music" style="width:0;height:0" autoplay="autoplay">
		    <source :src="singurl" type="video/mp4">
		  </video>
  	 </div>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery'
export default {
  props:{
  	sing:{
  		type:Object
  		}
  	},
  data(){
  	return {
  		playshow:false,
  		singurl:""
  	}
  },
  methods:{
  	singplay(){
  		var mymusic=document.querySelector('.music');
  		if (mymusic.paused) 
		  {mymusic.play(); 
		   this.playshow=true;
		}
		else {
		  mymusic.pause(); 
		  this.playshow=false;
		}
  	}
  },
  watch:{
  	sing(){
  		var mymusic=document.querySelector('.music');
  		mymusic.load();
  		let start ="http://ws.stream.qqmusic.qq.com/";
  		let end = ".m4a?fromtag=46";
  		this.singurl=start+this.sing.id+end;
  		this.playshow=true;
  	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus"  rel="stylesheet/stylus">
	@import '../../common/stylus/icon.styl'
	.playsong
		position:fixed
		left:0
		bottom:0
		background:#fff
		height:90px
		width:100%
		padding:30px 30px 0px 30px
		font-size:0
		.icon
			display:inline-block
			vertical-align:middle
			font-size:80px
			color:rgba(7,17,27,0.5)
		.message
			display:inline-block
			vertical-align:middle
			font-size:30px
			margin-left:30px
			.singName
				font-weight:700
			.auther
				color:rgba(7,17,27,0.8)
				margin:10px 0
		.play
			position:absolute
			right:20%
			width:50px
			height:50px
			top:20px
			font-size:80px

</style>
