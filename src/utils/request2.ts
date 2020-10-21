import axios from 'axios';
import qs from 'qs'
import { message } from 'antd';

// const requset = axios.create({
//     baseURL:"http://127.0.0.1:3300",
//     timeout: 5000,
//     // withCredentials: true,
//      // 定义统一的请求头部
// });

// 请求拦截
axios.interceptors.request.use(
    config => {
        // 请求参数处理
        console.log(config);
        return config
    },
    error => {
        message.error('系统开小差了,请稍后再试');
        return Promise.reject(error)
    }
);

// 响应拦截
axios.interceptors.response.use(
    res => {
        // 响应参数处理
        console.log(res);
        return res
    },
    error => {
        message.error('系统开小差了,请稍后再试');
        return Promise.reject(error)
    }
);

export function get(params,url):any{
   return new Promise((resolve,reject)=> {
    axios({
            params:params,
            url,
            method:'get',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        }).then((res)=>{
            resolve(res);
        }).catch((error)=>{
            console.error(error,'get');
            reject(error);
        })
    });
}


export function post(params:any,url:any):any{
    return new Promise((resolve,reject)=> {
        axios({
             params:qs.stringify(params),
             url,
             method:'post',
             baseURL:'http://127.0.0.1:3300',
             headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
         }).then((res)=>{
             resolve(res);
         }).catch((error)=>{
             console.error(error,'post');
             reject(error);
         })
     });
 }

