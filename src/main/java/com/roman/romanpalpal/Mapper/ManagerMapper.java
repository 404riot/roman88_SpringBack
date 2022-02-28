package com.roman.romanpalpal.Mapper;

import com.roman.romanpalpal.Dto.*;
import org.apache.ibatis.annotations.Mapper;
import java.util.ArrayList;

@Mapper
public interface ManagerMapper {

    ArrayList<AccountDTO> membersAccount();

    int addNotice(String title, String contents, String writer);

    ArrayList<NoticeDTO> retrieveNotice();

    int removeNotice(RemoveNoticeDTO removeNoticeDTO);

    ArrayList<QnAListDTO> retrieveQnA();

    int addAnswer(QnAManageVO qnAManageVO);
    int modifyAnswer(QnAManageVO qnAManageVO);

    int addQuestion(String questionTitle, String questionContent, String id, String name);

    ArrayList<String> getUsersMail();
}
