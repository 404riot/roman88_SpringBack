package com.roman.romanpalpal.Ctrl;

import com.roman.romanpalpal.Dto.DressModelDTO;
import com.roman.romanpalpal.Dto.ProductOrderDTO;
import com.roman.romanpalpal.Service.DressModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DressModelCtrl {

    @Autowired
    private final DressModelService dressModelService;

    public DressModelCtrl(DressModelService dressModelService) {
        this.dressModelService = dressModelService;
    }

    @PostMapping("api/modelInfo")
    public DressModelDTO DressThumbnailData() {
        return dressModelService.getDressInfo();
    }

    @PostMapping("api/modelInfo/AddCart")
    public String addCart(@RequestParam String id, int seq, String orderColor, int orderPsc, String orderSize, String orderModelNo, int orderPrice, String orderModelName, String orderModelPrice) {

        ProductOrderDTO productOrder = new ProductOrderDTO();
        String addCartResult = "";

        productOrder.setId(id);
        productOrder.setSeq(seq);
        productOrder.setOrderColor(orderColor);
        productOrder.setOrderPsc(orderPsc);
        productOrder.setOrderSize(orderSize);
        productOrder.setOrderModelNo(orderModelNo);
        productOrder.setOrderPrice(orderPrice);
        productOrder.setOrderModelName(orderModelName);
        productOrder.setOrderModelPrice(orderModelPrice);

        if(dressModelService.addOrderInCart(productOrder) == 1) {
            addCartResult = "addToCart";
        } else {
            addCartResult = "failed";
        }

        return addCartResult;
    }

    @PostMapping("api/modelInfo/GetCart")
    public ArrayList<ProductOrderDTO> getCart(@RequestParam String id, String seq) {

        return dressModelService.getOrderInCart(id, seq);
    }

    // data of selected is serialization.
    @PostMapping("api/modelInfo/RemoveTable")
    public String removeTable(@RequestParam String id, int seq, int[] selected) {

        return dressModelService.removeSelectedTable(id, seq, selected);
    }

}
