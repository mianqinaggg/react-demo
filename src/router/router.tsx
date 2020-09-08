import { lazy } from 'react';

const Home = lazy(()=>import('../home/index'));
const Example = lazy(()=>import('../example/example'));


const router = [
    {
        path: '/',
        component: Home  // 首页
    },
    {
        path: '/example',
        component: Example // 示例页面
    }
]


export default router;