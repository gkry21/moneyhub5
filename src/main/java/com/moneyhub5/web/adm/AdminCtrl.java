package com.moneyhub5.web.adm;


import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moneyhub5.web.cmm.IFunction;
import com.moneyhub5.web.utl.Printer;

@RestController
@RequestMapping("/admins")
public class AdminCtrl {
	private static final Logger logger = LoggerFactory.getLogger(AdminCtrl.class);
	@Autowired AdminMapper adminMapper;
	@Autowired Admin adm;
	@Autowired Printer printer;
	@Autowired Map<String,Object> map;
	
	@PostMapping("/{empno}")
	public Map<?,?> access(@PathVariable String empno,@RequestBody Admin param) {	
	IFunction<Admin, Admin> f = t-> adminMapper.access(param);
	map.clear();
	map.put("msg",(f.apply(param)!=null)?"SUCCESS":"FAIL");
	return map;
	}

	@PostMapping("/")
	public void selectAdminNo(@RequestBody Admin param) {
		
	}
	
}
