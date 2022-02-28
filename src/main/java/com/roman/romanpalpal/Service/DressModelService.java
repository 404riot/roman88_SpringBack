package com.roman.romanpalpal.Service;

import com.roman.romanpalpal.Dto.ProductOrderDTO;
import com.roman.romanpalpal.Dto.RemoveTableDTO;
import com.roman.romanpalpal.Mapper.DressModelMapper;
import com.roman.romanpalpal.Dto.DressModelDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

public interface DressModelService {
    DressModelDTO getDressInfo();
    int addOrderInCart(ProductOrderDTO productOrder);
    ArrayList<ProductOrderDTO> getOrderInCart(String id, String seq);
    String removeSelectedTable(String id, int seq, int[] selected);
}

@Service
class DressServiceImpl implements DressModelService {

    private final DressModelMapper dressModelMapper;

    DressServiceImpl(DressModelMapper dressModelMapper)  {
        this.dressModelMapper = dressModelMapper;
    }

    @Override
    public DressModelDTO getDressInfo() {
        return dressModelMapper.getModelInfo();
    }

    @Override
    public int addOrderInCart(ProductOrderDTO productOrder) {
        return dressModelMapper.addOrderInCart(productOrder);
    }

    @Override
    public ArrayList<ProductOrderDTO> getOrderInCart(String id, String seq) {
        return dressModelMapper.getOrderInCart(id, seq);
    }

    @Override
    public String removeSelectedTable(String id, int seq, int[] selected) {

        String result = "";
        RemoveTableDTO removeTable = new RemoveTableDTO();
        removeTable.setId(id);
        removeTable.setUserSeq(seq);

        for(int modelSeq : selected) {

            removeTable.setModelSeq(modelSeq);

            if(dressModelMapper.removeSelectedTable(removeTable) == 1) {
                result = "removed";
            } else {
                result = "failed";
                break;
            }
        }

        return result;
    }

}
