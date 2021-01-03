package com.controller;

import com.bean.UserLoginBean;
import com.mapper.UserLoginRepository;
import com.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
public class UserLoginController {

    @Resource
    @Autowired
    private UserLoginService userLoginService;

    @RequestMapping("/selectPasswordByUsername")
    public String selectPasswordByUsername(String username, String password){
        System.out.println("1");
        System.out.println(username);
        return userLoginService.selectPasswordByUsername(username, password);
    }
}
