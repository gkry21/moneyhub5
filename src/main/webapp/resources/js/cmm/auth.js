"use strict";
var auth = auth || {};
auth =(()=>{
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
         		join()
    	  })
       }).fail(()=>{alert(WHEN_ERR)})
       }
       let setContentView =()=>{
    	   login()
       }
       let join =()=>{
    	   $.getScript(vue)
           $('head')
           	.html(auth_vue.join_head())
              $('body')
              	.html(auth_vue.join_body())
                  $('<button>',{
                      text: 'Continue to checkout',
                      href: '#',
                      click : e=>{
                          e.preventDefault();
           let data = {aid : $('#userid').val(), pwd : $('#password').val(), cname: $('#cname').val()}
           alert('전송아이디: '+data.aid)
           $.ajax({
               url : _+'/user/join',
               type : 'POST',
               dataType : 'json',
               data : JSON.stringify(data),
               contentType : 'application/json',
               success : d => {
                   alert('AJAX 성공 아이디'+d.aid+', 성공 비번: '+d.pwd);
                   login()
               },
                	error : e => {
                    alert('AJAX 실패');
                	}
                  })
          }
   }).addClass('btn btn-primary btn-lg btn-block')
     .appendTo('#btn_join')
}
      let login =()=>{
          let x =  {css: $.css(), img: $.img(), js :$.js}
          $('head').html(auth_vue.login_head(x))
          $('body').addClass('text-center')
          .html(auth_vue.login_body(x))
          $('<button>',{
   			text:"Sign in",
   			href:"#",
   			click: e =>{e.preventDefault();
                let data = {aid : $('#aid').val(), pwd : $('#pwd').val()}
                alert('전송아이디: '+data.aid)
                $.ajax({
                     url : _+'/user/login',
                     type : 'POST',
                     dataType : 'json',
                     data : JSON.stringify(data),
                     contentType : 'application/json',
                     success : d => {
                           alert(d.cname+'님 환영합니다.');
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
    	  let x = {css:$.css(), img: $.img(),js: $.js, aid:d.aid}
    	  $('head').html(auth_vue.mypage_head(x))
    	  $('body')
    	  .addClass('text-center')
    	  .html(auth_vue.mypage_body(x))
      }
   return{onCreate, join, login, mypage}
})();