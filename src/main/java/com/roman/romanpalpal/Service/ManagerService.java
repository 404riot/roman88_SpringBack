package com.roman.romanpalpal.Service;

import com.roman.romanpalpal.Dto.*;
import com.roman.romanpalpal.Mapper.ManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.ArrayList;

public interface ManagerService {
    ArrayList<AccountDTO> membersAccount();
    String addNotice(String title, String contents, String writer);
    ArrayList<NoticeDTO> retrieveNotice();
    String removeNotice(int[] selected, String writer);
    ArrayList<QnAListDTO> retrieveQnA();
    String addAnswer(int seq, String answerInput, String id);
    String modifyAnswer(int seq, String modifyInput, String id);
    String addQuestion(String questionTitle, String questionContent, String id, String name);
    String sendMail(MailSendDTO mailSendDTO);
}
@Service
class ManagerServiceImpl implements ManagerService {

    private static final String FROM_ADDRESS = "dhdbtjr0601@gmail.com";

    @Autowired
    private JavaMailSender mailSender;

    private final ManagerMapper managerMapper;

    @Autowired
    ManagerServiceImpl(ManagerMapper managerMapper) {
        this.managerMapper = managerMapper;
    }

    @Override
    public ArrayList<AccountDTO> membersAccount() {
        return managerMapper.membersAccount();
    }

    @Override
    public String addNotice(String title, String contents, String writer) {

        String result = "";
        if(managerMapper.addNotice(title, contents, writer) == 1) {
            result = "addNotice";
        } else {
            result = "failed";
        }
        return result;
    }

    @Override
    public ArrayList<NoticeDTO> retrieveNotice() {
        return managerMapper.retrieveNotice();
    }

    @Override
    public String removeNotice(int[] selected, String writer) {

        String result = "";

        RemoveNoticeDTO removeNoticeDTO = new RemoveNoticeDTO();
        removeNoticeDTO.setWriter(writer);

        for(int seq : selected) {

            removeNoticeDTO.setSeq(seq);

            if(managerMapper.removeNotice(removeNoticeDTO) == 1) {
                result = "removed";
            } else {
                result = "failed";
            }
        }
        return result;
    }

    @Override
    public ArrayList<QnAListDTO> retrieveQnA() {
        return managerMapper.retrieveQnA();
    }

    @Override
    public String addAnswer(int seq, String answerInput, String id) {

        QnAManageVO qnAManageVO = new QnAManageVO();

        qnAManageVO.setId(id);
        qnAManageVO.setInput(answerInput);
        qnAManageVO.setSeq(seq);

        String result = "failed";

        if(managerMapper.addAnswer(qnAManageVO) == 1) {
            result = "success";
        }

        return result;
    }

    @Override
    public String modifyAnswer(int seq, String modifyInput, String id) {

        QnAManageVO qnAManageVO = new QnAManageVO();

        qnAManageVO.setId(id);
        qnAManageVO.setInput(modifyInput);
        qnAManageVO.setSeq(seq);

        String result = "failed";

        if(managerMapper.modifyAnswer(qnAManageVO) == 1) {
            result = "success";
        }
        return result;
    }

    @Override
    public String addQuestion(String questionTitle, String questionContent, String id, String name) {

        String result = "failed";

        if(managerMapper.addQuestion(questionTitle, questionContent, id, name) == 1) {
            result = "success";
        }
        return result;
    }


    // 이새끼 속도 상당히 느린데, 대안책 생각하기.

    @Override
    public String sendMail(MailSendDTO mailSendDTO) {

        ArrayList<String> mails = managerMapper.getUsersMail();

        MimeMessagePreparator[] preparators = new MimeMessagePreparator[mails.size()];
        int i = 0;

        for(final String mail : mails) {

            preparators[i++] = new MimeMessagePreparator() {
                @Override
                public void prepare(MimeMessage mimeMessage) throws Exception {

                    final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                    helper.setFrom(FROM_ADDRESS);
                    helper.setTo(mail);
                    helper.setSubject(mailSendDTO.getTitle());
                    helper.setText(mailSendDTO.getContent(), true);

                }
            };

            System.out.println("send ---------------" + i);

        }

        mailSender.send(preparators);

        return "success";

    }
}