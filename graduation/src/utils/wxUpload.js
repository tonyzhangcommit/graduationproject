import wepy from 'wepy';
import {
  USER_JWT
} from '@/utils/constant';
import tip from './tip';



const wxUpload = async (filePath, url, env) => {
  let jwt = (wepy.getStorageSync(USER_JWT)) ? 'JWT ' + wepy.getStorageSync(USER_JWT) : '';

  let res = await wepy.uploadFile({
    url: url, //开发者服务器 url
    filePath: filePath, //要上传文件资源的路径
    name: 'image', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
    header: {
      'Content-Type': 'multipart/form-data',
      'Authorization': jwt
    },
    success: res => {
      return res
    },
    fail: () => { },
    complete(a, b, c) {

    }
  });

  if (env == '-dev') {
    console.log('==========console start============')
    console.log(url)
    console.log('------------------------------')
    console.log(res.data)
    console.log('==========console end============')
  }
  let data = JSON.parse(res.data)
  if (data.code == 0) {
    return data.data
  } else {
    return false
  }
}

const wxUploadFile = (params, url, env) => {
  let jwt = (wepy.getStorageSync(USER_JWT)) ? 'JWT ' + wepy.getStorageSync(USER_JWT) : '';
  
  var out = wepy.uploadFile({
    ...params,
    header: {
      'Content-Type': 'multipart/form-data',
      // 'Authorization': jwt
    }
  });
  return out;
}
module.exports = {
  wxUpload,
  _wxUploadFile:wxUploadFile
}