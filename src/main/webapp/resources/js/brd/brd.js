"use strict";
var brd = brd ||{};
brd =(()=>{
	const WHEN_ERR ='호출하는 JS 파일을 찾지 못했습니다.'
	let _,js,aid, brd_vue_js;
	let init =()=>{
		_ = $.ctx();
		js = $.js();
		aid = $.aid();
		brd_vue_js =js+'/vue/brd_vue.js'
	}
	let onCreate = () =>{
		init()
		$.getScript(brd_vue_js, ()=>{
			setContentView()
			$('<a>',{
					text : '글쓰기',
					href : '#',
					click : e =>{	
						e.preventDefault()
						write()
				},		

		})
		.addClass('nav-link')
		.appendTo('#go_write')
		}).fail(()=>{alert(WHEN_ERR)})
	}	
	let setContentView =()=>{
			$('head').html(brd_vue.brd_head({css:$.css(), img: $.img(), js:$.js()}))
            $('body').addClass('text-center')
            .html(brd_vue.brd_body({ctx: '/web',css:$.css(), img: $.img(),js:$.js()}))
            $('#recentid .media').remove()
            $('#recentid .d-block').remove()
            $('#recentid').append('<h1>등록된 글이 없습니다.</h1>')
		}
	/*+' <input type="reset" class= style= >'
	+'<input name="write" type="submit" class= style= />'*/
	let write = ()=>{
		alert('글쓰기클릭')
		$('#recent_updates').html(brd_vue.brd_write())
		alert('사용자 아이디 '+ aid)
		$('#write_form input[name="writer"]').val(aid) //vue에서 form이 유니크한 값이라면 #를 없애도 된다. 
		$('#suggestions').remove()
		$('<input>',{
			style:"float:right;width:100px;margin-right:10px",
			value: "취소"
		})
		.addClass("btn btn-danger")
		.appendTo('#write_form')
		.click(()=>{
		})
		$('<input>',{
			style : "float:right;width:100px;margin-right:10px",
			value:"전송",
		})
		.addClass("btn btn-primary")
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			let json ={
					aid : $('#write_form input[name="writer"]').val(),  
					title : $('#write_form input[name="title"]').val(),
					content : $('#write_form textarea[name="content"]').val()
			}
			alert('글내용'+json.content)
		$.ajax({
				url : _+'/articles/',
				type :'POST',
				data :JSON.stringify(json),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					$('#recent_updates').html('<h1>목록 불러오기</h1>')
				},
				error : e=>{alert('에러')}
			})
		})
	}
	let navigation = ()=>{
		$('<a>',{
			href : '#',
			click : e=>{e.prebentDefault()
				write()
				},
				text : '글쓰기'
		})
		.addClass('nav-link')
		.appendTo('#go_write')
	}
	return {onCreate}
})();