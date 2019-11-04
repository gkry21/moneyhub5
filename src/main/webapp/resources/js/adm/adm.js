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
        $('#right').empty()
        $('</br></br></br></br></br><h2>Web Crawling</h2></br></br></br></br></br></br></br>'+
                '<form id="crawl_form" class="form-inline my-2 my-lg-0">'+
                '  <select name="site" size="2" multiple>'+
                '  </select>'+
                '<input class="form-control mr-sm-2" type="text" placeholder="insert URL for crawling" aria-label="Search">'+
                '</form>')
        .appendTo('#right')
        $('#crawl_form input[class="form-control mr-sm-2"]')
        .css({width:'80%'})
        $.each([{sub:'naver.com'},{sub:'daum.net'},{sub:'google.co.kr'},{sub:'youtube.com'}],(i,j)=>{
            $('<option value='+j.sub+'>'+j.sub+'</option>').appendTo('#crawl_form select')
        })
        $('<button class="btn btn-secondary my-2 my-sm-0" type="submit">go crawl</button>')
        .appendTo('#crawl_form')
        .click(e=>{
            alert(
            $.fn.nullChecker([$('#crawl_form select[name="site"]').val(),
                    $('#crawl_form input[type="text"]').val()])?'빈칸을 채우시오':'보낼준비 완료')
            let url = _+'/tx/crawling/'+$('#crawl_form select[name="site"]').val()
            +'/'+$('#crawl_form input[type="text"]').val()
            alert($('#crawl_form select[name="site"]').val())
            e.preventDefault() // /tx/crawling/google/spring
            $.getJSON(_
                    +'/tx/crawling/'+$('#crawl_form select[name="site"]').val()
                    +'/'+$('form#crawl_form input[type="text"]').val(),
                    d=>{
                alert(d.msg)
            })
        })
    }
	
//	let webCrawl=()=>{
//		$('#right').empty()
//		$('</br></br></br></br></br><h2>Web Crawling</h2></br></br></br></br></br></br></br>'+
//		'<form id="formlist"><select name="site" size="1" multiple><input type="text" placeholder="insert URL for crawling" style = "width:70%"/></select></form>')
//		.appendTo('#right')
//		$.each([
//			{txt:'네이버',name:'naver'},{txt:'다음',name:'daum'},{txt:'구글',name:'google'},{txt:'머니허브',name:'moneyhub'}],
//			(i,j)=>{
//				$('<option value="'+j.name+'">'+j.txt+'</option>')
//				.css({border: '1px solid #ddd', margin: '0 auto ', 'line-height': '50px'})
//				.appendTo('#formlist select')
//				.submit(function(){
//					$(this).addClass('active1')
//					$(this).siblings().removeClass('active1')
//					switch($(this).attr('name')){
//					case 'naver': 
//						alert('naver 들어옴')
//						$('#go_submit').prop(action,"https://www.naver.com/")
//						break;
//					case 'daum': 
//						$('#go_submit').prop(action,'https://www.daum.net/')
//						break;
//					case 'google': googleClick()
//						break;
//					case 'moneyhub': moneyHubClick()
//						break;
//					}
//				})
//			})
//			$('<form id="go_submit"><input type="submit" value="클릭"/></form>')
//			.appendTo('#formlist')
//			.click(e=>{
//				e.preventDefault()
//				 $.getJSON(_
//						 +'/tx/'+$('form#formlist select[name="site"]').val()
//						 +'/'+$('form#formlist inpit[type="text"]').val(),
//						 d=>{
//					 alert(d)
//				 }) //data와 dataType 리퀘스트바디와 일치해야한다.
//			
//			})
//	}
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