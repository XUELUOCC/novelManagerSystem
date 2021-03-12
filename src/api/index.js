import request from '@/axios/index'

export const testApi =(query)=>{
    return request({
        url:'./table.json',
        method:'get',
        parmas:query
    });
}

export const routerApi =(query)=>{
    return request({
        url:'./routerPermission.json',
        method:'get',
        parmas:query
    });
}
