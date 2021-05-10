import React from 'react';
import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpeg';
import './index.less';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

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
                <Layout className="layout">
                    <Header className="header">RX-0 UNICORN GUNDAM</Header>
                    <Content></Content>
                    {/* <Footer></Footer> */}
                </Layout>
            </>
        )
    }
}

export default Home;