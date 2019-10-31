"use strict";
var app = app || {};
app = (()=>{
	const WHEN_ERR = 'app호출하는 js파일을 찾을 수 없습니다.';
	let _, js,css,img,authjs;
	let run = x =>$.getScript(x+'/resources/js/cmm/router.js',()=>{
		$.extend(new Session(x))
		onCreate()
		})
	let init =()=>{
		_ = $.ctx()
		js = $.js()
		css = $.css()
		img = $.img()
		authjs = js +'/cmm/auth.js'
		
	}
	let onCreate =()=>{
		init()
		$.when(
		$.getScript(authjs)
		)
		.done(()=>{
			auth.onCreate()
			})
		.fail(()=>{
			alert(WHEN_ERR)}
		)
	}
	return {run}
})();
