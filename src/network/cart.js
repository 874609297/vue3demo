import request from './request'
//添加
export function addCart(data){
    return request({
        url:'/api/carts',
        method:'post',
        data
    })
}
//修改
export function modifyCart (id,data){
    return request({
        url:`/api/carts/${id}`,
        method:'put',
        data
    })
}
//商品状态
export function checkedCart (data){
    return request({
        url:'/api/carts/checked',
        method:'patch',
        data
    })
}
//购物车列表
export function getCart (data){
    return request({
        url:'/api/carts?'+data,
        method:'get',
        data
    })
}
//删除购物车
export function deleteCartItem (id){
    return request({
        url:`/api/carts/{id}`,
        method:'delete'
    })
}