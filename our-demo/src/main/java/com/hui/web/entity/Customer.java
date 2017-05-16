package com.hui.web.entity;

public class Customer {

	private String userName;
	private int age;
	private String sex;
	private String passwd;

	public Customer() {
		super();

	}

	public Customer(String userName, int age, String sex) {
		super();
		this.userName = userName;
		this.age = age;
		this.sex = sex;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
}
