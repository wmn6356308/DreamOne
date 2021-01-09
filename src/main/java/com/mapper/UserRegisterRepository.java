package com.mapper;

import com.bean.UserInfoBean;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserRegisterRepository {

    @Results(id="userRegister", value={
            @Result(id=true, column="id", property="id"),
            @Result(column="nickname", property="nickName"),
            @Result(column="telephone", property="telephone"),
            @Result(column="province", property="province"),
            @Result(column="city", property="city"),
            @Result(column="county", property="county"),
            @Result(column="detailaddr", property="detailAddress"),
            @Result(column="name", property="name"),
            @Result(column="sex", property="sex")
    })

    @Insert("insert into tb_userinfo(nickname, telephone, province, city, county, detailaddr, name, sex)"
            + "values (#{nickName}, #{telephone}, #{province}, #{city}, #{county}, #{detailAddress}, #{name}, #{sex})")
    //@ResultMap("userRegister")
    public int insertUser(UserInfoBean userinfo);
}
