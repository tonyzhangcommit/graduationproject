import {
    USER_INFO,
    USER_JWT,
    SYSTEM_INFO,
    ACCOUNT_INFO
  } from './constant';
  import api from "../api/api";
  import wepy from "wepy";
  // 检查session_key是否失效从而触发登录
  function checkSession() {
    console.log('checksession')
    let userjwt = wepy.getStorageSync(USER_JWT);
    wepy.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('session is ok')
        if(userjwt){
          api.update_info().then(res=>{
            console.log(res)
          })
        }
      },
      fail: function () {
        console.log('session end')
        // this.wxUserInfo()
        // session_key 已经失效，需要重新执行登录流程
        // wx.login({
        //   cussess: function (res) {
        //     console.log(res)
        //     let rlt = api.wxJsCode2Session({
        //       query: {
        //         jsCode: res.code,
        //         nickName: e.detail.userInfo.nickName
        //       }
        //     })
        //     if (rlt.data.result) {
        //       let data = rlt.data;
        //       if (data.data.openid) {
        //         // wepy.setStorageSync(USER_SPECICAL_INFO, data.data);
        //         console.log('login success')
        //       }
        //     }
        //   }
        // })
      }
    })
  }
  // 检查用户信息
  function wxUserInfo(options) { 
    // debugger
    let that = this;
    let userJwt = wepy.getStorageSync(USER_JWT);
    if (!userJwt) {
      wepy.getSetting({
        success: function (res) {
          if (res.authSetting["scope.userInfo"]) {
            wepy.getUserInfo({
              success: function (e) {
                wepy.setStorageSync(USER_INFO, e.userInfo);
                that.wxLoginInfo({date:e,options:options});
                that.systemInfo();
               
              }
            })
  
          }
        }
      });
    }
  }
  
//   function checkNav(option){
//     let pages = getCurrentPages();
//     if(pages.length<9){
//       wepy.navigateTo({ url: option });
//     }else{
//       wepy.redirectTo({ url: option });
      
//     }
//   }
  
//   // 检查用户身份号
//   function getUserMobile(){
    
//   }
  
  // 检查用户是否登录
  function wxLoginInfo(e) {
    
    let that=e.options.$parent.globalData;
    // console.log(that)
    
    // debugger
    let userjwt = wepy.getStorageSync(USER_JWT);
    if (!userjwt) {
      wepy.login({
        success: function (res) {
          let rlt = api.wxLogin({
            method: "POST",
            query: {
              code: res.code,
              avatarUrl: e.detail.userInfo.avatarUrl,
              nickName: e.detail.userInfo.nickName,
            }
          });
          rlt.then((rlt) => {
            if (rlt.JWT) {
              wepy.setStorageSync(USER_JWT, rlt.JWT);
              wepy.setStorageSync(ACCOUNT_INFO, rlt);            
              // that.reLaunch();
            }
          })
        }
      });
    }
  }
  // 检查设备信息
  function systemInfo() {
    let systeminfo = wepy.getStorageSync(SYSTEM_INFO);
    if (!systeminfo) {
      wepy.getSystemInfo({
        success: function (res) {
          wepy.setStorageSync(SYSTEM_INFO, res)
        }
      })
    }
  }
  
  function checkConsole(callback) {
    try {
      callback()
    } catch (error) {
      console.log(err)
    }
  }
  
  module.exports = {
    checkSession: checkSession,
    checkConsole: checkConsole,
    wxUserInfo: wxUserInfo,
    wxLoginInfo: wxLoginInfo,
    systemInfo: systemInfo,
    checkNav
  }
  