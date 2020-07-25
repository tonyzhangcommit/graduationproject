import {
    wxRequest
} from '@/utils/wxRequest'

import { wxUpload, _wxUploadFile } from '@/utils/wxUpload'

import {apiMall,env} from './config.js';

// 上传图片
exports.uploadImg = (params) => wxUpload(params, apiMall + '/image/', env);

// 获取商品分类
exports.getProductClassic = (params) => wxRequest(params, apiMall + '/product/category/', env)

// 创建商品
exports.createProduct = (params) => wxRequest(params, apiMall + '/product/product/')

// 收藏商品
exports.collectProduct = (params) => wxRequest(params, apiMall + '/user/collect/')


// 创建留言
exports.createMessage = (params) => wxRequest(params, apiMall + '/user/message/')

//微信登录
exports.wxLogin = (params) => wxRequest(params, apiMall + '/user/wx_login/')

// 获取登陆用户详细信息
exports.wxuserinfo = (params) => wxRequest(params, apiMall + '/user/user/')

// 编辑用户信息
exports.edituserinfo = (params) => wxRequest(params, apiMall + '/user/user/')

//获取图片token
exports.getToken = (params = {}) => {
    params.gm = true;
    return wxRequest(params, apiMall + '/image/uptoken/');
}

// 上传图片至七牛
exports.wxUploadFile = (params) => {
    params.fileName = params.fileName ? params.fileName : 'file';
    var url = apiMall + '/image/';
    return _wxUploadFile(params, params.url || url, env);
};
