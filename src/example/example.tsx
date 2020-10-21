import React, { useEffect, useState } from 'react';
import {post,get} from '../utils/request2'; 
import './example.less'

interface initProps  {
    name:string
}

const example:React.FC<initProps> = (props)=> {
    const [count,setCount] = useState(0);
   async function getpost(){
        const param = {};
        const url = '/test/recommend/playlist';
        const data =await get(param,url);
    }
    return (
        <>
            <div>你点击了{count}次</div>
            <button onClick={()=>{setCount(count+1)}}>点击</button>
            <button onClick={()=>{getpost()}}>清零</button>
        </>
    )
}
export default example;