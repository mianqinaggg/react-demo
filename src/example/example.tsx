import React, { useEffect, useState } from 'react';
import Api from '../utils/api';
import {post,get} from '../utils/request2'; 
import './example.less'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";

/**初始props */
interface initProps  {
    /** 名字 */
    name:string
}


function getTArray <T>(length:number,value:T):Array<T>{
    const arr = []
    for (let i =0;i <length;i++){
        arr.push(value);
    }
    return arr
}


const example:React.FC<initProps> = (props)=> {
   const [count,setCount] = useState(0);
   async function getpost(){
        const param = {key:'1'};
        const url = Api.FindSongs;
        const data =await get(param,url);
    }

    const storeCount = useSelector(state =>{
        return state.count
    })
    const dispatch = useDispatch()
    const history = useHistory();
    // console.log(dispatch());

    // useEffect(()=>{
    //     getpost()
    // })

    function onClick (num) {
        return function (event) {
         console.log(event, num)
        }
    }

    function jump(){
        history.push('/example2')
    }

    function onClick2 (num, event) {
        console.log(num);
        console.log(event)
    }

    return (
        <>
            {/* <div>你点击了{count}次</div>
            <button onClick={onClick(1)}>点击</button>
            <button onClick={onClick2.bind(this,1)}>清零</button> */}
            <div>storeCount:{storeCount} </div>
            <button onClick={()=>dispatch({type:'increase',num:1})}>加加加</button>
            <button onClick={()=>dispatch({type:'decrease'})}>减减减</button>
            <button onClick={()=>{jump()}}>跳转</button>
        </>
    )
}
export default example;