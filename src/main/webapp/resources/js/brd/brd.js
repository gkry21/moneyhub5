"use strict";
var brd = brd ||{};
brd =(()=>{
	const WHEN_ERR ='brd호출하는 JS 파일을 찾지 못했습니다.'
	let _,js,css,img, brd_vue_js,$aid, navi_js,
		navi_vue_js,page_vue_js,compo_vue_js;
	let init =()=>{
		_ = $.ctx() 
		js = $.js()
		css = $.css()
		img = $.img()
		brd_vue_js =js+'/vue/brd_vue.js'
		navi_js = js+'/cmm/navi.js'
		navi_vue_js =js+'/vue/navi_vue.js'
		page_vue_js = js+'/vue/page_vue.js'
		compo_vue_js = js+'/vue/compo_vue.js'
	}
	
	let onCreate = () =>{
		init()
		$.when(
			$.getScript(brd_vue_js),  
			$.getScript(navi_vue_js),
			$.getScript(navi_js),
			$.getScript(page_vue_js),
			$.getScript(compo_vue_js)
			
		).done(()=>{
			setContentView()
			navi.onCreate()
		}).fail(()=>{
			alert(WHEN_ERR)
		})
	}	
	let setContentView =()=>{
           
        $('head').html(brd_vue.brd_head({css: $.css(), img: $.img()}))
        $('body').addClass('text-center')
        .html(brd_vue.brd_body({ctx: '/web',css: $.css(), img: $.img()}))
        $(navi_vue.nav()).appendTo('#navi')
        recent_updates({page:'1',size:'5'})
			}
	
    let recent_updates=x=>{
            $('#recent_updates .media').remove()
            $('#suggestions').remove()
            $('#recent_updates .d-block').remove()
            $('#recent_updates .container').remove()
            $('#paging_form').remove()
            $.getJSON(_+'/articles/page/'+x.page+'/size/'+x.size,d=>{ //데이터를 다른데서 받아오지 않고 자체적으로 실행
            	let pxy = d.pxy
            	$.each(d.articles, (i,j)=>{ //j는 article
    			$('<div class="media text-muted pt-3"><img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfcdddb72%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfcdddb72%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">'+
  				' <p id="id_'+i+'" class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
  				'</p></div>').appendTo('#recent_updates')
  				$('<strong class="d-block text-gray-dark">@<a>'+j.aid+'</a></strong>')
  				.appendTo('#id_'+i)
  				.click(()=>{
  					alert('아이디 클릭')
				})		
  				$('<a>'+j.title+'</a>')
  				.appendTo('#id_'+i) //append는 ()뒤에 두는 것, 앞에 두고 싶으면 prepend쓰면 된다.
  				.click(()=>{
  				alert('제목 클릭')
  				detail(j)
  				})//태그 안에 들어가면 value, 태그 밖에 있으면  text
    		})

        $(page_vue.pag())
			.appendTo('#recent_updates')
			$('#pagination').empty()
			$('<form id="paging_form" class="form-inline my-2 my-lg-0">'+
					'  <select name="site" size="1">'+
					'  </select>'+
					'</form>').prependTo('#recent_updates div.container')
			$('#paging_form input[class="form-control mr-sm-2"]')
			.css({width:'80%'})
			$.each([{sub:'5개보기',val:'5'},{sub:'10개보기',val:'10'},{sub:'15개보기',val:'15'}],(i,j)=>{
				$('<option value='+j.val+'>'+j.sub+'</option>')
				.appendTo('#paging_form select')
			})
			$('#paging_form option[value="'+pxy.pageSize+'"]').attr('selected',true)
			$('#paging_form').change(()=>{
				alert('선택한 보기 :' +$('#paging_form option:selected').val())
				recent_updates({page:'1',size: $('#paging_form option:selected').val(),sub:$('paging_form select')})
			})
			if(pxy.existPrev){
				$('<li class="page-item"><a class="page-link" href="#">이전</a></li>')
				.appendTo('#pagination')
				.click(e=>{
					e.preventDefault()
					recent_updates({page:pxy.prevBlock,size:pxy.pageSize})
				})
			}
    		let i = 0
    		for(i = pxy.startPage;i<=pxy.endPage;i++){
    			if(pxy.pageNum == i){
    				$('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>')
					.appendTo('#pagination')
					.addClass('active')
    			}else{
		    		$('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>')
					.appendTo('#pagination')
					.click(function(){
						alert('페이지번호>>> :'+$(this).children('.page-link').text())
					recent_updates({page:$(this).children('.page-link').text(),size:pxy.pageSize})
			})}
    		}
			if(pxy.existNext){
				$('<li class="page-item"><a class="page-link" href="#">다음</a></li>')
				.appendTo('#pagination')
				.click(e=>{
					e.preventDefault()
				recent_updates({page:pxy.nextBlock,size:pxy.pageSize})
				})
			}
    		$('#recent_updates h2').remove()
    		$('#pagination').css({'justify-content':'center'})
          })
		}
	let write = ()=>{ 
		$('#recent_updates').html(brd_vue.brd_write())
		$('#write_form input[name="writer"]').val(getCookie("AID")) //vue에서 form이 유니크한 값이라면 #를 없애도 된다. 
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
					$.ajax({
							url : _+'/articles/write',
							type :'POST',
							data :JSON.stringify(json),
							dataType : 'json',
							contentType : 'application/json',
							success : d=>{
								$('#recent_updates div.container-fluid').remove()
								recent_updates()
							},
							error : e=>{alert('라이트에러')}
						})
				})
	}
	let write_ = ()=>{ 
		alert(_);
	}
	let detail = x =>{
		$('#recent_updates').html(brd_vue.brd_write())
		$('#recent_updates div.container-fluid h1').html('ARTICLE DETAIL')
		$('#write_form input[name="writer"]').val(x.aid) //vue에서 form이 유니크한 값이라면 #를 없애도 된다. 그치만 위험하니까 하지마라
		$('#write_form input[name="title"]').val(x.title)
		$('#write_form textarea[name="content"]').val(x.content)
		$('#suggestions').remove()
		$('<input>',{
			style:"float:right;width:100px;margin-right:10px",
			value: "삭제"
		})
		.addClass("btn btn-danger")
		.appendTo('#write_form')
		.click(()=>{
			$.ajax({
				url : _+'/articles/'
			})
		})
		$('<input>',{
			style : "float:right;width:100px;margin-right:10px",
			value:"수정",
		})
		.addClass("btn btn-primary")
		.appendTo('#write_form')
		.click(()=>{
			let json = {
					seq : $('#write_form input[name="writer"]').val(),  
					title : $('#write_form input[name="title"]').val(),
					content : $('#write_form textarea[name="content"]').val()
			}
			$.ajax({
				url : _+'/articles/update',
				type : 'PUT',
				data :JSON.stringify(json),
				dataType : 'json',
				contentType : 'application/json',
				success : d =>{
					alert('수정 성공!')
				},
				error : e=>{alert('수정실패')}
			})
		})
	}
	
	return {onCreate,write}
})();