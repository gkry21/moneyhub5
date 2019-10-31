"use strict"
var adm = adm ||{}
adm = (()=>{
	const WHEN_ERR = 'adm호출하는 js를 찾을 수 없습니다'
	let _,js,img,css,navi_vue_js
	let init =()=>{
		_=$.ctx()
		js=$.js()
		img=$.img()
		css=$.css()
		navi_vue_js = js+'/vue/navi_vue.js'
	}
	let onCreate =()=>{
		alert('환영함다')
		init()
		$.when(
			$.getScript(navi_vue_js)
			)
		.done(()=>{
			setContentView()
		})
		.fail(()=>{WHEN_ERR})
	}
	let setContentView=()=>{
		$('body').empty()
		.css({'background-color': '#be7a7a'})
		$(navi_vue.nav())
		.appendTo('body')
		$('<table id="tab">'+
				'<tr>'+
				'</tr>'+
		'</table>')
		.css({border:'1px solid black',width: '100%',height:'80%', 'margin':'0 auto'})
		.appendTo('body')
		$.each([{id :'left',widgh: '20%'},
			{id : 'right',widgh:'80%'}],
			(i,j)=>{
			$('<td id="'+j.id+'"></td>')
			.css({border: '2px solid #ddd',width: j.widgh,'vertical-align': 'top'})
			.appendTo('#tab tr')
		})

		$.each([
			 {txt:'웹크롤링',name: 'web_crawl'},
			 {txt:'고객관리',name: 'cust_mgmt'},
			 {txt:'상품등록',name: 'item_reg'},
			 {txt:'상품조회',name: 'item_srch'},
			 {txt:'상품관리',name: 'item_mod'},
			 {txt:'상품삭제',name: 'item_del'}],
			(i,j)=>{
			$('<div name="'+j.name+'">'+j.txt+'</div>')
			.css({border: '1px solid #ddd', margin: '0 auto ', 'line-height': '50px'})
			.appendTo('#left')
			.click(function(){
				$(this).addClass('active')
				$(this).siblings().removeClass('active')
				switch($(this).attr('name')){
				case 'web_crawl': webCrawl()
				break;
				case 'cust_mgmt': custManager()
					break;
				case 'item_reg': itemReg()
					break;
				case 'item_srch': itemSrch()
					break;
				case 'item_mod': itemMod()
					break;
				case 'item_del': itemDel()
					break;
				}
		})
		})
		
	}
	let webCrawl=()=>{
		$('<form id="formlist"><select name="list" size="1"><input type="text" style = "width:70%"/></select></form>')
		.appendTo('#right')
		$.each([
			{txt:'네이버',name:'naver'},
			{txt:'다음',name:'daum'},
			{txt:'구글',name:'google'},
			{txt:'머니허브',name:'moneyhub'}],
			(i,j)=>{
				$('<option value="'+j.name+'">'+j.txt+'</option>')
				.css({border: '1px solid #ddd', margin: '0 auto ', 'line-height': '50px'})
				.appendTo('#formlist select')
				.submit(function(){
					$(this).addClass('active1')
					$(this).siblings().removeClass('active1')
					switch($(this).attr('name')){
					case 'naver': 
						alert('naver 들어옴')
						$('#go_submit').prop(action,"https://www.naver.com/")
						break;
					case 'daum': 
						$('#go_submit').prop(action,'https://www.daum.net/')
						break;
					case 'google': googleClick()
						break;
					case 'moneyhub': moneyHubClick()
						break;
					}
				})
			})
			$('<form id="go_submit"><input type="submit" value="클릭"/></form>')
			.appendTo('#right')
	}
	let custManager=()=>{
		alert('고객관리 페이지로 이동합니다.')
	}
	let itemReg=()=>{
		alert('상품등록 페이지로 이동합니다.')
	}
	let itemSrch=()=>{
		alert('상품조회 페이지로 이동합니다.')
	}
	let itemMod=()=>{
		alert('상품관리 페이지로 이동합니다.')
	}
	let itemDel=()=>{
		alert('상품 삭체 페이지로 이동합니다.')
	}
	let naverClick=()=>{
		alert('고객관리 페이지로 이동합니다.')
	}
	let daumClick=()=>{
		alert('상품등록 페이지로 이동합니다.')
	}
	let googleClick=()=>{
		alert('상품조회 페이지로 이동합니다.')
	}
	let moneyHubClick=()=>{
		alert('상품관리 페이지로 이동합니다.')
	}
	return {onCreate}
})();