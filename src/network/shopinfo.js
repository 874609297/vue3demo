import request from '../network/request';

export function getGoodsInfo(id){
    return request({
        url:'/api/goods/'+id,
    })
}