<template>
  <div class="comment">
  		<div class="comment-list"  ref="list">
	  		<ul >
	  			<li class="comment-hot" v-for=" (item,index,value) in commentlist" >
	  				<div class="title-icon icon-contact"></div>
	  				<div class="comment-item">
	  					<div class="user">{{item.username}}</div>
	  					<div class="date">{{item.createTime}}</div>
	  					<div class="text"><i class="icon-hot hot" v-show="value <3"></i>{{item.ratting}}</div>
	  				</div>
	  				<div class="icon ding icon-fabulous" :class="{'active':item.status}" @click="addding($event,item.id,index,item.status)"><span class="number">{{item.praise}}</span></div>
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
import {changePraise} from "../../common/js/comment.js"
import {getUser} from "../../common/js/comment.js"
import $ from "jquery"
const name=Math.floor(Math.random()*100000);
export default {
  props:{
  	food:{
  		type:Object
  	},
  	user:{
  		type:Object
  	}
  },
  data(){
  	return {
  		showcolor:false,
  		listcomment:null,
  		text:"",
      	//user:(()=>{
        //	return getUser();
      	//})(),
      	content:[]
  		//content:(()=>{
  			//return loadcomment(this.user.username);
  		//	console.log(this.showcolor);
  		//	return loadcomment('游客79691180');
  		//})()
  	}
  },
  computed:{
  		commentlist(){
  			this.content=loadcomment(this.user.username);
  			let list = this.content;
  			this.listcomment=list;
  			//console.log(list);
  			//console.log(this.content);
  			return list;
  		}
  },
  methods:{
  	addding(e,id,value,status){
  		let li = e.currentTarget;
  		console.log(e,id,value);
  		let tmp = {};
  		tmp.user_id = this.user.id;
  		tmp.ratting_id = id;
  		console.log(li.style.color);
  		console.log(11)
  		if(status== 1)
  		{	this.commentlist[value]['status']=0;
  			li.style.color="#8a8a8a";
  			this.listcomment[value]['praise'] -=1;
  			tmp.status = 1;
  		}else{
  			this.commentlist[value]['status']=1;
  			li.style.color='red';  		
  			this.listcomment[value]['praise'] =parseInt(this.listcomment[value]['praise'])+1;
  			tmp.status=0;
		}
		//let tmp = JSON.stringify(this.listcomment[value]);
		changePraise(tmp);
  	},
  	addcomment(){

  		let tmp = {};
  		let ding=0;
  		tmp.username = this.user.username;
  		tmp.ratting =  this.text;
  		savecomment(tmp);
  		this.commentlist.push(tmp);
  		this.text="";
  		//console.log(this.content);
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
