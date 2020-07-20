import React, {Component} from 'react';
// import LoadingTransition from './LoadingTransition/LoadingTransition'
import './Loading.css';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id='loading-cont'>
                {/* <LoadingTransition /> */}
                <h1>Hello</h1>
            </div>
         );
    }
}
 
export default Loading;