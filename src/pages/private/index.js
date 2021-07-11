import React from 'react';
import {Switch, Route} from 'react-router-dom';


// Components Page Private
import Pengaturan from './pengaturan';
import Product from './product';
import Transaksi from './transaksi';
import Home from './home';

function Private(){

    return (
        <Switch>
            <Route path="/pengaturan" component={Pengaturan}/>
            <Route path="/product" component={Product}/>
            <Route path="/transaksi" component={Transaksi}/>
            <Route component={Home}/>
        </Switch>
    );
}

export default Private;