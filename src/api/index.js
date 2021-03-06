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

export const getList=(query)=>{
    return request({
        url:'/api/list',
        method:'get',
        params:query
    })
}

export const uploadBlob=(query,name)=>{
    return request({
        url:'/api/uploadBlob/'+name,
        method:'get',
        responseType:'blob',
        params:query
    })
}
