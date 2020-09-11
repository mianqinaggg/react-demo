import React, { Component } from 'react';



class example extends Component {
    state: {
         num:number
    };
    constructor(props){
        super(props);
        this.state = {
            num : 0
        }
    }
    render(){
        return (
        <>
          <div>你点击了{this.state.num}次</div>
          <button onClick={()=>{this.setState({num:this.state.num+1})}}>点击</button>
          <button onClick={()=>{this.setState({num:0})}}>清零</button>
        </>
        )
    }
}

export default example