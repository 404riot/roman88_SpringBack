import React from 'react';

const TopperDefault = ({history}) => {

    const signIn = () => {
        history.push('/signInPage')
    }
    
    const signUp = () => {
        history.push('/signUpPage')
    }

    return (
        <div>

            <h4 style = {{ marginRight : '15%'}} id = 'topper-text' onClick = {signIn}> &nbsp;&nbsp; sign in </h4>
            <h4 id = 'topper-text' onClick = {signUp}> sign up &nbsp; | </h4>
            <h4 class = 'slogan'> GO TELL IT WE MADE IT </h4>
        </div>
    );
}

export default TopperDefault;