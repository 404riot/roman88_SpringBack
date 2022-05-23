import React from 'react';

const Counter = ({ minus, plus, psc}) => {
    
    return (
        <div class = 'counterContainer' >
            <h4 id = 'counterTitle'> pcs.</h4>
            <button id = 'Counter-minus' onClick={minus} >-</button>
            <p id = 'psc'>{psc}</p>
            <button id = 'Counter-plus'  onClick = {plus}>+</button>
        </div>
    );
}

export default Counter;