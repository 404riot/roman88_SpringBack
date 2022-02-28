package com.roman.romanpalpal.Mapper;

import com.roman.romanpalpal.Dto.AccountDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

@Mapper
public interface UserSignMapper {

    int createAccount(AccountDTO createAccountInfo);

    String overlapCheck(String Id);

    String signAccount(String signAccountInfo);

    // seq - integer
    HashMap<String, Object> getAccountInfo(String id);

    int accountModify(AccountDTO accountModifyDto);


}
