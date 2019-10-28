"use strict";
function Session(x){
    sessionStorage.setItem('ctx',x);
    sessionStorage.setItem('js',x+'/resources/js');
    sessionStorage.setItem('css',x+'/resources/css');
    sessionStorage.setItem('img',x+'/resources/img');
    return{
        ctx : ()=>{return sessionStorage.getItem('ctx');},
        js : ()=>{return sessionStorage.getItem('js');},
        css : ()=>{return sessionStorage.getItem('css');},
        img : ()=>{return sessionStorage.getItem('img');}
    }
}
function User(x){
	sessionStorage.setItem('aid', x.aid)
	sessionStorage.setItem('pwd', x.pwd)
	sessionStorage.setItem('cname', x.cname)
	return {
		aid : ()=>{return sessionStorage.getItem('aid')},
		pwd : ()=>{return sessionStorage.getItem('pwd')},
		cname : ()=>{return sessionStorage.getItem('cname')},
		
	}
}