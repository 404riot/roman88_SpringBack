package com.roman.romanpalpal.Dto;

import java.text.SimpleDateFormat;
import java.util.Date;

public class QnAListDTO {

    private int seq;
    private String id;
    private String name;
    private String title;
    private String contents;
    private String registerDate;
    private String answer;

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String regDate = simpleDateFormat.format(registerDate);
        this.registerDate = regDate;
    }
}
