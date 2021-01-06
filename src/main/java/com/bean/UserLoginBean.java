package com.bean;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class UserLoginBean {

    private int id;
    private String nickname;
    private String passWord;
    private String verifyCode;
    private int loginType;      //0：用户名密码登录；1：验证码登录

    /* Setter */
    public void setUserName(String username) {
        this.nickname = username;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public void setLoginType(int loginType) {
        this.loginType = loginType;
    }

    /* Getter */
    public String getUsername() {
        return nickname;
    }

    public String getPassWord() {
        return passWord;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public int getLoginType() {
        return loginType;
    }
}
