import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip';
import api from '../api/api';
import apiConfig from '@/api/config.js';
import {
  USER_JWT
} from '@/utils/constant';
// const API_SECRET_KEY = 'www.mall.cycle.com'
// const TIMESTAMP = util.getCurrentTime()
// const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

const wxRequest = async (params = {}, url, env) => {
  let bool = true;
  if (params.loading) {
    wx.showLoading({
      title: params.loading.title || '加载中',
      mask: true
    });
  }

  // tip.loading();
  let data = params.query || {};
  let id = params.id + '/';
  let jwt = (wepy.getStorageSync(USER_JWT)) ? 'JWT ' + wepy.getStorageSync(USER_JWT) : '';
  // let jwt = 'JWT ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3MiLCJzY29wZXMiOlsib3BlbiJdLCJpYXQiOjE1MzQ5MDczODAsInN1YiI6IjEyIiwiYXVkIjoiYXVkaWVuY2UiLCJleHAiOjE1MzU1MTIxODB9.OHSmQKe2EoCstw-M9BgMitQhufYAIIvKIFVU9WfHFbM"
  // data.sign = SIGN;
  // data.time = TIMESTAMP;
  let urla = params.id ? url + id : url;
//   if(params.mock){
//     urla = urla.replace(apiConfig.apiMall,apiConfig.mockUrl)
//     console.log(`
//     ======================================================================================
//     ==========================================mockurl=====================================
//     ======================================================================================
//     `)
//     console.log("mockurl:",urla)
//     console.log(`
//     ======================================================================================
//     ==========================================end=====================================
//     ======================================================================================
//     `)
//   }
  let autoAuth=typeof params.autoTuth==='undefined'?true:false;


  for (var k in data) {
		if (data[k] === '' || data[k] == -1) {
			console.log('删除空值', k)
			delete data[k];
		}
  }
  
  let res = await wepy.request({
    url: urla,
    method: params.method || 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json',
      'Authorization': jwt
    },
  }).catch(item=>{
    console.log("错误")
    console.log(item)
  });
  if (env == '-dev') {
    console.log('==========console start============')
    console.log(urla)
    console.log('------------------------------')
    console.log(res.data)
    console.log('------------------------------')
    console.log(res.data.data)
    console.log('==========console end============')
  }
  if (params.loading) {
    wx.hideLoading()
  }
  if(!res.data.code){
    if(res.statusCode===500){
      tip.error("服务器暂不可用")
    }
  }
  
  if (params && params.gm && res.data.code!=3) return res.data;
  // debugger
  switch (res.data.code) {
    case 0:
      if(params.cancelHideLoading){
      }else{
        tip.loaded();
      }
      return res.data.data || true;
    case 1:
      tip.error(res.data.msg);
      return false;
    case 2:
      tip.error(res.data.msg);
      return false;
    case 3:
    if(autoAuth){
      wepy.navigateTo({ url: "/pages/mine/authorize" });
    }else{
      if(params.authFailCallback){
        params.authFailCallback()
      }
    }
      return false;
    case 4:
      tip.error(res.data.msg);
      return false;
    case 5:
      tip.error(res.data.msg);
      return false; 
    case 15:
    case 25:
    return res.data;
    default:
      tip.error(res.data.msg)
      return false;
  }

  // if (res.data.code == 0) {
  // return res.data.data || true
  // } else {

  //   tip.error(res.data.msg)
  //   return false
  // }
};


module.exports = {
  wxRequest
}
