<template>
   <div class="detail" >
   			<div class="singname">
   				<div class="title">{{sing.songName}}</div>
   				<div class="icon icon-enter" @click="slice"></div>
   			</div>
   			<div class="auther">
   				<span>——</span>
   				<span>{{sing.singerName}}</span>
   				<span>——</span>
   			</div>
   			<div class="state">
   				<span class="icon-normal iconjurge"></span>
   				<span class="icon icon-sq"></span>
   				<span class="iconjurge icon-dujia"></span>
   			</div>
   			<div class="cd">
   				<div class="midcd"></div>
   			</div>
   			<div class="lyric"><p class="heng"><span class="word">未找到歌词</span></p></div>
   			<div class="speed">
				<div class="startime">{{changetime(this.currenttime)}}</div>
	   			<div class="speed-item">
	   				<div class="progress"></div>
	   			</div>
	   			<div class="endtime" >{{changetime(sing.playtime)}}</div>
   			</div>
   			<div class="singcart">
   				<span class="icon icon-upper" @click="playupper"></span>
   				<span class="jurgeicon icon-playon" v-show="showplay" @click="play"></span>
   				<span class="jurgeicon icon-stop-a" v-show="!showplay" @click="play"></span>
   				<span class="icon icon-next" @click="playnext"></span>
   			</div>

   </div>
</template>

<script type="text/ecmascript-6">
import $ from "jquery"
const nonetime=0;
export default {
	props:{
		sing:{
			type:Object
		},
		listsong:{
			type:Array
		}
	},
	data(){
		return {
			song:this.sing,
			showplay:false,
			currenttime:this.sing.currentTime,
			fun:null,
			timer:null,
			code:0
			
		}
	},
	methods:{
		slice(){
			this.$emit("showdetails",this.song);
		},
		playDetail(){
			this.play()
		},
		play(){
			this.showplay=!this.showplay;
			if(this.showplay){
				clearInterval(this.timer);
				this.timer="";
			}
			else{
				if(!this.timer){
					this.timer=setInterval(this.fun,1000);
				}
			}
			this.$emit("playd");
		},
		changetime(value){
			let tmptime=0;
			let minute=Math.floor(value/60);
			let second = value%60;
			if(second <10)
			{
				second="0"+second;
			}
			tmptime = minute+":"+second;
			return tmptime;
		},
		playupper(){
			var length=this.listsong.length;			
			if(length<=1){
				return;
			}
			this.cleartime();
			for(let i=0;i<length;i++){
				if(this.song.id===this.listsong[i].id){
					if(!i){
						this.song=this.listsong[length-1];
					}else{
						this.song=this.listsong[i-1];
					}
					this.$emit("playd",this.song);
					return;
				}
			}
		},
		cleartime(time=0,sing={}){
			clearInterval(this.timer);
			this.timer="";
			this.currenttime=time;
			if(!this.showplay){
				this.timer=setInterval(this.fun,1000);
				return;
			}
			this.play();
			//this.timer=setInterval(this.fun,1000);
		},
		playnext(){
			var length=this.listsong.length||0;
			if(length<=1){
				return;
			}
			this.cleartime();
			for(let i=0;i<length;i++){
				if(this.song.id===this.listsong[i].id){
					if(i===length-1){
						this.song=this.listsong[0];
					}else{
						this.song=this.listsong[i+1];
					}
					console.log(this.song);
					console.log(this.listsong);
					this.$emit("playd",this.song);
					return;
				}
			}
		}
	},
	beforeMount:function(){
		let ready = this;
		let nonetime=0;
		this.fun = function (){
			try{
				ready.currenttime +=1;
				let progress = document.querySelector(".progress");
				progress.style.width=Math.floor(ready.currenttime/ready.sing.playtime*100)+'%';			
				if(ready.currenttime >ready.song.playtime){
					ready.currenttime =nonetime;
					var length=ready.listsong.length||0;
					if(length<=1){
						ready.playDetail()
						progress.style.width='0%';
					}
					ready.playnext();
				}
				this.timer=setInterval(this.fun,1000);
			}catch(err){				
				//console.log(err);
			}
		}
	},
	watch:{
		sing(){	
			console.log(this.sing);		
			this.song=this.sing;
			document.querySelector(".progress").style.width=0;
			//this.timer=setInterval(this.fun,1000);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus"  rel="stylesheet/stylus">
		@import "../../common/stylus/icon.styl"
		.detail
			position:fixed
			left:0
			top:0
			width:100%
			height:100%
			background:#272727
			z-index:6
			font-size:0
			.singname
				margin-top:50px
				font-size:48px
				text-align:center
				width:100%
				.icon
					position:absolute
					right:100px
					top:50px
					color:#ca8eff

				.title
					text-align:center
					color:#fff
			.auther
				color:#fff
				font-size:32px
				text-align:center
				padding:50px 0
			.state
				text-align:center
				color:#33ff99
				.icon
					display:inline-block
					vertical-align:middle
					margin:10px 20px 0 20px
					font-size:60px
				.iconjurge
					display:inline-block
					vertical-align:top
					font-size:80px
			.cd
				margin-left:25%
				margin-top:10%
				width:300px
				height:300px
				border-radius:50%
				border:1px solid #33ff99
				background: #272727
				padding:10%
				.midcd
					width:100px
					height:100px
					border-radius:50%
					border:1px solid #33ff99
					line-height:300px
					margin:33%
			.lyric
				color:#fff
				font-size:48px
				text-align:center
				width:800px
				height:50px
				margin:10% 0 10% 25%
				overflow:hidden
				.heng
					width:500px
					.word
						overflow:hidden
						animation:slide 7s infinite
						animation-timing-function:linear
						animation-delay:0
						text-overflow:clip
						@keyframes slide
							from {margin-left:100% }
							to {margin-left:-150%}

			.speed
				margin:10% 10px 10% 70px
				position:relative
				top:5%
				.startime
					position:absolute
					top:0px
					margin-top:-25px
					width:100px
					color:orange
					font-size:48px
				.endtime
					position:absolute
					top:0px
					right:50px
					margin-top:-25px
					width:100px
					color:orange
					font-size:48px
				.speed-item
					width:65%
					position:relative
					border:1px solid gray
					left:130px
					top:-3px
					height:10px
					.progress
						position:relative
						height:10px
						background:#33ff99
						width:0
			.singcart
				position:relative
				top:9%
				left:0
				text-align:center
				font-size:0
				.icon
					color:#33ff99
					font-size:100px
				.jurgeicon
					display:inline-block
					vertical-align:top
					margin:-50px 70px 0 50px
					font-size:200px



</style>
