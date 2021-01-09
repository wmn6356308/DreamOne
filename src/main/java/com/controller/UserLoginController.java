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

    @RequestMapping("/login")
    public String loginByXxx(String username, String password, char loginType){
        if(loginType == LoginType_Telephone){
            //System.out.println(username);
            return userLoginService.selectPasswordByTelephone(username, password);
        }else if(loginType == LoginType_Username){
            //System.out.println(username);
            return userLoginService.selectPasswordByUsername(username, password);
        }else if(loginType == LiginType_TeleAndVeriCode){
            /* 登录方式3，使用手机号和验证码登录。username为手机号，password为验证码，loginType为2 */
            return userLoginService.loginByTeleAndVeriCode(username, password);
        }

        return "wrong_password";
    }
}
