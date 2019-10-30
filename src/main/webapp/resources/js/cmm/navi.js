"use strict"
var navi = navi ||{}
navi =(()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
		let _,js,css,img,aid, brd_vue_js,brd_js,navi_vue_js,auth_js;
	let init =x=>{
		_ = x._
		js = x.js
		css = x.css
		img = x.img
		aid = $.aid();
		auth_js=js+'/cmm/auth.js'
		brd_vue_js =js+'/vue/brd_vue.js'
		brd_js = js +'/brd/brd.js'
		navi_vue_js = js+'/vue/navi_vue.js'
}
	let onCreate =x=>{
		init(x)
		$.when(
				$.getScript(auth_js),
				$.getScript(brd_js)).done().fail(()=>{alert(WHEN_ERR)})
		setContentView()
	}
	let setContentView=x=>{ 
		$('<a>',{
			href : '#',
				text : '글쓰기'
		})
		.addClass('nav-link')
		.appendTo('#menu_write')
		.click(e=>{
			e.preventDefault()
			$.getScript(brd_js, ()=>{brd.write()})
		})
		$('<a>',{
			href : '#',
			text : '로그아웃'
		})
		.addClass('nav-link')
		.appendTo('#menu_logout')
		.click(e=>{
			e.preventDefault()
			$.getScript(auth_js, ()=>{
				auth.onCreate({_:_, css:css, img:img, js:js,aid:$.aid})
			})
		})
	}
	return {onCreate}
})();