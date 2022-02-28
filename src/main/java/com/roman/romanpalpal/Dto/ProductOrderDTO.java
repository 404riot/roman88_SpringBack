package com.roman.romanpalpal.Dto;

public class ProductOrderDTO {

    private int modelSeq;
    private String id;
    private int seq;
    private String orderColor;
    private String orderSize;
    private int orderPsc;
    private String orderModelNo;
    private int orderPrice;
    private String orderModelName;
    private String orderModelPrice;

    public int getModelSeq() { return modelSeq; }

    public void setModelSeq(int modelSeq) { this.modelSeq = modelSeq; }

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public int getSeq() { return seq; }

    public void setSeq(int seq) { this.seq = seq; }

    public String getOrderColor() {
        return orderColor;
    }

    public void setOrderColor(String orderColor) { this.orderColor = orderColor; }

    public String getOrderSize() {
        return orderSize;
    }

    public void setOrderSize(String orderSize) {
        this.orderSize = orderSize;
    }

    public int getOrderPsc() {
        return orderPsc;
    }

    public void setOrderPsc(int orderPsc) {
        this.orderPsc = orderPsc;
    }

    public String getOrderModelNo() {
        return orderModelNo;
    }

    public void setOrderModelNo(String orderModelNo) {
        this.orderModelNo = orderModelNo;
    }

    public int getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(int orderPrice) { this.orderPrice = orderPrice; }

    public String getOrderModelName() {
        return orderModelName;
    }

    public void setOrderModelName(String orderModelName) {
        this.orderModelName = orderModelName;
    }

    public String getOrderModelPrice() {
        return orderModelPrice;
    }

    public void setOrderModelPrice(String orderModelPrice) {
        this.orderModelPrice = orderModelPrice;
    }
}
