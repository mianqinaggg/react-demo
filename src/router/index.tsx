import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import router from './router';

function getRouter(data){
    let routerDom = '';
    data.push({});
    routerDom = data.map((item,index)=> {
        if (index === data.length -1){
           return <Redirect key='redirect' to="/"/>
        } else {
        return <Route key={item.path} exact path={item.path} component={item.component} />
        }
        
    })
    return routerDom;
}

export default getRouter(router);
