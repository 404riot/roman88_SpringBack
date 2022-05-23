import React from 'react';
import axios from 'axios';

const TopperSignIn = ({ history }) => {

    const SignOut = () => {

        axios.post('/api/Sign/SignOut').then(() => {

            sessionStorage.removeItem("sessionInfo");
            document.location.href = "/";
          
        });
    }

    const profile = () => {
        history.push('/profile');
    }

    return (

        <div>
            <h4 style = {{ marginRight : '15%'}} id = 'topper-text' onClick = {SignOut} > &nbsp;&nbsp; sign out </h4>
            <h4 id = 'topper-text' onClick = {profile} > profile &nbsp; | </h4>
            <h4 class = 'slogan'> GO TELL IT WE MADE IT </h4>
        </div>
    );
}

export default TopperSignIn;