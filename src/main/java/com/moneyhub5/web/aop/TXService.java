package com.moneyhub5.web.aop;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moneyhub5.web.pxy.Proxy;

@Transactional
@Service
public class TXService { // 서비스라고 이름붙어있지만 포조이다.
	@Autowired TXMapper mapper;
	@Autowired Proxy pxy;
//	@Autowired List<String> list;
	
	@SuppressWarnings("unchecked")
	public List<?> crawling(Map<?,?> paramMap){
		List<String> txServicelist = new ArrayList<>();
		txServicelist.clear();
		txServicelist = (List<String>) pxy.crawl(paramMap);
		return txServicelist;  
	}
}
