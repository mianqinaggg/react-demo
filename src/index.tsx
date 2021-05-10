
import ReactDom from 'react-dom'
import React, { Suspense } from 'react';
import { HashRouter as Router, Switch,Redirect } from 'react-router-dom';
import {Provider} from  'react-redux';
import router from './router/index';
import store from './store/store';

class App extends React.Component {
    render(){
        return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {router}
                <Redirect key='redirect' to="/"/>
              </Switch>
            </Suspense>
          </Router>
        )
    }
}
ReactDom.render(
   <Provider store={store}>
     <App/>
  </Provider>,document.getElementById("app"))