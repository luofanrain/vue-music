<template>
	<div class="div_cont">
		<div class='div_row' v-show="showbtn"><span class="div_value div_btn" @click="update" >保存</span></div>
		<div class='div_row' @click="hidebtn"><span class="div_filed">昵称</span><span class="div_value">
		<input type="text"  onkeyup="this.value=this.value.replace(/[^\w(\u4e00-\u9fa5)]/g,'')" maxLength="20" id="username" readonly v-model="user.username" onfocus="this.style.textAlign='right'">
		</span></div>
		<div class='div_row' @click="hidebtn"><span class="div_filed">年龄</span><span class="div_value"><input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" maxLength="3" id="age" v-model="user.age"></span></div>
		<div class='div_row' @click="hidebtn"><span class="div_filed">性别</span><span class="div_value"><input type="text" onkeyup="this.value=this.value.replace(/[^\u7537\u5973]/g,'')" maxLenth="1" id="sex" v-model="user.sex"></span></div>
		<div class='div_row' @click="hidebtn"><span class="div_filed">所在地</span><span class="div_value"><input type="text"  maxLength="50" id="address"  v-model="user.address"></span></div>
		<div class='div_row' @click="hidebtn"><span class="div_filed">个性签名</span><span class="div_value"><input type="text" maxLength="20" id="autograph"   v-model="user.autograph"></span></div>
		<div class='div_row' @click="hidebtn"><span class="div_filed">人生目标</span><span class="div_value"><input maxLength="20" type="text" id="personTarget" v-model="user.personTarget"></span></div>
		<div class='div_row' @click="hidebtn"><span class="div_filed">自我介绍</span></div>
		<div class='div_row' @click="hidebtn"><textarea class="person_text" id="personResume" v-model="user.personResume"></textarea></div>
	</div>
</template>

<script type="text/ecmascript-6">

import {getUser} from "../../common/js/comment.js"
import {updateUser} from "../../common/js/comment.js"
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
	    showbtn:false
  	}
  },
  methods:{
  	update(){
  		updateUser(this.user);
  		this.showbtn=false;
  	},
  	hidebtn(){
  		this.showbtn=true;
  	}

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus"  rel="stylesheet/stylus">
.div_cont
	box-sizing:border-box
	font-size:48px
	padding:40px
	.div_row
		height:100px
		line-height:100px
		width:100%
	.div_filed
		color:#000
		float:left
	.div_value
		color:gray
		float:right
		font-size:36px
		margin-right:70px
	.div_value>input
		box-sizing:border-box
		padding-left:15px			
		color:gray
		height:60px
		text-align:right
	.div_value>input:focus
		text-align:left
	.div_btn
		color:#fff
		background-color:#1e87f0
		width:200px
		height:80px
		line-height:80px
		text-align:center
	.person_text
		box-sizing:border-box
		margin-top:20px
		height:400px
		color:gray
		width:95%
		border:1px solid gray;
		font-size:48px
		padding:20px
</style>
