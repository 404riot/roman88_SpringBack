import React, {useState, useCallback, useEffect} from 'react';
import $ from 'jquery';
import axios from 'axios';

import '../styles/SelectorStyle.css';

import SizeSelector from '../Selector/SizeSelector';
import ColorSelector from '../Selector/ColorSelector';
import Counter from '../Selector/Counter';

import cart from '../sampleIcons/cart2.svg';
import heart from '../sampleIcons/heart.svg';

const Selector = ({history, dressThumbnail, dressColor, dressSize, model}) => {
    
    const [psc, setPsc] = useState(1);
    const [price, setPrice] = useState(model.model.modelPrice);
    const [modelFullNo, setModelFullNo] = useState('');
    const [inputs, setInputs] = useState({
        color : '',
        size : ''
    });

    const {color, size} = inputs;
    
    const onChange = (e) => {
        
        const { value, name } = e.target;
        var fullModelName = model.model.modelNo;
        
        if(value == 'small') {
            setModelFullNo(fullModelName + 'S');
        } else if( value == 'medium') {
            setModelFullNo(fullModelName + 'M');
        } else if( value == 'large') {
            setModelFullNo(fullModelName + 'L');
        } else if( value == 'xlarge') {
            setModelFullNo(fullModelName + 'XL');
        } else if( value == 'xxlarge') {
            setModelFullNo(fullModelName + 'XXL');
        }

        setInputs({
            ...inputs,
            [name]:value
        });
        
    };
    
    const onIncrease = useCallback(() => {
        setPsc(psc + 1);
        setPrice(price + 32000);
    });
    
    const onDecrease = useCallback(() => {
        if(psc <= 1) {
            setPsc(1);
        } else {
            setPsc(psc - 1);
            setPrice(price - 32000);
        }
    });

    function sendOrder({history}) {

        // axios에서 받아온 기본 data에 user가 선택한 데이터로 수정하여 재저장.
        const orderColor = inputs.color;
        const orderSize = inputs.size;
        const orderPsc = psc;
        const orderModelNo = modelFullNo;
        const orderPrice = price;

        // modelName, price는 고정값이므로 axios에서 받아온 data 사용
        const orderModelName = model.model.modelName;
        const orderModelPrice = model.model.modelPrice;

        // aws storage에 img집어넣으면 그 때 수정할거.
        let thumnailShot = '';
        if(orderColor == 'black') {
            thumnailShot = dressThumbnail.thumnailBlack;
        } else if(orderColor == 'white') {
            thumnailShot = dressThumbnail.thumnailWhite;
        }

        const orders = {
            orderColor,
            orderSize,
            orderPsc,
            orderModelNo,
            orderPrice,
            orderModelName,
            orderModelPrice,
            thumnailShot
        };

        if(orderColor == '') {
            alert('[색상] 옵션을 선택해 주세요.');
        } else if(orderSize == '') {
            alert('[사이즈] 옵션을 선택해 주세요. ');
        } else if(sessionStorage.getItem("sessionInfo") == null) {
            history.push({ pathname : '/signInPage'})
        } else {
            return (
                history.push({
                    pathname : '/buy',
                    state : { orderInfo : orders }
                })
            );
        }
    }    

    const addCart = () => {
        // axios에서 받아온 기본 data에 user가 선택한 데이터로 수정하여 재저장.
        const orderColor = inputs.color;
        const orderSize = inputs.size;
        const orderPsc = psc;
        const orderModelNo = modelFullNo;
        const orderPrice = price;

        // modelName, price는 고정값이므로 axios에서 받아온 data 사용
        const orderModelName = model.model.modelName;
        const orderModelPrice = model.model.modelPrice;

        // aws storage에 img집어넣으면 그 때 수정할거.
        // let thumnailShot = '';
        
        // if(orderColor == 'black') {
        //     thumnailShot = dressThumbnail.thumnailBlack;
        // } else if(orderColor == 'white') {
        //     thumnailShot = dressThumbnail.thumnailWhite;
        // }

        const id = sessionStorage.getItem("id");
        const seq = sessionStorage.getItem("seq");

        if(orderColor == '') {
            alert('[색상] 옵션을 선택해 주세요.');
        } else if(orderSize == '') {
            alert('[사이즈] 옵션을 선택해 주세요. ');
        } else if(sessionStorage.getItem("sessionInfo") == null) {
            history.push({ pathname : '/signInPage'})
        } else {

            // Backend server
            axios.post('/api/modelInfo/AddCart', null, { params : {
                id,
                seq,
                orderColor,
                orderSize,
                orderPsc,
                orderModelNo,
                orderPrice,
                orderModelName,
                orderModelPrice
            }}).then((response) => {

                if(response.data == "addToCart") {
                   
                    alert("CART에 추가되었습니다. profile - MYCART에서 확인하실 수 있습니다.");
                    
                } else if(response.data == "failed") {
                    alert("되겠냐 씹년아");
                }
            });
        }
    }

    $(function(){
        $(window).scroll(function(){  
            var rollIt = $(this).scrollTop() >= 1000; 
            var windowSize = $(window).width();

            if(rollIt){ 
                // scroll down
                if(windowSize >= 1400 && windowSize <= 1800){
                    $(".selector").css({"marginLeft":"63%"});    
                }else if(windowSize > 1800 && windowSize <= 1920) {
                    $(".selector").css({"marginLeft":"57%"});    
                } else if(windowSize > 1920 && windowSize <= 2560) {
                    $(".selector").css({"marginLeft":"60%"});    
                }
                
            } else {
                // scroll up
                if(windowSize >= 1400 && windowSize <= 1800){
                    $(".selector").css({"marginLeft":"45%"});  
                }else if(windowSize > 1800 && windowSize <= 1920) {
                    $(".selector").css({"marginLeft":"45%"});    
                } else if(windowSize > 1920 && windowSize <= 2560) {
                    $(".selector").css({"marginLeft":"35%"});    
                } 
                
            }
        });
    });

    
    return (
            <div class = 'selectContainer'>
                <div class = 'selector'>
                    <h5 id = 'title'> ROMAN88 / model no. {model.model.modelNo} </h5> 
                    <p id = 'dressName' > {model.model.modelName} </p> 
                    
                    <p  id = 'price' > KRW {model.model.modelPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </p>
                    <hr id = 'bar1' />

                    <ColorSelector dressColor = {dressColor} props = {onChange} />
                                
                    <Counter plus = {onIncrease} minus = {onDecrease} psc = {psc} />

                    <SizeSelector dressSize = {dressSize} props = {onChange} />
                    
                    <hr id = 'bar2' />

                    <div class = 'selectorContainer'>
                        <h4> order </h4>
                        <div class = 'selectorMenu'>
                            <div class = 'colorText'>
                                <p> {color} </p>
                            </div>
                            <div class = 'pscText'>
                                <p> {psc} </p>
                            </div>
                            <div class = 'sizeText' >
                                <p> {size} </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 id = 'total' > total </h4>
                        <p id = 'totalPrice'> {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </p>
                    </div>

                    <hr id = 'bar3' />

                    <div>
                        <div class = 'buy' onClick = { () => sendOrder({history})}>
                            <p  id = 'buyButton'> BUY NOW </p>
                            <img src = {heart} id = 'buyImg' />       
                        </div>

                        <div class = 'buy' onClick = {addCart} id = 'cartContainer'>
                            <p id = 'cartButton'> ADD CART </p>
                            <img src = {cart} id = 'cartImg' />
                        </div>
                    </div>

                </div>


            </div>
    )
}

export default React.memo(Selector);