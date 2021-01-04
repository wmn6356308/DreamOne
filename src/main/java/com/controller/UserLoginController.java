package com.controller;

import com.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

import com.config.OverAllVar;

import static com.config.OverAllVar.*;

@Controller
public class UserLoginController {

    @Resource
    @Autowired
    private UserLoginService userLoginService;

    @RequestMapping("/selectPasswordByUsername")
    public String selectPasswordByUsername(String username, String password, char loginType){
        if(loginType == LoginType_Telephone){
            System.out.println(username);
            return userLoginService.selectPasswordByTelephone(username, password);
        }else if(loginType == LoginType_Username){
            System.out.println(username);
            return userLoginService.selectPasswordByUsername(username, password);
        }

        return "wrong_password";
    }
}
