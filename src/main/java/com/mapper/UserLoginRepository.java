package com.mapper;

import com.bean.UserLoginBean;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserLoginRepository {

    @Select("select password from tb_loginInfo where nickname = #{username}")
    @ResultType(String.class)
    public String selectPasswordByUsername(@Param("username")String username);

    @Select("select password from tb_user where telephone = #{username}")
    @ResultType(String.class)
    public String selectPasswordByTelephone(@Param("username")String username);
}
