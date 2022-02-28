package com.roman.romanpalpal.Dto;

public class RemoveTableDTO {

    private String id;
    private int userSeq;
    private int modelSeq;

    public String getId() { return id; }

    public void setId(String id) {
        this.id = id;
    }

    public int getUserSeq() {
        return userSeq;
    }

    public void setUserSeq(int userSeq) {
        this.userSeq = userSeq;
    }

    public int getModelSeq() {
        return modelSeq;
    }

    public void setModelSeq(int modelSeq) {
        this.modelSeq = modelSeq;
    }
}
