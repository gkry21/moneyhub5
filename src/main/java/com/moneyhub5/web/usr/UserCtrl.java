package com.moneyhub5.web.usr;


import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.moneyhub5.web.cmm.IConsumer;
import com.moneyhub5.web.cmm.IFunction;
import com.moneyhub5.web.utl.Printer;



@RestController
@RequestMapping("/user")

public class UserCtrl {
	private static final Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	@Autowired Map<String, Object>map;
	@Autowired User user;
	@Autowired Printer printer;
	@Autowired UserMapper userMapper;
	
	@GetMapping("/{aid}/exist")
	public Map<?,?> exist(@PathVariable String aid){
		System.out.println(aid);
		IFunction<String, Integer> p = o -> userMapper.existId(aid);
		map.clear();
		map.put("msg", (p.apply(aid)==0) ? "SUCCESS" : "FAIL");
		System.out.println(map.get("msg"));
		return map;
	}
	
	@PostMapping("/")
	public Map<?,?> join(@RequestBody User param) {
		printer.accept("join 들어옴 : "+param.toString());
		IConsumer<User> c = o -> userMapper.insertClient(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;	
}
	@PostMapping("/{aid}/login")
	public User login(@PathVariable String aid, @RequestBody User param) {
		System.out.println(param.toString());
		IFunction<User,User> f = t-> userMapper.selectUserById(param);
		System.out.println(f.apply(param).toString());
		return f.apply(param);
	}
	@GetMapping("/{aid}")
	public User serachUserById(@PathVariable String aid, @RequestBody User param) {
		IFunction<User,User> f = t-> userMapper.selectUserById(param);
		return f.apply(param);
	}
	@PutMapping("/{aid}")
	public String updateUser(@PathVariable String aid, @RequestBody User param) {
		IConsumer<User> c = o -> userMapper.insertClient(param);
		c.accept(param);
		return "SUCCESS";	
	}
	@DeleteMapping("/{aid}")
	public String deleteUser(@PathVariable String aid, @RequestBody User param) {
		IConsumer<User> c = o -> userMapper.insertClient(param);
		c.accept(param);
		return "SUCCESS";	
	}
}
