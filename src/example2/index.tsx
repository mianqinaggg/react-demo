import React, { Component } from 'react';
import  {connect} from 'react-redux'

import { Progress } from 'antd';
import { bindActionCreators } from 'redux';

import PropTypes, { any } from 'prop-types'


const add = (payload:{num:1})=>{
    return {
        type: 'increase',
        payload
    }
}


const asyncFunc = function(dispatch,...args){
    return ()=>{new Promise((resolve)=>{
        resolve(1);
    }).then((result:any)=>{
        dispatch(add(result))
    })
  }
}
// @connect(
//     state=>state.count,
//     dispatch=>bindActionCreators(add,dispatch)
// )

function mapStateToProps (state){
    return {
        count: state.count
    }
}

function mapDispatchToProps(dispatch){
    // return { add: bindActionCreators(add,dispatch)}
    return { add: (...args) => dispatch(asyncFunc(dispatch,...args))}
}

class Example extends Component<any> {
    state: {
         num:number,
    };
    constructor(props:any){
        super(props);
        this.state = {
            num : 0,
        }
    }

    componentDidMount(){
    }

    render(){
        const {count}  = this.props
        console.log(this.props);
        return (
        <>
          <div>你点击了{count}次</div>
          <button onClick={()=>{this.props.add({num:2})}} ></button>
          {/* <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} />
          <Progress percent={50} showInfo={false} /> */}
        </>
        )
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Example)