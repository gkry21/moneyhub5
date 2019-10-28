"use strict";
var auth = auth || {};
auth =(()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
   let _, js, vue,brd_js,router_js;
   let init =()=> {
       _ = $.ctx();
       js = $.js();
       vue = js + '/vue/auth_vue.js'
       brd_js = js+'/brd/brd.js'
       router_js = js +'/cmm/router.js'
   }
   let onCreate =()=> {
       init();
       $.when($.getScript(vue),
    		   $.getScript(router_js))
       .done(()=>{
    	   setContentView()
    	  $('#a_go_join').click(e=>{
         	e.preventDefault()
         	$('head').html(auth_vue.join_head())
            $('body').addClass('text-center')
            .html(auth_vue.join_body())
            $('#aid').keyup(()=>{
             if($('#aid').val().length > 2){
            	 $.ajax({
            		url : _+'/user/'+$('#aid').val()+'/exist',
            		contentType : 'application/json',
            		success : d => {
            			alert('AJAX 성공 아이디'+d.msg);
            			if(d.msg ==='SUCCESS')
            				$('#existid')
            				.val('사용가능한 아이디')
            				.css('color','blue')
            			else
            				$('#existid')
                			.val('아이디 중복입니다.')
                			.css('color','red')
              },
               	error : e => {
                   alert('AJAX 실패');
               	}
                 })
            	}
            });
            $('<button>',{
                	  text : '회원가입',
                      href : '#',
                      click: e=>{
                    	  e.preventDefault()       
  		            	join();
		            }
		        })
		        .addClass('btn btn-primary btn-lg btn-block')
		        .appendTo('#btn_join')
    	  })
       }).fail(()=>{alert(WHEN_ERR)})
       }
       let setContentView =()=>{
    	   $('head').html(auth_vue.login_head({css: $.css(), img: $.img(),  js: $.js()}))
           $('body').addClass('text-center')
           .html(auth_vue.login_body({css: $.css(), img: $.img(),  js: $.js()}))
   		login()
       }
       let join =()=>{
//    	   init()
    	   let data = {aid : $('#aid').val(), pwd : $('#pwd').val(), cname : $('#cname').val()}
           $.ajax({
               url : _+'/user/',
               type : 'POST', //REST(상태)에 대한 타입,CRUD
               dataType : 'json', //언어타입
               data : JSON.stringify(data), //[] = json
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
//                  .addClass('btn btn-primary btn-lg btn-block')
//  		        .appendTo('#btn_join')  
}
//       let existId =data=>{
//    	   $.ajax({
//    		  type : 'GET',
//         	  url : _+'/user/'+data.aid+'/exist',
//         	  contentType : 'application/json',
//         	  success : d =>{
//         		 if(d.msg==='SUCCESS'){
//         			 alert('사용 가능 아이디' +d.msg)
//         			 join(data)
//         			 return true;
//         		 }else{
//         			alert('아이디 중복')
//         			return false;         		}
//         		},
//         		error : e =>{
//         			alert('exist AJAX 실패')
//         			return false;
//         		}
//    	   })
//       }
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
               let data = {aid : $('#aid').val(), pwd : $('#pwd').val()}
               alert(data.aid)
                	$.ajax({
                		url : _+'/user/' + data.aid+'/login',
                		type : 'POST',
                		dataType : 'json',
                		data : JSON.stringify(data),
                		contentType : 'application/json',
                		success : d => {
                			$.when(
                			$.getScript(router_js,()=>{$.extend(new User(d))})
                			).done(()=>{brd.onCreate()}		
                			).fail(()=>{alert('WHEN DONE 실패')
                			})
                       },
                       error : e => {
                           alert('AJAX 실패');
                       }
                	})
			}
		}).addClass("btn btn-lg btn-primary btn-block")
		.appendTo('#btn_login')
      }
//      let mypage =d=>{
//    	  let x = {css : $.css(), img : $.img(), js:$.js(), resultData: d}
//    	  $('head').html(auth_vue.mypage_head(x))
//          $('body').html(auth_vue.mypage_body(x))
//      }
   return{onCreate, join, login}
})();