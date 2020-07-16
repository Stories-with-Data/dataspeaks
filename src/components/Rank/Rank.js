import React, {useState, useEffect} from 'react';
import Odometer from 'react-odometerjs';
import './Rank.css';

import "odometer/themes/odometer-theme-car.css";

// import "odometer/themes/odometer-theme-default.css";
// import "odometer/themes/odometer-theme-minimal.css";
// import "odometer/themes/odometer-theme-car.css"
// import "odometer/themes/odometer-theme-plaza.css"
// import "odometer/themes/odometer-theme-slot-machine.css"
// import "odometer/themes/odometer-theme-train-station.css"
// import "odometer/themes/odometer-theme-digital.css"
// Odometer themes above


const Rank = (props) => {
    let [odomValue, setOdom] = useState('0')
    useEffect(() => {
        setOdom(odomValue = '300')
    });
    console.log(props);
    return ( 
        <div>
            {/* <h1>Odometer</h1> */}
            <Odometer className='odom'value={odomValue} format="(.ddd)" />
        </div>
     );
}
 
export default Rank;