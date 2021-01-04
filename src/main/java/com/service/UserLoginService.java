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
            System.out.println("luelleleled");
        }
        //System.out.println("password = " + password);
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

        }
        //System.out.println("password = " + password);
        return "wrong_password";
    }
}
