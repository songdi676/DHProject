package com.hui.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hui.web.entity.Customer;

@Controller
public class CustomerInfoController {
	Logger logger = LoggerFactory.getLogger(CustomerInfoController.class);

	@GetMapping(value = "/queryUser/{userName:.*}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	Customer queryUser(@PathVariable String userName) {
		logger.debug("queryUser:" + userName);
		if (userName.equals("Gina")) {
			return new Customer("Gina", 18, "女");
		}
		return new Customer("Song", 26, "男");
	}
}
