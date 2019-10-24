package com.moneyhub5.web.lambda;

import com.moneyhub5.web.usr.User;

public class GenericTest {
	static class Box<T>{
		T item;
		void setItem(T item) {this.item = item;}
		T getItem() {return item;}
	}
	public static void main(String[] args) {
		GenericTest.Box<String> s = new GenericTest.Box<>();
		GenericTest.Box<Integer> s3 = new GenericTest.Box<>();
		GenericTest.Box<User> ubox = new GenericTest.Box<>();
		
	}
}
