import React, { useState } from 'react';
import './example.less'

function example(){

    const [count,setCount] = useState(0);

    return (
        <>
            <div>你点击了{count}次</div>
            <button onClick={()=>{setCount(count+1)}}>点击</button>
            <button onClick={()=>{setCount(0)}}>清零</button>
        </>
    )
}
export default example;