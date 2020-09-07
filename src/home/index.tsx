import React from 'react';
import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpeg';
import './index.less';

interface Props {}
interface States {
    a:string
}

class Home extends React.Component<Props,States> {
    constructor(Props:Readonly<Props>){
        super(Props);
        this.state = {
            a:'1'
        }
    }

    componentDidMount(){
        this.setState({a:'2'});
    }

    render(){
        return(
            <>
                {this.state.a}
                <p className="test">嘻嘻嘻</p>
            </>
        )
    }
}

export default Home;