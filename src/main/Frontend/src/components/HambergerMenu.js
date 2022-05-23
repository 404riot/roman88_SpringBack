import React from 'react';
import { BrowserRouter as Router, Route, Swtich, Link, withRouter} from 'react-router-dom';

import '../styles/HambergerStyle.css';
import '../styles/IconStyle.css';

import watermark4 from '../sampleIcons/watermark4.svg';

export const HambergerMenu = ({ history }) => {

    return (
        <div>
            <nav role='navigation'>
                <div id="menuToggle" style = {{ marginTop : '-20px'}}>
                    <input type="checkbox"/>
                                        
                    <span></span>
                    <span></span>
                    <span></span>                      
                
                    <ul id="menu" style = {{ border : '1px solid black'}}>

                        <a href = '/'> <li>Home</li> </a>
                        <a href = '/notice' > <li>Notice</li> </a>
                        <a href="#"><li>Goods</li></a>
                        <a href="/qna" history = {history}><li>QnA</li></a>
                        <a href="/about"><li>About</li></a>
                        <a href="/contact"><li>Contact</li></a>
                        
                        {/* <div style = {{ marginTop : '410px', marginLeft : '120px'}}>
                            <img id = 'Icon-watermark' src = {watermark4} />
                        </div> */}
                    </ul>

                </div>
            </nav>
            
            
        </div>
    );
}

export default withRouter(HambergerMenu);
