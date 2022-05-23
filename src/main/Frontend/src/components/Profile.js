import React, { Fragment, useState } from 'react';
import axios from 'axios';

import '../styles/ProfileStyle.css';

const Profile = ({ history }) => {

    if(sessionStorage.getItem("sessionInfo") == null) {
        history.push("/signInPage");
    }

    const prevAccountInfo = {
        seq : sessionStorage.getItem("seq"),
        id : sessionStorage.getItem("id"),
        name : sessionStorage.getItem("name"),
        pw : sessionStorage.getItem("password"),
        address : sessionStorage.getItem("address"),
        postCode : sessionStorage.getItem("postCode"),
        phoneNumber : sessionStorage.getItem("phoneNumber"),
        email : sessionStorage.getItem("email")
    }
    

    const [signedAccountInfo, setSignedAccountInfo] = useState({
        name : sessionStorage.getItem("name"),
        pw : sessionStorage.getItem("password"),
        address : sessionStorage.getItem("address"),
        postCode : sessionStorage.getItem("postCode"),
        phoneNumber : sessionStorage.getItem("phoneNumber"),
        email : sessionStorage.getItem("email")
    });

    const onChange = (e) => {

        const {value, name} = e.target;

        setSignedAccountInfo({
            ...signedAccountInfo,
            [name]:value
        });

    }

    const AccountChange = () => {
        if(
           prevAccountInfo.name == signedAccountInfo.name &&
           prevAccountInfo.pw == signedAccountInfo.pw &&
           prevAccountInfo.address == signedAccountInfo.address &&
           prevAccountInfo.postCode == signedAccountInfo.postCode &&
           prevAccountInfo.phoneNumber == signedAccountInfo.phoneNumber &&
           prevAccountInfo.email == signedAccountInfo.email
        ) {
            alert("변경된 사항이 없습니다. 기존 정보를 유지합니다.");
            document.location.href = "/Profile";
        } else {

            const {name, pw, address, postCode, phoneNumber, email} = signedAccountInfo;
            const id = prevAccountInfo.id;
            const seq = prevAccountInfo.seq;

            if(window.confirm("수정한 정보로 변경됩니다.")) {

                axios.post('/api/Sign/AccountModify', null, { params : {
                    seq,
                    id,
                    name,
                    pw,
                    address,
                    postCode,
                    phoneNumber,
                    email
                }}).then((response) => {

                    if(response.data.updateResult == "success") {
                        
                        sessionStorage.setItem("sessionInfo", response.data.sessionInfo);
                        sessionStorage.setItem("seq", response.data.SignedUserSeq);
                        sessionStorage.setItem("name", response.data.SignedUserName);
                        sessionStorage.setItem("id", response.data.SignedUserId);
                        sessionStorage.setItem("password", response.data.SignedUserPassword);
                        sessionStorage.setItem("address", response.data.SignedUserAddress);
                        sessionStorage.setItem("postCode", response.data.SignedUserPostCode);
                        sessionStorage.setItem("phoneNumber", response.data.SignedUserPhoneNumber);
                        sessionStorage.setItem("email", response.data.SignedUserEmail);

                        alert("변경되었습니다.");
                        document.location.href = "/Profile";
                    } else if(response.data.updateResult == "failed") {
                        alert("되겠냐 씹년아");
                    }
                });

            } else {
                // deny
                document.location.href = "/Profile";
            } 
        }
    }

    const manageMenuMembers = () => {
        history.push("/membersManage");
    }

    const manageMenuNotice = () => {
        history.push("/noticeManage");
    }

    const manageMenuContact = () => {
        history.push("/emailSend");
    }

    const manageMenuPopUp = () => {
        history.push("/popUpManage");
    }

    const ManagerContents = () => {

        if(sessionStorage.getItem("auth") == "manager") {
            return (
                <div class = "managersContainer">
                    <h4> For Managers </h4>
                    <hr style = {{ border : '0.5px solid black', marginTop : '-15px' }}/>

                    <div class = "membersButton" onClick = {manageMenuMembers}>
                        <p id = "membersButtonText"> MEMBERS </p>
                    </div>

                    <div class = "noticeButton" onClick = {manageMenuNotice}>
                        <p id = "noticeButtonText"> NOTICE </p>
                    </div>

                    <div class = "contactButton" onClick  = {manageMenuContact}>
                        <p id = "contactButtonText"> SEND MAIL </p>
                    </div>

                    <div class = "popUpButton">
                        <p id = "popUpButtonText"> POP UP </p>
                    </div>
                </div>
            );
        } else {
            // empty container
            return(
                <Fragment>
    
                </Fragment>            
            )
        }

    }

    const MyCart = () => {
        history.push("/MyCart");
    }

    return (
        <div>
            <div class = "profileContainer">
                <h4>Account Profile</h4>
                <hr style = {{ border : '0.5px solid black', marginTop : '-15px' }}/>

                <div class = "profileInfoColummContainer">

                    <p id = "profileInfoContainersText"> NAME </p>
                    <p id = "profileInfoContainersText"> ID </p>
                    <p id = "profileInfoContainersText"> PASSWORD </p>
                    <p id = "profileInfoContainersText_textArea"> ADDRESS </p>
                    <p id = "profileInfoContainersText_underTextArea"> POSTCODE </p>
                    <p id = "profileInfoContainersText"> PHONE </p>
                    <p id = "profileInfoContainersText"> EMAIL </p>
                  
                </div>

                <div class = "profileInfoValueContainer" >
                    <input class = "infoValuesInput" name = "name" type = "text" value = {signedAccountInfo.name} onChange = {onChange}/>
                    <input class = "infoValuesInput" readOnly = "true" name = "id" type = "text" value = {prevAccountInfo.id}/>
                    <input class = "infoValuesInput" name = "pw" type = "password" value = {signedAccountInfo.pw} onChange = {onChange}/>
                    <textarea class = "infoValuesInputArea" name = "address" type = "text" value = {signedAccountInfo.address} onChange = {onChange}/>
                    <input class = "infoValuesInput" name = "postCode" type = "text" value = {signedAccountInfo.postCode} onChange = {onChange}/>
                    <input class = "infoValuesInput" name = "phoneNumber" type = "text" value = {signedAccountInfo.phoneNumber} onChange = {onChange}/>
                    <input class = "infoValuesInput" name = "email" type = "text" value = {signedAccountInfo.email} onChange = {onChange}/>
                </div>

                <div class = "buttonContainer">

                    <div class = "cartButton" onClick = {MyCart}> 
                        <p id = "cartButtonText" > MY CART </p> 
                    </div>

                    <div class = "modifyButton" onClick = {AccountChange}>
                        <p id = "modifyButtonText"> MODIFY</p>
                    </div>

                    <div class = "historyButton">
                        <p id = "historyButtonText" > PURCHASE HISTORY </p>
                    </div>
                </div>

                
                <ManagerContents />
        

            </div>

        </div>
    );

}

export default Profile;