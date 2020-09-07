import React, { useState } from 'react';
import './example.less'

function example(props){

    const [count,setCount] = useState(0);

    return (
        <>
            <div>你点击了{count}次</div>
            <button onClick={()=>{setCount(count+1)}}>点击</button>
        </>
    )
}
export default example;