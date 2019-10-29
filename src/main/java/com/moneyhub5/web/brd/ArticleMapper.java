package com.moneyhub5.web.brd;

import org.springframework.stereotype.Repository;

@Repository
public interface ArticleMapper {
	public void insertArticle(Article param);
	public String countArticle();
}
