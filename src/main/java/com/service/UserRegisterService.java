package com.service;

import com.bean.UserInfoBean;
import com.bean.UserLoginBean;
import com.mapper.UserLoginRepository;
import com.mapper.UserRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import static com.config.OverAllVar.*;
import java.util.Map;
import com.config.*;
import org.springframework.web.bind.annotation.ResponseBody;

@Service
@ResponseBody
public class UserRegisterService {

    @Autowired
    @Resource
    private UserRegisterRepository userRegisterRepository;

    public int insertUserInfo(UserInfoBean userInfoBean){

        if(1 == userRegisterRepository.insertUser(userInfoBean)) {
            //插入成功
            System.out.print("22");
            return OK;
        }
        else{
            //插入失败
            return Err;
        }
    }

}
