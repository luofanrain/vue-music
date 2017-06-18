<template>
  <div class="comment">
  		<div class="comment-list"  ref="list">
	  		<ul >
	  			<li class="comment-hot" v-for=" (item,index,value) in commentlist" >
	  				<div class="title-icon icon-contact"></div>
	  				<div class="comment-item">
	  					<div class="user">{{index}}</div>
	  					<div class="date">{{item.time}}</div>
	  					<div class="text"><i class="icon-hot hot" v-show="value <3"></i>{{item.content}}</div>
	  				</div>
	  				<div class="icon ding icon-fabulous" :class="{'active':showcolor}" @click="addding($event,index)"><span class="number">{{item.ding}}</span></div>
	  			</li>
	  		</ul>
  		</div>
  		<div class="message">
  			<span class="title-icon icon-contact"></span>
  			<textarea class="value" v-model="text"></textarea>
  			<input type="button" name="" value="评论" @click="addcomment()" class="btn">
  		</div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll"
import {loadcomment} from "../../common/js/comment.js"
import {savecomment} from "../../common/js/comment.js"
import $ from "jquery"
const name=Math.floor(Math.random()*100000);
export default {
  props:{
  	food:{
  		type:Object
  	}
  },
  data(){
  	return {
  		content:(()=>{
  			return loadcomment();
  		})(),
  		showcolor:false,
  		listcomment:null,
  		text:""
  	}
  },
  computed:{
  		commentlist(){
  			let list = JSON.parse(this.content);
  			$.each(list,function(index,value){
  				list[index]={};
  				list[index]=eval("("+value+")");
  			});
  			console.log(list);
  			this.listcomment=list;
  			return list;
  		}
  },
  methods:{
  	addding(e,value){
  		//this.showcolor=!this.showcolor;
  		let li = e.currentTarget;
  		if(li.style.color=="red")
  		{
  			li.style.color="#8a8a8a";
  			this.listcomment[value]['ding']-=1;
  		}else{
  			li.style.color='red';
  			this.listcomment[value]['ding']+=1;
		}
		let tmp = JSON.stringify(this.listcomment[value]);
		savecomment(tmp,value);
  	},
  	addcomment(){

  		let today=new Date();
  		let time = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
  		let ding=0;
  		let str = "{"+"'time':'"+time+"','content':'"+this.text+"','ding':"+ding+"}";
  		savecomment(str,name);
  		this.text="";
  		console.log(this.content);
  	}
  },
  mounted(){
  	this.$nextTick(()=>{
	   if(!this.listscroll){
		   this.listscroll = new BScroll(this.$refs.list,{
				click:true
			});
		}else{
		   this.listscroll.refresh();
		}
	});
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","php");
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","luofan");
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","xinyue");
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","joker");
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","luochuanyuewu");
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","jiushini");
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","我喜欢你");
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","爱你一万年");
	savecomment("{'time':'2017-12-18','content':'落凡音乐，良心商家，不打广告，不骗玩家，歌曲种类齐全，是我们居家必备歌库，顶一个','ding':0}","时间无限");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus"  rel="stylesheet/stylus">
	@import "../../common/stylus/icon.styl"
	@import "../../common/stylus/border.styl"
	.comment
		.comment-list
			font-size:0
			height:1200px
			overflow:hidden
			.comment-hot
				position:relative
				box-sizing:border-box
				padding:30px 0 10px 30px
				display:flex
				overflow:visible
				border(rgba(7,17,27,0.7))
				&:last-child
					border-none()
				.title-icon
					margin:0 10px 10px 10px
					flex:80px 0 0
					height:50px
					font-size:64px
				.comment-item
					flex:70% 0 0
					min-height:150px
					.user
						font-size:30px
						color:rgba(7,17,27,0.5)
						font-weight:700
						min-height:50px
					.date
						color:rgba(7,17,27,0.5)
						font-size:30px
						margin-bottom:10px
					.text
						color:rgb(77,85,93)
						font-size:30px
						line-height:40px
						min-height:100px
						word-wrap:break-word;
						word-break:break-all;
						.hot
							font-size:48px
				.icon
					position:absolute
					top:24px
					right:30px
					color: #8a8a8a
					font-size:36px
					&.active
						color:red
					.number
						font-size:24px
						color:red
		.message
			position:fixed
			left:0
			bottom:0px
			height:100px
			width:100%
			box-sizing:border-box
			padding:20px 20px 20px 40px
			font-size:30px
			background:#e1e5e8
			.title-icon
				display:inline-block
				vertical-align:top
				font-size:64px
			.value
				display:inline-block
				vertical-align:top
				height:60px
				width:75%
				font-size:36px
				line-height:50px
				word-wrap:break-word
				word-break:break-all
				border:1px solid red
				margin:0 20px
			.btn
				height:60px
				width:100px
				background:#2c66ec
				border-radius:15%

</style>
