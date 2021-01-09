package com.controller;

import com.bean.UserInfoBean;
import com.service.UserLoginService;
import com.service.UserRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

import static com.config.OverAllVar.*;


@Controller
public class UserRegisterController {

    @Resource
    @Autowired
    private UserInfoBean userInfoBean;
    @Autowired
    private UserRegisterService userRegisterService;

    @RequestMapping("/register")
    public String register(UserInfoBean userInfoBean){

        System.out.println(userInfoBean.getSex());
        System.out.println(userInfoBean.getNickName());
        if(OK == userRegisterService.insertUserInfo(userInfoBean)){
            return "register_succ";
        }else{
            return "register_fail";
        }
    }
}
