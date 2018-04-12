// let apiURL = 'https://bird.ioliu.cn/v2/?url=http://120.76.114.166:82/music/';
let apiURL = 'http://http://120.76.114.166:82/music/';
export function savecomment(data){
	//  let comment = window.localStorage.comment;
	//  if(!comment){
	// 	 comment={};
	// }else{
	// 	comment=JSON.parse(comment);
	// }
	//  comment[id]=str;
	//  let tmp =JSON.stringify(comment);
	//  window.localStorage.comment = tmp;
	let url = apiURL+'insert_ratting.php';
	
	$.ajax({  
        url: url,  
        async:false,  
        type:'POST',
        data:data,
        success: function (res) {  
            // console.log(res);  
            //tmp = JSON.parse(res).data;  
        }  
    });  
}

export function loadcomment(username){
	// let comment = window.localStorage.comment;
	// if(!comment){
	// 	return {};
	// }
	// let tmp = comment;
	// return tmp;
	let url =  apiURL+'list_ratting.php?username='+username;
	var tmp;
	$.ajax({  
        url: url,  
        async:false,  
        type:'get',
        success: function (res) {  
            // console.log(res);  
            tmp = JSON.parse(res).data;  
        }  
    });  
	// $.get(url).then(function(res){
	// 	tmp = JSON.parse(res).data;
	// })
	return tmp;
}
export function getUser(){
    let url = apiURL+'check_ip.php';
	// let url = 'http://www.luofanrain.club:82/music/check_ip.php';
	let tmp;
	$.ajax({  
        url: url,  
        async:false,  
        type:'get',
        success: function (res) { 
        	console.log(res); 
            tmp = JSON.parse(res); 
            //console.log(tmp); 
        }  
    });  
    console.log(tmp);
    return tmp;

	
}
export function getSongList(){
    let url = apiURL+'fileApi.php';
    let tmp;
    $.ajax({  
        url: url,  
        async:false,  
        type:'get',
        success: function (res) { 
            // console.log(res); 
            tmp = JSON.parse(res); 
            console.log(typeof(tmp)); 
        }  
    });  
    console.log(tmp);
    return tmp;

    
}
export function changePraise(data){
	let url = apiURL+'add_praise.php';
	// $.get(url).then(function(res){
	// 	return res;
	// })
	$.ajax({  
        url: url,  
        async:false,  
        type:'post',
        data:data,
        success: function (res) {  
    		console.log(res); 
        }  
    });  
   // return tmp;

	
}
export function updateUser(data){
	let url = apiURL+'alter_user.php';
	// $.get(url).then(function(res){
	// 	return res;
	// })
	$.ajax({  
        url: url,  
        async:false,  
        type:'post',
        data:data,
        success: function (res) {  
    		console.log(res); 
        }  
    });  
   // return tmp;

	
}