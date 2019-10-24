"use strict";
var auth = auth || {};
auth =(()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
   let _, js, vue;
   let init =()=> {
       _ = $.ctx();
       js = $.js();
       vue = js + '/vue/auth_vue.js'
   }
   let onCreate =()=> {
       init();
       $.getScript(vue).done(()=>{
    	   setContentView()
    	  $('#a_go_join').click(e=>{
         		e.preventDefault()
         		$('head').html(auth_vue.join_head())
              $('body').html(auth_vue.join_body())
                  $('<button>',{
                	  text : '회원가입',
                      href : '#',
                      click: e=>{
                    	  e.preventDefault()       
                    	  let data = {aid : $('#userid').val(), pwd : $('#password').val(), cname: $('#cname').val()}
  		            	existId(data);
		            }
		        })
		        .addClass('btn btn-primary btn-lg btn-block')
		        .appendTo('#btn_join')
    	  })
       }).fail(()=>{alert(WHEN_ERR)})
       }
       let setContentView =()=>{
    	   login()
       }
       let join =data=>{
           alert('전송아이디: '+data.aid)
           $.ajax({
               url : _+'/user/',
               type : 'POST',
               dataType : 'json',
               data : JSON.stringify(data),
               contentType : 'application/json',
               success : d => {
                   alert('AJAX 성공 아이디'+d.msg);
                   if(d.msg ==='SUCCESS')
                   login()
                   else
                	   alert('회원가입 실패')
               },
                	error : e => {
                    alert('AJAX 실패');
                	}
                  })
}
       let existId =data=>{
    	   
    	   $.ajax({
    		  type : 'GET',
         	  url : _+'/user/'+data.aid+'/exist',
         	  contentType : 'application/json',
         	  success : d =>{
         		 if(d.msg==='SUCCESS'){
         			 alert('사용 가능 아이디' +d.msg)
         			 join(data)
         			 return true;
         		 }else{
         			alert('아이디 중복')
         			return false;         		}
         		},
         		error : e =>{
         			alert('exist AJAX 실패')
         			return false;
         		}
    	   })
       }
      let login =()=>{
          let x =  {css: $.css(), img: $.img(), js :$.js()}
          $('head').html(auth_vue.login_head(x))
          $('body').addClass('text-center')
          .html(auth_vue.login_body(x))
          $('<button>',{
   			text:"Sign in",
   			type:"submit",
   			click: e =>{
   				e.preventDefault();
               let data = {aid : $('#userid').val(), pwd : $('#pwd').val()}
               alert(data.aid)
                	$.ajax({
                		url : _+'/user/' + data.aid+'/login',
                		type : 'POST',
                		dataType : 'json',
                		data : JSON.stringify(data),
                		contentType : 'application/json',
                		success : d => {
                           alert(d.cname+'님 환영합니다.')
                           mypage(d)
                       },
                       error : e => {
                           alert('AJAX 실패');
                       }
                	})
			}
		}).addClass("btn btn-lg btn-primary btn-block")
		.appendTo('#btn_login')
      }
      let mypage =d=>{
    	  let x = {css : $.css(), img : $.img(), js:$.js(), resultData: d}
    	  $('head').html(auth_vue.mypage_head(x))
          $('body').html(auth_vue.mypage_body(x))
      }
   return{onCreate, join, login, mypage}
})();