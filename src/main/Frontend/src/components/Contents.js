import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../styles/MainContentsStyle.css';
import sample_1 from '../contentsSample/LogoTshirts-1.jpeg';
import sample_3 from '../contentsSample/LogoTshirts-2.jpeg';
import sample_4 from '../contentsSample/LogoTshirts-3.jpeg';
import sample_5 from '../contentsSample/LogoTshirts-14.jpeg';

const Contents = ({ history }) => {    

    window.scrollTo(0,0);

    const [model, setModel] = useState({
        modelName : "",
        modelNo : "",
        modelColor : "",
        modelSize : "",
        modelPrice : 0,
        modelSizeSummary : ""
    });

    useEffect(() => {
        axios.post('api/modelInfo').then((response) => {
            setModel(response.data);
        });
    },[]);

    return (
        <div class = 'MainContentsContainer'>
            
            <div class = 'Contents'>
                <img id = 'Contents-size' style = {{cursor : 'pointer'}} src = {sample_1} onClick = { 
                    () => {history.push({ 
                            pathname : '/detail/', 
                            state : { model : {model}}
                           })
                          }   
                    } 
                />
                <h4> {model.modelName} </h4>
                <h5> KRW {model.modelPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </h5>
            </div>

            <div class = 'Contents-right'>
                <img id = 'Contents-size' src = {sample_3} />
                <h4  > SAMPLE-A </h4>
                <h5 > KRW 32,000 </h5>
            </div>

            <div class = 'Contents'>
                <img id = 'Contents-size' src = {sample_4} />
                <h4> SAMPLE-B </h4>
                <h5> KRW 32,000 </h5>
            </div>

            <div class = 'Contents-right'>
                <img id = 'Contents-size' src = {sample_5}/>
                <h4  > 길거리 헌팅 100% </h4>
                <h5  > KRW 32,000 </h5>
            </div>
           
        </div>
    );
}


export default Contents;
