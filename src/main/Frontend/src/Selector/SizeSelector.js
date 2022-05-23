import React, {useState, Component, Fragment} from 'react';
import '../styles/SelectorStyle.css';

const SizeSelector = ({dressSize, props }) => {

    return (
        
            <div class = 'sizeSelectorContainer'>
                <h4  id = 'sizeTitle'> size </h4>
                <div class = 'sizeSelector'>
                    {dressSize.map(value => (
                    <Fragment>
                        <input type="radio" name="size" id={value.size} value={value.size} onClick = {props}/>
                        <label class = 'sizeCheck' for = {value.size} ><span class={value.size}>{value.sizeSummary}</span></label>
                    </Fragment>
                    ))}
                </div>      
            </div>
        
        
    );
};

export default React.memo(SizeSelector);