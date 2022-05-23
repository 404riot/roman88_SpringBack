import React, { Fragment } from 'react';

import '../styles/SelectorStyle.css';

const ColorSelector = ({dressColor, props}) => {

    return (
        <div class = 'colorSelectorContainer' >
            <h4 id = 'colorTitle'> color </h4>
            
            {dressColor.map(value => (
            <Fragment>
                <input  type="radio" name="color" id={value.color} value={value.color} onChange = {props} />
                <label  class = 'colorCheck' for = {value.color}><span class={value.color}></span></label>
            </Fragment>
            ))}    
        </div>
    );
}

export default ColorSelector;