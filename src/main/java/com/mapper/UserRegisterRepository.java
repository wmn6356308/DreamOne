package com.mapper;

import com.bean.UserInfoBean;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserRegisterRepository {

    @Results(id="userRegister", value={
            @Result(id=true, column="id", property="id"),
            @Result(column="nickname", property="nickname"),
            @Result(column="telephone", property="telephone"),
            @Result(column="province", property="username"),
            @Result(column="city", property="username"),
            @Result(column="county", property="username"),
            @Result(column="detailaddr", property="username"),
            @Result(column="name", property="username"),
            @Result(column="sex", property="username")
    })

    @Insert("insert into tb_userinfo(nickname, telephone, province, city, county, detailaddr, name, sex)"
            + "values (#{nickname}, #{telephone}, #{province}, #{city}, #{county}, #{detailaddr}, #{name}, #{sex})")
    @ResultMap("userRegister")
    public int insertUser(@Param("userinfo")UserInfoBean userinfo);
}
