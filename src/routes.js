import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import USMap from './components/Map/USMap';
import GetInvolved from './components/GetInvolved/GetInvolved'
import Loading from './components/Loading/Loading';
import Rank from './components/Rank/Rank';
import StateRankTable from './components/StateRankTable/StateRankTable'

export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path='/map' component={USMap} />
        <Route path='/getinvolved' component={GetInvolved} />
        <Route path='/loading' component={Loading} />
        <Route path='/rank' component={Rank} />
        {/* <Route path='/d3' component={Main} /> */}
    </Switch>
)