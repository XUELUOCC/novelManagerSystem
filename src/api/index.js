import request from '@/axios/index'

export const testApi =(query)=>{
    return request({
        url:'./table.json',
        method:'get',
        parmas:query
    });
}
