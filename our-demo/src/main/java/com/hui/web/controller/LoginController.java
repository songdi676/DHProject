package com.hui.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hui.web.entity.Customer;

@Controller
public class LoginController {
	Logger logger = LoggerFactory.getLogger(LoginController.class);

	private static Map<String, String> userPasswdMap = new HashMap<String, String>();

	static {
		userPasswdMap.put("Gina", "680711");
		userPasswdMap.put("Song", "qq8856676");
	}

	@RequestMapping("/login")
	@ResponseBody
	public boolean releaseData(@RequestBody Customer customer) {
		// 用户是否存在
		if (userPasswdMap.containsKey(customer.getUserName())) {
			// 存在校验密码
			String savePasswd = userPasswdMap.get(customer.getUserName());
			String inputPasswd = customer.getPasswd();
			if (savePasswd.equals(inputPasswd)) {
				return true;
			}
		}
		return false;
	}
}
