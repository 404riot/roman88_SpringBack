import React from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/MainTopStyle.css';
import HambergerMenu from './HambergerMenu';
import TopperSignIn from './TopperSignIn';
import TopperDefault from './TopperDefault';

export const MainTop = ({ history }) => {

    const home = () => {
        history.push('/')
    }
    
    var sessionCheck = sessionStorage.getItem("sessionInfo");

    const Topper = () => {

        if(sessionCheck != null) {
            return <TopperSignIn history = {history}/>
        } else {
            return <TopperDefault  history = {history}/>
        }
    }

    return (
        <div>
            <div class = 'topper' >
                {/* <h4 style = {{ marginRight : '15%'}} id = 'topper-text' onClick = {signIn}> &nbsp;&nbsp; sign in </h4>
                <h4 id = 'topper-text' onClick = {signUp}> sign up &nbsp; | </h4>
                <h4 class = 'slogan'> GO TELL IT WE MADE IT </h4> */}
                <Topper />
            </div>

            <div class = 'MainContainer'>
                <div class = 'container'>  
                    <div class = 'container-left'>
                        <div class = 'logo' onClick = { home } >
                            ROMAN88
                        </div>

                        <div class = 'menu' >
                            <h4 id = 'menu-text'  onClick = { () => {history.push({ pathname : '/contents'})}}> T SHIRTS</h4>
                        </div>
                    </div>

                    <div class = 'container-right'>
                        <HambergerMenu history = {history}/>
                    </div>

                </div>
                
            </div>

        </div>
    );
}

export default withRouter(MainTop);