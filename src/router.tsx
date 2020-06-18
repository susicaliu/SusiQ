import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import FillPage from './components/pages/fill/FillPage';



const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component ={App}></Route>
            <Route exact path="/form" component = {FillPage}></Route>
        </Switch>
    </HashRouter>
);


export default BasicRoute;