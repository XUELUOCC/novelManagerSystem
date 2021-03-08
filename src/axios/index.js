import axios from 'axios';
import router from '@/router'
import {  Message} from 'element-ui';//使用于vue项目中Toaset进行错误提示

const instance = axios.create({
    baseURL: 'http:localhost:8080',
    timeout: 2000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["Authorization"] = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : "";
    return config;
}, function (error) {
    // 对请求错误做些什么
    // Message.error({message: '连接不到服务器，请稍后再试', offset: 150});
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么---.then()之后
    let data=response.data;
    if(data.status && data.status=='401'){
        router.replace({
            name:'Login'
        })
    }
    return response;
}, function (error) {
    // 对响应错误做点什么---.catch()之后
    console.log(error.response.data)
    let data=error.response.data
    switch (error.response.status){
        case 403:
            Message.error('拒绝访问');
        break
        case 500:  //可以使用其他的提示框架，根据环境使用，MessageBox弹窗可执行promise操作，使在点击确定后执行某些操作
            Message.error('服务器错误');
        break
        case 404:
            Message.error('资源未找到');
        break
        case 504:
            Message.error('网络超时');
        break
    }
    return Promise.reject(error);
});

export default instance;