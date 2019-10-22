package com.moneyhub5.web.user;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.moneyhub5.web.utl.Printer;



@RestController
@RequestMapping("/user")

public class UserCtrl {
	private static final Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	@Autowired Map<String, Object>map;
	@Autowired User user;
	@Autowired Printer printer;
	
	@PostMapping("/")
	public @ResponseBody Map<?,?> join(@RequestBody User param) {
		logger.info("AJAX가 보낸 아이디와 비번{}",param.getUid()+","+param.getPwd());
		printer.accept("람다 프린터가 출력한 값"+param.getUid()+","+param.getPwd());
		Map<String, Object> map = new HashMap<>();
		map.put("aid", param.getUid());
		map.put("pwd", param.getPwd());
		logger.info("AJAX가 보낸 아이디와 비번{}",user.toString());
		return map;	
}
	@PostMapping("/login")
	public @ResponseBody User login(@RequestBody User param) {
		logger.info("AJAX가 보낸 로그인 아이디와 비번{}",param.getUid()+","+param.getPwd());
		user.setUid(param.getUid());
		user.setPwd(param.getPwd());
		logger.info("a작스가 보낸 아디와 비번{}",user.toString());

		return param;
	}
}
