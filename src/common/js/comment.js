export function savecomment(str,id){
	 let comment = window.localStorage.comment;
	 if(!comment){
		 comment={};
	}else{
		comment=JSON.parse(comment);
	}
	 comment[id]=str;
	 let tmp =JSON.stringify(comment);
	 window.localStorage.comment = tmp;
}

export function loadcomment(){
	let comment = window.localStorage.comment;
	if(!comment){
		return {};
	}
	let tmp = comment;
	return tmp;
}