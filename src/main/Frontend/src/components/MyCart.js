import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { qs } from 'url-parse';

import thumnailWhite from '../contentsSample/LogoTshirts-2.jpeg';
import thumnailBlack from '../contentsSample/LogoTshirts-3.jpeg';

import '../styles/CartStyle.css';

import TOS from './TOS';

const MyCart = ({ history }) => {

    if(sessionStorage.getItem("sessionInfo") == null) {
        history.push("/signInPage");
    }

    // window.scrollTo(0,0);

    const id = sessionStorage.getItem("id");
    const seq = sessionStorage.getItem("seq");

    // 이새끼 rendering시키기.
    // class 형태로 사용 - 지랄함
    // component 형태로 사용 - 지랄함
    // function return 형태로 사용 - value에서 지랄함
    // useState에 할당 후 뿌려주는 형태로 사용 - 개지랄함
    // useEffect 미사용 - state 예토전생 후 무한 츠쿠요미 걸려서 발작함
    
    const [orderCart, setOrderCart] = useState([{
        modelSeq : 0,
        orderColor : '',
        orderPsc : 0,
        orderSize : '',
        orderModelNo : '',
        orderPrice : 0,
        orderModelName : '',
        orderModelPrice : ''
    }]);

    const [trigger, setTrigger] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
        
    useEffect(async() => {

        axios.post('/api/modelInfo/GetCart', null, { params : {
            id,
            seq
        }}).then((response) => {

            if(response.data.length > 0) {

                setTrigger("items");
                const _orderCart = response.data.map((orderData) => ({
                    modelSeq : orderData.modelSeq,
                    orderColor : orderData.orderColor,
                    orderPsc : orderData.orderPsc,
                    orderSize : orderData.orderSize,
                    orderModelNo : orderData.orderModelNo,
                    orderPrice : orderData.orderPrice,
                    orderModelName : orderData.orderModelName,
                    orderModelPrice : orderData.orderModelPrice
                }));

                setOrderCart(_orderCart);

            } else {
                setTrigger("none");
            }

        })
    
    }, []);
    
    const checkedBox = () => {
        var totalPrice = 0;
        var temp = 0;
        for(var i = 0; i < document.getElementsByClassName('checkInput').length; i++){

            if(document.getElementById('checking' + orderCart[i].modelSeq).checked){

                if(orderCart[i].orderPrice < 50000) {

                    temp = orderCart[i].orderPrice + 3000;
                    
                    if(temp + totalPrice > 50000) {

                        if(totalPrice > 50000) {
                            temp -= 3000;
                            totalPrice += temp;
                        } else {
                            temp -= 3000;
                            totalPrice -= 3000;
                            totalPrice += temp;
                        }

                    } else {
                        totalPrice += temp;
                    }
                } else {

                    if(totalPrice == 0) {
                        totalPrice += orderCart[i].orderPrice;
                    } else {
                        if(temp + orderCart[i].orderPrice > 50000) {
                            if(orderCart[i].orderPrice > 50000) {
                                totalPrice += orderCart[i].orderPrice;
                            } else {
                                totalPrice -= 3000;
                                totalPrice += orderCart[i].orderPrice;
                            }
                        } else {
                            totalPrice += orderCart[i].orderPrice;
                        }
                    }
                }
            } 
        }
        setTotalPrice(totalPrice);
    };

    const deleteTable = () => {

        const selected = [];

        for(var i = 0; i < document.getElementsByClassName('checkInput').length; i++){

            if(document.getElementById('checking' + orderCart[i].modelSeq).checked){
                selected.push(orderCart[i].modelSeq);
            }

        }
        if(window.confirm("선택한 상품을 CART에서 삭제합니다. ")) {

            axios.post('/api/modelInfo/RemoveTable', null, { params : {
                selected : selected,
                id,
                seq
            },
            paramsSerializer : params => {
                return qs.stringify(params);
            }
        
            }).then((response) => {
                if(response.data == "removed") {
                    alert("삭제되었습니다.");
                    document.location.href = "/MyCart";
                } else if(response.data == "failed") {
                    alert("selected data not found in table");
                }   
            })

        } else {
            
        }
    }

    var thumnailShot = '';

    return (
        <div class = 'CartContainer'>

            <div>
                <h3> CART </h3>
                <hr style = {{ width : '100%'}} />
            </div>

            <table class = 'cartTable'>
                <th> </th>
                <th id = 'productInfoInCart'> 상품정보 </th>
                <th id = 'productPriceInCart'> 상품금액 </th>
                <th id = 'productPcsInCart'> 수량 </th>
                <th id = 'productDeliveryInCart'> 배송 </th>
                <th id = 'paymentInCart'> 결제금액 </th> 

                {
                    orderCart.map((orderData, index) => {
                
                        if(orderData.orderColor == 'black') {
                            thumnailShot = thumnailBlack;
                        } else if(orderData.orderColor == 'white') {
                            thumnailShot = thumnailWhite;
                        }

                        if(trigger == 'none') {
                            
                            return (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td> </td>
                                    <td style ={{width : '300px',textAlign : 'left'}}> <p> 추가된 상품이 없습니다.</p> </td>
                                </tr>
                            );

                        } else if(trigger == 'items') {

                            var orderPrice = orderData.orderPrice;
                            var deliOrder = 0;

                            if(orderData.orderPrice < 50000) {
                                deliOrder = 3000;
                            } else {
                                deliOrder = 0;
                            }

                            orderPrice += deliOrder;

                            return (

                                <tr>
                                    <td key = {index}>
                                        <label class = 'checker' for = {"checking" + orderData.modelSeq} >
                                            <input type="checkbox" id = {"checking" + orderData.modelSeq} class = 'checkInput' onClick = {checkedBox} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                    <td key = {index}>
                                        <img src = {thumnailShot} id = 'buyThumbnail'/>
                                        <p id = 'thumbnailText' > {orderData.orderModelName} </p> 
                                        <p id = 'thumbnailText' >Model No. {orderData.orderModelNo}</p>
                                        <p id = 'thumbnailText' >color : {orderData.orderColor} / size : {orderData.orderSize}</p>                        
                                    </td>
                                    <td key = {index}>
                                        <p id = 'tableText'>{orderData.orderModelPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p> 
                                    </td>
                                    <td key = {index}>
                                        <p id = 'tableText'>{orderData.orderPsc}</p>
                                    </td>
                                    <td key = {index}>
                                    <p id = 'tableText' name = {'deliveryPrice' + orderData.modelSeq}> {deliOrder}원 </p>
                                        <p id = 'tableDeliveryText'> (50,000원 이상 무료배송) </p>
                                    </td>
                                    <td key = {index}>
                                        <p id = 'tableText'> {orderPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </p>
                                    </td>
                                </tr>
    
                            )

                        }

                    })
                } 


            </table>

            <hr style = {{ width : '100%'}} />

            <div>
                <div class = 'cartPaymentContainer'>
                    <h3 id = 'cartNaverPayBtn'> N pay</h3>
                </div>
                <div class = 'deleteContainer' onClick = {deleteTable}>
                    <h3 id = 'deleteBtn'> DELETE</h3>
                </div>
                <h3 id = 'cartPaymentPrice'> {totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원 </h3>
                <h3 id = 'cartPaymentPrice'> Total &nbsp;</h3>
            </div>

            <TOS />

        </div>
    );
}


export default MyCart;