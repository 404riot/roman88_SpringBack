package com.roman.romanpalpal.Ctrl;

import com.roman.romanpalpal.Dto.AccountDTO;
import com.roman.romanpalpal.Service.UserSignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserSignCtrl {

    @Autowired
    private final UserSignService userSignService;

    public UserSignCtrl(UserSignService userSignService) {
        this.userSignService = userSignService;
    }

    @PostMapping("api/Sign/CreateAccount")
    public int CreateAccount(@RequestParam String name, String id, String pw, String phoneNumber, String address, String postCode, String fullEmail) {

        // 배열 못 받아서 그냥 String 으로 하드코딩 ㅅㅂ
        AccountDTO accountDTO = new AccountDTO();

        accountDTO.setName(name);
        accountDTO.setId(id);
        accountDTO.setPw(pw);
        accountDTO.setAddress(address);
        accountDTO.setPostCode(postCode);
        accountDTO.setPhoneNumber(phoneNumber);
        accountDTO.setEmail(fullEmail);

        return userSignService.createAccount(accountDTO);

        // react 지랄 방지용 구라핑 return value
        // return 1;

    }
    @PostMapping("api/Sign/OverlapCheck")
    public boolean OverlapCheck(@RequestParam String ID) {

        String overlapResult = userSignService.OverlapCheck(ID);
        boolean use = false;

        if(overlapResult == null) { use = true; }

        return use;
    }

    @PostMapping("api/Sign/SignAccount")
    public HashMap<String, String> SignAccount(@RequestParam String id, String pw, RedirectAttributes redirectAttributes, HttpSession session) {

        String resultMessage = "Fail to Sign in.";
        HashMap<String, String> accountInfoHash = new HashMap<>();

        if (userSignService.SignAccount(id, pw)) {
            session.setAttribute("loginId", id);
            session.setMaxInactiveInterval(600);

            // If access in the account, get the account's info
            //
            String sessionName = (String) session.getAttribute("loginId");

            accountInfoHash = userSignService.getAccountInfo(id, sessionName);
            resultMessage = "success Sign in";
        }
        redirectAttributes.addFlashAttribute("msg",resultMessage);

        return accountInfoHash;
    }

    @PostMapping("api/Sign/AccountModify")
    public HashMap<String, String> AccountModify(@RequestParam String seq, String id, String pw, String name, String address, String postCode, String phoneNumber, String email, HttpSession session) {

        AccountDTO accountModifyDto = new AccountDTO();

        accountModifyDto.setSeq(Integer.parseInt(seq));
        accountModifyDto.setId(id);
        accountModifyDto.setPw(pw);
        accountModifyDto.setName(name);
        accountModifyDto.setAddress(address);
        accountModifyDto.setPostCode(postCode);
        accountModifyDto.setPhoneNumber(phoneNumber);
        accountModifyDto.setEmail(email);

        HashMap<String, String> accountInfoHash = new HashMap<>();

        if(userSignService.accountModify(accountModifyDto) == 1) {
            String sessionName = (String) session.getAttribute("loginId");
            accountInfoHash = userSignService.getAccountInfo(id, sessionName);
            accountInfoHash.put("updateResult", "success");
        } else {
            accountInfoHash.put("updateResult", "failed");
        }

        return accountInfoHash;
    }

    @PostMapping("api/Sign/SignOut")
    public void SignOut(HttpSession session) {
        session.removeAttribute("loginId");

    }


    // CORS 에러로 진입 못하는 중. ################################################################################################################################

//    @PostMapping("api/Sign/SignAccount")
//    public ResponseEntity<TokenResponse> SignAccount(@RequestParam String id, String pw) {
//
//        LoginRequest loginRequest = new LoginRequest();
//        String token = "";
//
//        if(userSignService.SignAccount(id, pw)) {
//            loginRequest.setPw(pw);
//            loginRequest.setId(id);
//            token = userSignService.createToken(loginRequest);
//        }
//
//        System.out.println(id + "   " + pw);
//        System.out.println(token);
//
//        return ResponseEntity.ok().body(new TokenResponse(token, "bearer"));
//    }


}
