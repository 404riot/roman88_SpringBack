import React from 'react';

import '../styles/DetailContentsStyle.css';
import Selector from './Selector';

import sample_1 from '../contentsSample/LogoTshirts-1.jpeg';
import sample_2 from '../contentsSample/LogoTshirts-2.jpeg';
import sample_3 from '../contentsSample/LogoTshirts-3.jpeg';
import sample_4 from '../contentsSample/LogoTshirts-4.jpeg';
import sample_5 from '../contentsSample/LogoTshirts-5.jpeg';
import sample_6 from '../contentsSample/LogoTshirts-6.jpeg';
import sample_7 from '../contentsSample/LogoTshirts-7.jpeg';
import sample_8 from '../contentsSample/LogoTshirts-8.jpeg';
import sample_9 from '../contentsSample/LogoTshirts-9.jpeg';
import sample_10 from '../contentsSample/LogoTshirts-10.jpeg';
import sample_11 from '../contentsSample/LogoTshirts-11.jpeg';
import sample_12 from '../contentsSample/LogoTshirts-12.jpeg';
import sample_13 from '../contentsSample/LogoTshirts-13.jpeg';
import sample_14 from '../contentsSample/LogoTshirts-14.jpeg';
import {useLocation} from 'react-router';

const DetailContents = ({ history }) => {

    window.scrollTo(0,0);

    const location = useLocation();

    // contents에서 axios로 받아온 modelInfo data 중 color. (colorSelector의 props객체)
    var color =  location.state.model.model.modelColor;
    var colorKind = color.split(' ');

    // contents에서 axios로 받아온 modelInfo data 중 size. (sizeSelector의 props객체)
    var size = location.state.model.model.modelSize;
    var sizeKind = size.split(' ');
    var sizeSumm = location.state.model.model.modelSizeSummary;
    var sizeSummKind = sizeSumm.split(' ');

    const dressThumbnail = {
        thumnailBlack : sample_3,
        thumnailWhite : sample_2 
    };

    const dressColor = [
        { color : '' },
        { color : '' }
    ];

    const dressSize = [
        { sizeSummary : '', size : '' },
        { sizeSummary : '', size : '' },
        { sizeSummary : '', size : '' },
        { sizeSummary : '', size : '' },
    ];
    
    // set selector color
    for(var index in colorKind) {
        dressColor[index].color = colorKind[index];
    }

    // set selector size
    for(var index in sizeKind) {
        dressSize[index].size = sizeKind[index];
        dressSize[index].sizeSummary = sizeSummKind[index];
    }

    return (
        <div>
            <div class = 'detailContentsContainer' >
                <div class = 'detailShot'>
                    <img id = 'thumnail-size' src = {sample_1} />

                    <div class = 'productExContainer'>
                        <h1 class = 'productEx1'> ROMAN88 </h1>
                        <h1 class = 'productEx2'>  2021 S/S COLECTION </h1>
                        <h1 class = 'productEx3'> LOGO T SHIRTS </h1>

                        <p class = 'productText'> 로망팔팔 첫 번째 컬렉션 로고 티셔츠입니다.</p>
                        <p class = 'productText'> 릴렉스한 핏으로 제작되었으며 </p>
                        <p class = 'productText'> 편안한 착용감과 이목을 끄는 프린팅의 디자인입니다.</p>
                    </div>

                    <img id = 'detail-size' src = {sample_2} />
                    <img id = 'detail-size' src = {sample_3} />
                    <img id = 'detail-size' src = {sample_4} />
                    <img id = 'detail-size' src = {sample_5} />
                    <img id = 'detail-size' src = {sample_6} />
                    <img id = 'detail-size' src = {sample_7} />
                    <img id = 'detail-size' src = {sample_8} />
                    <img id = 'detail-size' src = {sample_9} />
                    <img id = 'detail-size' src = {sample_10} />
                    <img id = 'detail-size' src = {sample_11} />
                    <img id = 'detail-size' src = {sample_12} />
                    <img id = 'detail-size' src = {sample_13} />
                    <img id = 'detail-size' src = {sample_14} />
                </div>

                <div class = 'select'>
                    <Selector history = {history} dressThumbnail = {dressThumbnail} dressColor = {dressColor} dressSize = {dressSize} model = {location.state.model}/>
                </div>

            </div>
        </div>
    );
}

export default DetailContents;