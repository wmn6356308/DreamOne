package com.bean;

public class UserLoginBean {
    private String username;
    private String passWord;
    private String verifyCode;
    private int loginType;      //0：用户名密码登录；1：验证码登录

    /* Setter */
    public void setUserName(String username) {
        this.username = username;
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
        return username;
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
