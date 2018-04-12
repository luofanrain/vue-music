<template>
   <div class="header" >
   <div class="header-wrapper">
	<div class="title">{{this.title}}</div>
	<div class="item-wrapper">
		<span class="icon"><img src="./head.png" width=100 height=100></span>
		<span class="person-id">{{this.user.username}}</span>
	</div>
	<div class="background">
		<img src="./header.png" width="100%" height="100%" >
	</div>
	</div>

   </div>
</template>
<script type="text/ecmascript-6">
import {getUser} from "../../common/js/comment.js"
export default {
  props:{
  	user:{
  		type:Object
  	}
  },
  data(){
  	return {
  	//user:(()=>{
    //    	return getUser();
    //  	})(),
  	title:"落凡音乐",
  }
  },
  methods:{
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus"  rel="stylesheet/stylus">
	.header
		font-size:0
		.header-wrapper
			position:relative
			left:0
			top:0
			z-index:-1
			width:100%
			background:rgba(7,17,27,0.1)
			.title
				padding:50px 0 100px 0
				color:#fff
				text-align:center
				font-size:48px
			.item-wrapper
				.icon
					display:inline-block
					vertical-align: middle
					padding:24px 36px 12px 36px
					img
						border-radius:50%
				.person-id
					display:inline-block
					vertical-align: middle
					color:#fff
					font-size:46px
		.background
			position:absolute
			left: 0
			top:0
			z-index:-1
			background-image:url('./header.png')
			background-size:100% 100%;
			width:100%
			height:100%
		


</style>
