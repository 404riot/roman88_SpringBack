package com.roman.romanpalpal.Service;

import com.roman.romanpalpal.Dto.AccountDTO;
import com.roman.romanpalpal.Mapper.UserSignMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;

public interface UserSignService {
    int createAccount(AccountDTO createAccountInfo);
    String OverlapCheck(String ID);
    boolean SignAccount(String signAccountInfo, String signPw);
    HashMap<String, String> getAccountInfo(String id, String sessionName);
    int accountModify(AccountDTO accountModifyDto);

}

@Service
class UserSingServiceImpl implements UserSignService {

    private final UserSignMapper userSignMapper;

    UserSingServiceImpl(UserSignMapper userSignMapper) {
        this.userSignMapper = userSignMapper;
    }

    @Override
    public int createAccount(AccountDTO createAccountInfo) {
        return userSignMapper.createAccount(createAccountInfo);
    }

    @Override
    public String OverlapCheck(String ID) {
        return userSignMapper.overlapCheck(ID);
    }

    @Override
    public boolean SignAccount(String signAccountInfo, String signPw) {

        boolean result = true;
        if(userSignMapper.signAccount(signAccountInfo) == null) {
            result = false;
        } else if(!userSignMapper.signAccount(signAccountInfo).equals(signPw)) {
            result = false;
        }
        return result;
    }

    @Override
    public HashMap<String, String> getAccountInfo(String id, String sessionName) {

        HashMap<String, String> accountInfoHash = new HashMap<>();
        String seq = Integer.toString((Integer) userSignMapper.getAccountInfo(id).get("seq"));

        accountInfoHash.put("sessionInfo", sessionName);
        accountInfoHash.put("SignedUserSeq", seq);
        accountInfoHash.put("SignedUserName", (String) userSignMapper.getAccountInfo(id).get("name"));
        accountInfoHash.put("SignedUserId", (String) userSignMapper.getAccountInfo(id).get("id"));
        accountInfoHash.put("SignedUserPassword", (String) userSignMapper.getAccountInfo(id).get("CAST(AES_DECRYPT(UNHEX(pw), 'passwordEnc') AS CHAR)"));
        accountInfoHash.put("SignedUserAddress", (String) userSignMapper.getAccountInfo(id).get("CAST(AES_DECRYPT(UNHEX(address), 'addressEnc') AS CHAR )"));
        accountInfoHash.put("SignedUserPostCode", (String) userSignMapper.getAccountInfo(id).get("CAST(AES_DECRYPT(UNHEX(postCode), 'postCodeEnc') AS CHAR)"));
        accountInfoHash.put("SignedUserPhoneNumber", (String) userSignMapper.getAccountInfo(id).get("CAST(AES_DECRYPT(UNHEX(phoneNumber), 'phoneNumberEnc') AS CHAR)"));
        accountInfoHash.put("SignedUserEmail", (String) userSignMapper.getAccountInfo(id).get("email"));
        accountInfoHash.put("SignedUserAuth", (String) userSignMapper.getAccountInfo(id).get("auth"));

        return accountInfoHash;
    }

    @Override
    public int accountModify(AccountDTO accountModifyDto) {

        return userSignMapper.accountModify(accountModifyDto);
    }


}
