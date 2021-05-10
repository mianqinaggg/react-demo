import { lazy } from 'react';

const Home = lazy(()=>import('../home/index'));
const Example = lazy(()=>import('../example/example'));
const Example2 = lazy(()=>import('../example2/index'));

const router = [
    {
        path: '/',
        component: Home,  // 首页
        title:'首页',
    },
    {
        path: '/example',
        component: Example, // 示例页面
        title:'示例页面'
    },
    {
        path: '/example2',
        component: Example2, // 示例页面2
        title:'示例页面'
    }
]


export default router;