
import ReactDom from 'react-dom'
import React, { Suspense } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import router from './router/index';

class App extends React.Component {
    render(){
        return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {router}
              </Switch>
            </Suspense>
          </Router>
        )
    }
}
ReactDom.render(<App/>,document.getElementById("app"))