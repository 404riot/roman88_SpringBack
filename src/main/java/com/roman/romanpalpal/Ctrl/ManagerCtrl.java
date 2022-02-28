package com.roman.romanpalpal.Ctrl;

import com.roman.romanpalpal.Dto.AccountDTO;
import com.roman.romanpalpal.Dto.MailSendDTO;
import com.roman.romanpalpal.Dto.NoticeDTO;
import com.roman.romanpalpal.Dto.QnAListDTO;
import com.roman.romanpalpal.Service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ManagerCtrl {

    @Autowired
    private final ManagerService managerService;

    public ManagerCtrl(ManagerService managerService) { this.managerService = managerService; }

    @PostMapping("api/Manage/MembersAccount")
    public ArrayList<AccountDTO> MembersAccount() {
        return managerService.membersAccount();
    }

    @PostMapping("api/Manage/AddNotice")
    public String AddNotice(@RequestParam String title, String text, String writer) {
        return managerService.addNotice(title, text, writer);
    }

    @PostMapping("api/Manage/RetrieveNotice")
    public ArrayList<NoticeDTO> RetrieveNotice() {
        return managerService.retrieveNotice();
    }

    @PostMapping("api/Manage/RemoveNotice")
    public String RemoveNotice(@RequestParam int[] selected, String writer) {
        return managerService.removeNotice(selected, writer);
    }

    @PostMapping("api/Manage/RetrieveQnA")
    public ArrayList<QnAListDTO> RetrieveQnA() {
        return managerService.retrieveQnA();
    }

    @PostMapping("api/Manage/AddAnswer")
    public String AddAnswer(@RequestParam int seq, String answerInput, String id) {
        return managerService.addAnswer(seq, answerInput, id);
    }

    @PostMapping("api/Manage/ModifyAnswer")
    public String ModifyAnswer(@RequestParam int seq, String modifyInput, String id) {
        return managerService.modifyAnswer(seq, modifyInput, id);
    }

    @PostMapping("api/Manage/AddQuestion")
    public String AddQuestion(@RequestParam String questionTitle, String questionContent, String id, String name) {
        return managerService.addQuestion(questionTitle, questionContent, id, name);
    }

    @PostMapping("api/Manage/SendMailAllUser")
    public String SendMail(@RequestParam String sendTitle, String sendContent, String name) {
        MailSendDTO mailSendDTO = new MailSendDTO();

        mailSendDTO.setContent(sendContent);
        mailSendDTO.setTitle(sendTitle);
        mailSendDTO.setName(name);

        return managerService.sendMail(mailSendDTO);
    }



}
