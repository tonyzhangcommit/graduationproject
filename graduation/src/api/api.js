import {
    wxRequest
  } from '@/utils/wxRequest'
  
  import { wxUpload, _wxUploadFile } from '@/utils/wxUpload'
  
  
  import * as api1 from './user.dev.js'
//   import * as api2 from './seller.dev.js'
  
//   for(var key in api2.default){
//     if(api1.default[key]){
//       throw ' api 重复';
//     }else {
//       api1.default[key]=api2.default[key];
//     }
//   }
  
  module.exports = api1.default;
  