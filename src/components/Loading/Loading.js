import React, {Component} from 'react';
import './Loading.css';
import TransitionTemplate from '../../development/TransitionTemplate/TransitionTemplate'

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id='loading-cont'>
                <TransitionTemplate />
                <h1>Hello</h1>
            </div>
         );
    }
}
 
export default Loading;