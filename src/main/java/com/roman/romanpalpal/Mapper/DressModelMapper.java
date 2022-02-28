package com.roman.romanpalpal.Mapper;

import com.roman.romanpalpal.Dto.DressModelDTO;
import com.roman.romanpalpal.Dto.ProductOrderDTO;
import com.roman.romanpalpal.Dto.RemoveTableDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface DressModelMapper {

    DressModelDTO getModelInfo();

    int addOrderInCart(ProductOrderDTO productOrder);

    ArrayList<ProductOrderDTO> getOrderInCart(String id, String seq);

    int removeSelectedTable(RemoveTableDTO removeTable);

}
