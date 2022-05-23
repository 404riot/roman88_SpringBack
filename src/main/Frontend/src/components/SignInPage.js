import React, {useState} from 'react';

import axios from 'axios';
import $ from 'jquery';
import MainTop from './MainTop';
import '../styles/SignInStyle.css';

const SignInPage = ({ history }) => {

    const [inputInfo, setInputInfo] = useState({
        id : '',
        pw : ''
    });

    const onChange = (e) => {
        
        const { value, name } = e.target;
        
        setInputInfo({
            ...inputInfo,
            [name]:value
        });
    }

    const SignInUser = () => {
        
        const {id, pw} = inputInfo;
        axios.post('/api/Sign/SignAccount', null, { params : {
            id,
            pw
        }}).then((response) => {

            if(!response.data.sessionInfo) {
                alert("등록되지 않은 계정이거나 아이디 혹은 비밀번호가 일치하지 않습니다.");

            } else {
                sessionStorage.setItem("sessionInfo", response.data.sessionInfo);
                sessionStorage.setItem("seq", response.data.SignedUserSeq);
                sessionStorage.setItem("name", response.data.SignedUserName);
                sessionStorage.setItem("id", response.data.SignedUserId);
                sessionStorage.setItem("password", response.data.SignedUserPassword);
                sessionStorage.setItem("address", response.data.SignedUserAddress);
                sessionStorage.setItem("postCode", response.data.SignedUserPostCode);
                sessionStorage.setItem("phoneNumber", response.data.SignedUserPhoneNumber);
                sessionStorage.setItem("email", response.data.SignedUserEmail);
                sessionStorage.setItem("auth", response.data.SignedUserAuth);

                document.location.href = "/";
                return <MainTop /> 
            }

        });
    

    }

    // window.onload=function(){
    //     var inputPw = document.getElementById("pwForPressEnter");

    //     inputPw.addEventListener("keyup", function(event) {
    //         if (event.keyCode === 13) {
    //             event.preventDefault();
    //             SignInUser();
    //         }
    //     }); 
    // }

    return(
            <div class = 'SignInBox' >
                <h4> Check Account</h4>
                <hr style = {{ border : '0.5px solid black', marginTop : '-15px' }}/>

                <div className="inputId">
                    <input name="id" id = "sign" className={
                        inputInfo.id.length < 1
                        ? `id__input`
                        : `id__input id__input-active`
                    }
                    onChange={ onChange }
                    type="text"
                    value={inputInfo.id}
                    maxLength = '15'
                    />
                    <label for="name" className="target__label" >ID</label> 
                </div>   

                <div className="inputPw" >
                    <input name="pw" className={
                        inputInfo.pw.length < 1
                        ? `pw__input`
                        : `pw__input pw__input-active`
                    }
                    onChange={ onChange }
                    type="password"
                    maxLength = '15'
                    value={inputInfo.pw}
                    id = "pwForPressEnter"
                    />
                    <label for="name" className="target__label">PASSWORD</label> 
                </div>

                <div className = 'findContainer'>
                    
                </div>

                <div className = 'userCheck' id = "loginButtonEnter">
                    <button class = 'checkBtn' onClick = {SignInUser}> Login </button>
                </div>

                {/* <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div> */}


            </div>
    )
}
export default SignInPage;