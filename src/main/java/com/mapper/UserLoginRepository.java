package com.mapper;

import com.bean.UserLoginBean;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserLoginRepository {

    @Select("select password from tb_user where username = #{username}")
    // 引用id="userResult"的@Results
    @ResultType(String.class)
    public String selectPasswordByUsername(@Param("username")String username);
}
