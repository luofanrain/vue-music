<template>
		<div	class="count-back">
			<div	class="tools">
					<div	class="tool-nav"	@click="addlist">
						<span	class="icon icon-playon"></span>
						<span	class="title">全播放</span>
					</div>
					<div	class="tool-nav"	@click="download">
						<span	class="icon icon-add"></span>
						<span	class="title">添加</span>
					</div>
					<div	class="tool-nav"	@click="selectshow">
						<span	class="icon icon-qrcode"></span>
						<span	class="title">多选</span>
					</div>
						<div	class="tool-nav">
							<span	class="icon icon-music"></span>
							<span	class="title" @click="listshow">列表</span>
						</div>
			</div>
			<div	class="singer"	ref="singsong">
				<ul>
					<li	class="single"	v-for="(item,index)	in	song"	>
						<div	class="title"	@click="showdetail(item)">{{item.songName}}	<i	class="icon-sq	icon-sq"></i></div>
						<div	class="author"><i	class="icon-check_circle"></i>{{item.singerName}}	</div>
						<div	class="icon">
							<span	v-show="showselect"><input	type="checkbox"	class="select"	name=""	:value="item.id"	></span>
							<span	class="icon-item	icon-playon"	@click="play(item)"></span>
							<span	class="icon-item	icon-add_circle"></span>
							<span	class="icon-item	icon-add1"></i></span>
						</div>
					</li>
				</ul>
				</div>
			<playsong	:sing="sing"	ref="playsongs" v-on:playDetail="playDetail"></playsong>
			<transition	name="asce">
				<div	class="listsong"	v-show="showlist">
					<div	class="title-wrapper">
						<div	class="icon"></div>
						<div	class="title-item"><span	class="title">播放队列</span><span	class="num"	>({{count}})</span></div>
						<div	class="clear"	@click="clear"	>清空</div>
					</div>
						<div	class="listsing"	ref="listitem">
						<ul	class="list-content">
							<li	class="singlesing" v-for="(item,value) in listsong">
								<div	class="title"	@click="play(item)">{{item.songName}}</div>
								<div	class="icon icon-sq"></div>
								<div	class="heng">-</div>
								<div	class="auther">{{item.singerName}}</div>
								<div	class="delete icon-cha" @click="del(item.id)"></div>
							</li>
						<li	class="listnone" v-show="count == 0">当前未添加任何歌曲</li>
						</ul>
					</div>
					<div	class="close"	@click="listshow">关闭</div>
				</div>
			</transition>
			<transition name="fly">
	   			<detail :sing="sing" :listsong="listsong"  ref="detailtime" v-show="detailshow" v-on:showdetails="showdetail" v-on:playd="play"></detail>
			</transition>
			<div class="background" v-show="showlist"></div>
		</div>
</template>

<script	type="text/ecmascript-6">
import	playsong	from	"../playsong/playsong.vue"
import {getSongList} from "../../common/js/comment.js"
import	detail	from	"../detail/detail.vue"
import	BScroll	from	'better-scroll'
import	$	from	'jquery'
const oncetime=100;
export	default	{
	props:{
		change:{
			type:Array
		}
	},
	data(){
		return	{
			song:null,
			showselect:false,
			sing:{songname:"one",singgerName:"two",playtime:oncetime},
			listsong:[],
			showlist:false,
			singlist:[],
			detailshow:false,
			musicCurrentTime:0
		}
	},
	computed:{
		count(){
		return this.listsong.length;
		}
	},
	methods:{
		del(value){
			this.singlist.forEach((item,index)=>{
  			if(item === value){
  				var remove=index;
  				this.singlist.splice(remove,1);
  			}
  			});

  			this.listsong.forEach((item,index)=>{
  			if(item.id === value){
  				var remove=index;
  				this.listsong.splice(remove,1);
  			}
  		});
		},
		showdetail(value){
			if(!this.song){
			   this.detailshow=!this.detailshow;
			   return;
			}
			if(value.songName==this.sing.songName){
				this.sing=value;
				this.sing.currentTime=Math.floor(this.$refs.playsongs.getCurrentTime());	
			}else{
				this.sing=value;
				this.sing.currentTime=0;	
			}
			this.$refs.detailtime.cleartime(this.sing.currentTime,this.sing);
			this.detailshow=!this.detailshow;
		},
		clear(){
			this.listsong=[];
			this.singlist=[];
		},
		listshow(){
			this.showlist=!this.showlist;
			if(this.showlist){
			this.$nextTick(()=>{
               if(!this.listscroll){
               this.listscroll = new BScroll(this.$refs.listitem,{
                  click:true
               });
            }else{
               this.listscroll.refresh();
            }
            });}
		},
		play(value){
			if(value){
			this.sing=value;
			}			
			this.$refs.playsongs.singplay();
		},
		playDetail(){
			this.$refs.detailtime.playDetail();
		},
		selectshow(){
			$(".select").prop("checked",false);	
			this.showselect=!this.showselect;
		},
		addlist(){
			var	ready	=	this;
			ready.singlist=[];
			$.each(this.song,function(index,item){
				ready.singlist.push(item.id)
			});
			this.listsong=this.song;
			this.showselect	=false;
		},
		download(){
			var	ready	=	this;
			var	songlist=$('.select');
			$.each(songlist,function(index,item){
					if(item.checked){
						if(ready.singlist.indexOf(item.defaultValue)==-1){
							ready.singlist.push(item.defaultValue);
						}
					}
			});
			this.change.push(1);
			this.showselect	=	false;
		}
	},
	created(){
		//var	ready	=	this;
		//$.ajax({
		//	type:	"get",
		//	async:	false,
		//	url:	"http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js",
		//	dataType:	"jsonp",
		//	jsonp:	"callback",
		//	jsonpCallback:	"JsonCallback",	
		//	scriptCharset:	'gbk',
		//	success:	function(data)	{
		//		ready.song=$.parseJSON(JSON.stringify(data)).songlist;
		//		ready.sing=ready.song[0];
		//		console.log(data);
		//	},
		//	error:	function()	{
		//		alert('获取api失败');
		//	}
		//});
		var datalist = getSongList();
		this.song=datalist;
		this.sing=this.song[0];
		console.log(this.sing);
		this.$nextTick(()=>{
			this.scroll	=	new	BScroll(this.$refs.singsong,{
								click:true
				});
				this.scroll.hasHorizontalScroll=false;
				this.scroll.hasVerticalScroll=true;
				this.scroll.maxScrollY	=-14000;
				this.scroll.scrollerHeight	=14000;
		});

	},
	watch:{
		change(){
			this.song.forEach(item=>{
				if(this.singlist.indexOf(item.id)> -1){
					this.listsong.push(item);
				}
			});
		}
	},
	components:{
		playsong,
		detail
	}
	};
</script>

<!--	Add	"scoped"	attribute	to	limit	CSS	to	this	component	only	-->
<style	lang="stylus"	rel="stylesheet/stylus">
	@import	'../../common/stylus/border.styl'
	@import	'../../common/stylus/icon.styl'
	.count-back
		.tools
			font-size:0
			display:flex
			margin:30px
			.tool-nav
				flex:80px	0	0	0
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
				padding:30px	0
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
			transition:	all	0.3s	linear
			transform:translateY(0)
		.asce-enter,.asce.leave
			transform:translateY(100%)
		.listsong
			position:fixed
			z-index:5
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
					flex:	0	0	80px
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
				overflow-y:hidden
				max-height:900px
				height:900px
				.list-content
					padding:30px
					.singlesing
						position:relative
						display:flex
						padding:10px 0
						height:50px
						border(rgba(7,17,27,0.3))
						font-size:40px
						overflow-y:hidden
						.title
							flex:0 0 0 80px
							color:#fff
							font-weight:700
						.icon
							flex:0 0 80px 0
							margin:3px	10px
						.heng
							flex:0 80px 0 0	
							color:rgba(7,17,27,0.3)
						.auther
							flex:0	0	0	80px
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
		.fly-enter-active,.fly-leave-active
			transition:all 0.3s linear
			transform:translate3d(0,0,0)
		.fly-enter,fly-leave
			transform:translate3d(100%,0,0)
		.background
			position:fixed
			left:0
			top:0
			z-index:4
			width:100%
			height:100%
			background:#272727
			opacity:0.5
</style>
