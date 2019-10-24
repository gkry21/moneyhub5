package com.moneyhub5.web.user;

import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper {
	public void insertClient(User user);
	public User selectUserById(User user);
	public int existId(String aid);
}
