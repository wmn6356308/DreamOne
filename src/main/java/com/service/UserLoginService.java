package com.service;

import com.bean.UserLoginBean;
import com.mapper.UserLoginRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserLoginService {

    @Resource
    private UserLoginRepository userLoginRepository;
    private String password;

    public String selectPasswordByUsername(String username, String password){

        String realPassword = null;
        realPassword = userLoginRepository.selectPasswordByUsername(username);
        if(realPassword != null) {
            if (!realPassword.equals(password)) {
                return "wrong_password";
            } else if (realPassword.equals(password)) {
                return "right_password";
            }
        }else{
            System.out.println("密码为空");
        }

        return "wrong_password";
    }

    public String selectPasswordByTelephone(String telephone, String password){

        String realPassword = null;
        realPassword = userLoginRepository.selectPasswordByTelephone(telephone);
        if(realPassword != null) {
            if (!realPassword.equals(password)) {
                return "wrong_password";
            } else if (realPassword.equals(password)) {
                return "right_password";
            }
        }else{
            return "err_page";
        }

        return "err_page";
    }

    /* 使用手机号和验证码登录，前端传来手机号和验证码，后端校验 */
    public String loginByTeleAndVeriCode(String telephone, String veriCode){

        return "err_page";
    }
}
