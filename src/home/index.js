import React from 'react';
import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpeg';
import './index.less';

class Home  extends React.Component {
    render(){
        return(
            <div>
                <p className="test">嘻嘻嘻</p>
                <img src={img1}></img>
                <img src={img2}></img>
            </div>
        )
    }
}

export default Home;