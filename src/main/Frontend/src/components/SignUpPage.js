import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import $ from 'jquery';

import '../styles/SignUpStyle.css';
import { typeOf } from 'react-is';

const SignUpPage = ({history}) => {

    window.scrollTo(0,0);

    // Email 직접입력시 input 접근용 ref
    const emailInput = useRef();

    const [inputValue, setValue] = useState({
        name : '',
        id : '',
        pw : '',
        pwcheck : '',
        inputAddr : '',
        address : '',
        postCode : '',
        phoneNumber : '',
        email : '',
        emailSelector : '',
        emailAddress : '',
        fullEmail : ''
    });

    const [overlap, setOverlap] = useState('overlap');

    // 각 input의 onChange
    const onChange = (e) => {
        
        const { value, name } = e.target;
        if(value == 'self') {
            emailInput.current.value = '';
            emailInput.current.readOnly = false;
            emailInput.current.focus();
        } else if(value == 'gmail.com' || value == 'naver.com' || value == 'daum.com' || value == 'outlook.com' || value == 'nate.com') {
            emailInput.current.readOnly = true;
            setValue({
                ...inputValue,
                [name]:value
            });
        } else {
            setValue({
                ...inputValue,
                [name]:value
            });
        }
        
    }

    // daum-kakao post api에서 우편번호랑 주소 받아올 state
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');

    const addressAdd = (address, zonecode) => {
        setAddress(address);
        setPostCode(zonecode);
    }

    // api popup
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
    const closePostCode = () => {
        setIsPopupOpen(false)
    }


    // Regular Expression 
    const RegexName = () => {
        var regexName = inputValue.name.replace(/[^ㄱ-ㅎ가-힣a-z]/g, "");
        inputValue.name = regexName;
    }

    const RegexId = () => {
        var regexId = inputValue.id.replace(/[^a-z0-9]/g,"");

        if(regexId.length <  6) {
            $(".id__input-active").css({"borderBottom":"1px solid red"}); 

            // 아래는 overlap check에 관하여
        } else if(overlap == "overlap") {
            $(".id__input-active").css({"borderBottom":"1px solid red"}); 
        } else {
            $(".id__input-active").css({"borderBottom":"1px solid black"}); 
        }
        inputValue.id = regexId;
    }

    const RegexPassword = () => {
        var regexPassword = inputValue.pw.replace(/[^a-z0-9]/g,"");

        if(regexPassword.length <  6) {
            $(".pw__input-active").css({"borderBottom":"1px solid red"}); 
        } else {
            $(".pw__input-active").css({"borderBottom":"1px solid black"}); 
        }
        inputValue.pw = regexPassword;
    }

    const RegexPasswordCheck = () => {
        var regexPasswordCheck = inputValue.pwcheck.replace(/[^a-z0-9]/g,"");

        if(regexPasswordCheck.length <  6 || inputValue.pw != regexPasswordCheck) {
            $(".pw__input-active").css({"borderBottom":"1px solid red"}); 
        } else {
            $(".pw__input-active").css({"borderBottom":"1px solid black"}); 
        }
        inputValue.pwcheck = regexPasswordCheck;
    }


    const RegexPhoneNumber = () => {
        var regexPhoneNumber = inputValue.phoneNumber.replace(/[^0-9]/g, "");
        inputValue.phoneNumber = regexPhoneNumber;
    }

    const RegexEmail = () => {
        var regexEmail = inputValue.email.replace(/[^a-z0-9-_]/g,"");

        if(inputValue.email.match(regexEmail) != null) {
            $(".email__input-active").css({"borderBottom":"1px solid black"}); 
        } else {
            $(".email__input-active").css({"borderBottom":"1px solid red"}); 
        }
        inputValue.email = regexEmail;
    }

    const RegexEmailInput = () => {
        var regexEmailInput = inputValue.emailSelector.replace(/((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,"");
        if(inputValue.emailSelector.match(regexEmailInput) != null ) {
            var emailAddress = inputValue.email + '@' + inputValue.emailSelector;
            var emailPattern  = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  
            if(emailAddress.match(emailPattern) != null) {
                $(".emailInput").css({"borderBottom":"1px solid black"});
                $(".email__input-active").css({"borderBottom":"1px solid black"}); 
            } else { 
                $(".emailInput").css({"borderBottom":"1px solid red"}); 
                $(".email__input-active").css({"borderBottom":"1px solid red"}); 
            }
        
        }
    }

    const createUser = () => {
        if(inputValue.name == '') {
            alert('이름을 입력해주세요.');
            return false;
        } else if(inputValue.id.length < 6) {
            alert('ID를 입력하지 않았거나 유효하지 않은 ID입니다.');
            return false;
        } else if(overlap == 'overlap') { 
            alert('ID중복검사를 완료해주세요.');
        } else if(inputValue.pw.length < 6) {
            alert('PASSWORD를 입력하지 않았거나 유효하지 않은 PASSWORD입니다.');
            return false;
        } else if(inputValue.pw != inputValue.pwcheck) {
            alert('PASSWORD가 일치하지 않습니다.')
            return false;
        } else if(address == '' || postCode == '') {
            alert('주소를 입력해주세요.');
            return false;
        } else if(inputValue.inputAddr == '') {
            alert('상세주소를 입력해주세요.');
            return false;
        } else if(inputValue.phoneNumber == '') {
            alert('전화번호를 입력해주세요');
            return false;
        } else if(inputValue.email == '') {
            alert('이메일 입력좀');
            return false;
        } else {
            var email = inputValue.email + '@' + inputValue.emailSelector
            inputValue.fullEmail = email;
            inputValue.address = address + " " +  inputValue.inputAddr;
            inputValue.postCode = postCode;
            SubmitClick();
        }
    }

    const OverLapCheck = () => {

        const ID = inputValue.id;

        axios.post('/api/Sign/OverlapCheck', null, { params : { 
            ID
        }}).then((response) => {
            if(response.data == true) {
                alert("사용 가능한 ID");
                setOverlap('Notoverlap');
            } else {
                alert("ㄴㄴ불가능");
                setOverlap('overlap');
            }
        });

    }

    const SubmitClick = () => {

        const {name, id, pw, fullEmail, address, postCode, phoneNumber} = inputValue;

        axios.post('/api/Sign/CreateAccount', null, { params : {
            name,
            id,
            pw,
            fullEmail,
            address,
            postCode,
            phoneNumber
        }}).then((response) => {
            if(response.data == 1) {
                alert("로망단이 되신걸 환영합니다");
                history.push({ pathname : '/'})
            } else {
                alert("되겠냐 씹년아");
            }
        });

    }
    

    return (
        
        <div class = "group">
            <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
            <h4> Create Account </h4>
            
                <hr style = {{ border : '0.5px solid black', marginTop : '-15px' }}/>
                <div className="nameField" >
                    <input name="name" className={
                        inputValue.name.length < 1
                        ? `name__input`
                        : `name__input name__input-active`
                    }
                    onKeyPress = {RegexName(this)}
                    onChange={ onChange }
                    type="text"
                    value={inputValue.name}
                    maxLength = '10'
                    />
                    <label for="name" className="target__label"> NAME </label>         
                </div> 

                <div className="idField">
                    <input name="id" className={
                        inputValue.id.length < 1
                        ? `id__input`
                        : `id__input id__input-active`
                    }
                    onChange={ onChange }
                    onKeyUp = {RegexId(this)}
                    type="text"
                    value={inputValue.id}
                    maxLength = '15'
                    />
                    <label for="name" className="target__label" >ID (6-15자, 영문 / 영문+숫자)</label> 
                </div>   

                <div className = "overlapCheckField">
                    <button class = "overlapCheckBtn" onClick = {OverLapCheck} > ID중복체크 </button>
                </div>

                <div className="pwField" >
                    <input name="pw" className={
                        inputValue.pw.length < 1
                        ? `pw__input`
                        : `pw__input pw__input-active`
                    }
                    onKeyUp = {RegexPassword(this)}
                    onChange={ onChange }
                    type="password"
                    maxLength = '15'
                    value={inputValue.pw}
                    />
                    <label for="name" className="target__label">PASSWORD (6-15자, 영문 / 영문+숫자)</label> 
                </div>   

                <div className="pwCheckField">
                    <input name="pwcheck" className={
                        inputValue.pwcheck.length < 1
                        ? `pw__input`
                        : `pw__input pw__input-active`
                    }
                    onKeyUp = {RegexPasswordCheck(this)}
                    onChange={ onChange }
                    type="password"
                    value={inputValue.pwcheck}
                    />
                    <label for="name" className="target__label">PASSWORD CHECK</label>
                </div>  

                <div className = "addressField">
                    <p style = {{ fontSize : '13px', marginLeft : '10px', }}> ADDRESS </p>
                    <button type='button'  class = "addressSearch" onClick={openPostCode}>우편번호 검색</button>
                    <input type = 'text' class = "postCode" value = {postCode} name = 'postCode' placeholder = '우편번호'/>
                    <input type = 'text' class = "addr" value = {address} name = 'selectAddr' placeholder = '주소'/>
                    <input type = 'text' class = "addrInput" name = 'inputAddr' placeholder = '상세주소 / 상세주소가 없는 경우 공백으로 입력'
                        onChange={ onChange }
                        value={inputValue.inputAddr}
                    />
                    
                    <div class = "popupContainer">
                        <div id='popupDom'>
                            {isPopupOpen && (
                                <PopupDom>
                                    <PopupPostCode onClose={closePostCode} addrFn = {addressAdd} />
                                </PopupDom>
                            )}
                        </div>
                    </div>
                </div>

                <div className="phoneNumberField" >
                    <input name="phoneNumber" className={
                        inputValue.phoneNumber.length < 1
                        ? `target__input`
                        : `target__input target__input-active`
                    }
                    onKeyUp = {RegexPhoneNumber(this)}
                    maxLength = '11'
                    onChange={ onChange }
                    type="text"
                    value={inputValue.phoneNumber}
                    />
                    <label for="name" className="target__label">PHONE NUMBER</label>
                </div>

                <div className="emailField" >
                    <input name="email" className={
                        inputValue.email.length < 1
                        ? `email__input`
                        : `email__input email__input-active`
                    }
                    onKeyUp = {RegexEmail(this)}
                    onChange={ onChange }
                    type="text"
                    value={inputValue.email}
                    />
                    <label for="name" className="target__label" >EMAIL</label>
                </div>  

                <div class = "emailInputField">
                    @ &nbsp;&nbsp;
                    <input className = 'emailInput' 
                            onKeyUp = {RegexEmailInput(this)} 
                            name = "emailSelector"  
                            onChange={ onChange } 
                            ref = {emailInput} 
                            value = {inputValue.emailSelector}
                    />
                </div>

                <div class = 'selectField'>
                    <form name = 'form' >
                        <select name = 'emailSelector' class = "emailSelector" onChange = {onChange}>
                            <option value = 'self'> 직접입력 </option>
                            <option value = 'gmail.com'> gmail.com </option>
                            <option value = 'naver.com'> naver.com </option>
                            <option value = 'daum.com'> daum.com </option>
                            <option value = 'nate.com'> nate.com </option>
                            <option value = 'outlook.com'> outlook.com </option>
                            
                        </select>
                    </form>
                </div>

                <div class = "joinBtnContainer">
                    <button class = "joinButton" onClick = {createUser}> JOIN </button>
                </div>

        </div>

        
    );
}

export default SignUpPage;