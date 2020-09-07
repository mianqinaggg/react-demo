import React from 'react'
import ReactDom from 'react-dom'
import HomePage from "./home/index"
import Example from './example/example'
class App extends React.Component {
    render(){
        return (
            <div>
                <HomePage />
                <Example />
            </div>
        )
    }
}
ReactDom.render(<App/>,document.getElementById("app"))