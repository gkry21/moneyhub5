package com.moneyhub5.web.pxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.function.BiFunction;
import java.util.function.Function;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.moneyhub5.web.brd.ArticleMapper;
import com.moneyhub5.web.cmm.IFunction;
import com.moneyhub5.web.cmm.ISupplier;
import com.moneyhub5.web.utl.Printer;

import lombok.Data;

@Data @Component @Lazy
public class Proxy {
	private int pageNum, pageSize, startRow,endRow;
	private boolean existPrev, existNext;
	private String search;
	private final int BLOCK_SIZE = 5;
	@Autowired Printer p;
	@Autowired ArticleMapper articleMapper;
	public void paging() {
		
		ISupplier<String> s = ()-> articleMapper.countArticle();
		int totalCount = Integer.parseInt(s.get());
		int pageCount = (totalCount % pageSize !=0)? totalCount/pageSize+1:totalCount/pageSize;
		startRow = (pageNum-1)*pageSize;
		endRow = (pageNum==pageCount)?totalCount-1:startRow+pageSize-1;
		int blockCount = (pageCount % BLOCK_SIZE !=0)? pageCount/BLOCK_SIZE+1:pageCount/BLOCK_SIZE;
		int blockNum = (pageNum-1)/BLOCK_SIZE;
		int startPage = blockNum * BLOCK_SIZE + 1; //(startRow-1)*pageSize+1;
		int endPage = ((blockNum + 1) != blockCount) ? startPage + (BLOCK_SIZE - 1) : pageCount;//startRow*pageSize;
		existPrev = blockNum!=0; // 불린타입에서는 ?이후를 생략가능 맞으면 true, 틀리면 false 
		existNext = (blockNum+1)!=blockCount;
		//pageSize*blockSize+1 = blocksize+1
		/**startRow 찾기
		 * 0 =1*5 
		 * 5=2*5
		 * 10=3*5
		 * 15 =4*5 
		 * 20 =5*5  */
//		if() {}else {}
//		for(int i=0;i%5==0;i++) {
//			if(i%5==0){
//				i += startRow;
//			}
//		}
		
		}
	public int parseInt(String param) {
		Function<String, Integer> f = s -> Integer.parseInt(s);
		return f.apply(param);
	}
	
	public List<?> crawl(Map<?,?> paramMap){  //정형화되있지 않은 데이터의 반환
		String url = "http://"+paramMap.get("site")+"/";
		p.accept("넘어온 url \n"+url);
		List<String> proxyList = new ArrayList<>();
		proxyList.clear(); //꼭해야되는거
		try {
			Connection.Response response = Jsoup.connect(url)
												.method(Connection.Method.GET)
												.execute();
			Document document = response.parse();
			String text = document.text();
//			String text = document.html();
			p.accept("크롤링한 텍스트\n"+text);
			proxyList.add(text);  //꼭해야되는거
		}catch (Exception e2) {
			e2.printStackTrace();
		}
		return proxyList;  
	}
	public int random(int a, int b){
		BiFunction<Integer, Integer, Integer> f = (t,u)->(int)(Math.random()*(u-t))+t;
		return f.apply(a, b);
	}
}

//int pageCount = (totalCount % pageSize !=0) ? (totalCount/pageSize)+1 : totalCount/pageSize;