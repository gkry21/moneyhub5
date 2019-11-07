package com.moneyhub5.web.brd;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.moneyhub5.web.pxy.Proxy;

@Repository
public interface ArticleMapper {
	public void insertArticle(Article param);
	public String countArticle();
	public List<Article> selectAll();
	public void updateArticle(Article param);
	public List<Article> selectAll(Proxy pxy);
}
