import React from 'react';
import { Route } from 'react-router-dom';
import router from './router';

function getRouter(data){
    return data.map((item)=> {
        return <Route 
            key={item.path} 
            exact 
            path={item.path}  
            render={(p) =>{
                document.title = item.title || 'reactDemo'
                return <item.component {...p} />} } />
    })

}

export default getRouter(router);
