package com.controller;

import com.bean.UserInfoBean;
import com.service.UserLoginService;
import com.service.UserRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

import static com.config.OverAllVar.*;


@Controller
public class UserRegisterController {

    @Resource
    @Autowired
    private UserInfoBean userInfoBean;
    private UserRegisterService userRegisterService;

    @RequestMapping("/register")
    public String register(UserInfoBean userInfoBean){

        if(OK == userRegisterService.insertUserInfo(userInfoBean)){
            return "register_succ";
        }else{
            return "register_fail";
        }
    }
}
