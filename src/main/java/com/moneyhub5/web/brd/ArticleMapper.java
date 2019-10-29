package com.moneyhub5.web.brd;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface ArticleMapper {
	public void insertArticle(Article param);
	public String countArticle();
	public List<Article> selectAll();
	public void updateArticle(Article param);
}
