import request from './request'

export function getCategroyData(){
    return request({
        url:'/api/goods'
    })
}

export function getCategroyGoods(order="sales",cid=0,page=1){
    return request({
        url:'/api/goods?category_id=' +cid + '&page=' + page + '&' +order+ '=1'
    })
}