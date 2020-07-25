import api from '@/api/api'
// import emojimap from './emojimap.js'
import config from '@/utils/config.js'
import wepy from "wepy";

// var emoji = emojimap.emojiList.emoji

function getCurrentTime() {
  var keep = ''
  var date = new Date()
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var rand = Math.round(Math.random() * 899 + 100)
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s
  return keep // 20160614134947
}

// 剩余时间转换
function getResidueTime(time) {
  let day = Math.floor(time / 86400);
  let hour = Math.floor(time % 86400 / 3600);
  let minute = Math.floor(time % 86400 % 3600 / 60);
  if (day > 0) {
    return `${day}天${hour < 10 ? '0' + hour : hour == 0 ? '00' : hour}小时${minute < 10 ? '0' + minute : minute == 0 ? '00' : minute}分`
  } else {
    if (hour > 0) {
      return `${hour}小时${minute < 10 ? '0' + minute : minute == 0 ? '00' : minute}分`
    } else {
      return `${minute}分`
    }
  }
}

function objLength(input) {
  var type = toString(input)
  var length = 0
  if (type != '[object Object]') {
    // throw "输入必须为对象{}！"
  } else {
    for (var key in input) {
      if (key != 'number') {
        length++
      }
    }
  }
  return length
}
// 验证是否是手机号码
function vailPhone(number) {
  let flag = false
  let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
  if (number.length != 11) {
    flag = flag
  } else if (!myreg.test(number)) {
    flag = flag
  } else {
    flag = true
  }
  return flag
}

// 浮点型除法
function div(a, b) {
  var c, d, e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) { }
  try {
    f = b.toString().split('.')[1].length
  } catch (g) { }
  return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), mul(c / d, Math.pow(10, f - e))
}
// 浮点型加法函数
function accAdd(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return ((arg1 * m + arg2 * m) / m).toFixed(2)
}
// 浮点型乘法
function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) { }
  try {
    c += e.split('.')[1].length
  } catch (f) { }
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}

// 遍历对象属性和值
function displayProp(obj) {
  var names = ''
  for (var name in obj) {
    names += name + obj[name]
  }
  return names
}
// 去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/ig, '')
}
// 去除所有:
function replaceMaohao(txt) {
  return txt.replace(/\:/ig, '')
}

// wx.chooseLocation 省市县切片
function sliceAddress(res) {
  if (res.errMsg == 'chooseLocation:ok') {
    console.log(res)
    // 获取省市县在文本中的索引
    let pro = res.address.indexOf('省') + 1
    let city = res.address.indexOf('市') + 1
    let area = res.address.indexOf('区') + 1
    // 根据索引分割省市县
    let pron = res.address.slice(0, pro)
    let cityn = res.address.slice(pro, city)
    let arean = res.address.slice(city, area)
    let other = res.address.slice(area)
    // 根据地区返回不同的值（区分直辖市）
    if (pro) {
      const add = {
        'whole': true,
        'province': pron,
        'city': cityn,
        'area': arean,
        'name': other
      }
      // console.log(add)
      return add
    } else if (cityn.length == 3) {
      const add = {
        'whole': true,
        'province': cityn,
        'city': cityn,
        'area': arean,
        'name': other
      }
      // console.log(add)
      return add
    } else {
      const add = {
        'name': res.address
      }
      return add;
    }
  }
}
function computePage(count, size) {

  return Math.ceil(count / size)
}

function stringSlice(str, begin, end) {
  if (str) {
    return str.slice(begin, end)
  } else {
    return
  }
}

function getGlobalData(e) {
  return e.$parent.globalData
}

/**
 * params Object
 * return a=1&b=2
 */
function urlParamsify(params = {}) {
  var strArr = [];
  for (var k in params) {
    var value = params[k];
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    strArr.push(`${k}=${value}`);
  }

  return strArr.join('&');
}


/**
 * 输入Unix时间戳，返回指定时间格式
 */
function calcTimeHeader(time) {
  // 格式化传入时间
  let date = new Date(parseInt(time)),
    year = date.getUTCFullYear(),
    month = date.getUTCMonth(),
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getUTCMinutes()
  // 获取当前时间
  let currentDate = new Date(),
    currentYear = date.getUTCFullYear(),
    currentMonth = date.getUTCMonth(),
    currentDay = currentDate.getDate()
  // 计算是否是同一天
  if (currentYear == year && currentMonth == month && currentDay == day) {//同一天直接返回
    if (hour > 12) {
      return `${hour}:${minute < 10 ? '0' + minute : minute}`
    } else {
      return `${hour}:${minute < 10 ? '0' + minute : minute}`
    }
  }
  // 计算是否是昨天
  let yesterday = new Date(currentDate - 24 * 3600 * 1000)
  if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth && day == yesterday.getDate()) {//昨天
    return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}`
  } else {
    return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
    // return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
  }
}

/**
 * 竞拍时间
 */
function auctionTime(time) {
  // 格式化传入时间
  let date = new Date(time),
    year = date.getUTCFullYear(),
    month = date.getUTCMonth(),
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getUTCMinutes(),
    second = date.getSeconds()
  // 获取当前时间
  let currentDate = new Date(),
    currentYear = date.getUTCFullYear(),
    currentMonth = date.getUTCMonth(),
    currentDay = currentDate.getDate()
  // 计算是否是同一天
  if (currentYear == year && currentMonth == month && currentDay == day) {//同一天直接返回
    // if (hour > 12) {
    return `${hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
    // } else {
    //   return `${hour}:${minute < 10 ? '0' + minute : minute}`
    // }
  }
  // 计算是否是昨天
  let yesterday = new Date(currentDate - 24 * 3600 * 1000)
  let beforeYesterday = new Date(currentDate - 48 * 3600 * 1000)
  if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth() && day == yesterday.getDate()) {//昨天
    return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
  } else if (year == beforeYesterday.getUTCFullYear() && month == beforeYesterday.getUTCMonth() && day == beforeYesterday.getDate()) {//昨天
    return `前天 ${hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
  }
  // else {
  // return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
  // return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
  // }
}
/**
 * 生成富文本节点
 */
function generateRichTextNode(text) {
  let tempStr = text
  let richTextNode = []
  let leftBracketIndex = tempStr.indexOf('[')
  let rightBracketIndex = tempStr.indexOf(']')
  let countOfWord = 0
  Array.from(tempStr).map(item => {
    if (item != '[' && item != ']') {
      countOfWord++
    }
  })
  if (leftBracketIndex == -1 || rightBracketIndex == -1 || countOfWord == 0) {//没有emoji
    richTextNode.push({
      type: 'text',
      text: tempStr
    })
    return richTextNode
  }
  while (tempStr.length != 0) {
    leftBracketIndex = tempStr.indexOf('[')
    rightBracketIndex = tempStr.indexOf(']')
    if (leftBracketIndex == 0) { // 开头是[
      rightBracketIndex = tempStr.indexOf(']')
      if (rightBracketIndex == -1) {
        richTextNode.push({
          type: 'text',
          text: tempStr
        })
        tempStr = ''
      } else {
        let emojiName = tempStr.slice(0, rightBracketIndex + 1)
        if (emoji[emojiName]) { // 有效emoji
          richTextNode.push({
            name: 'img',
            attrs: {
              width: '30rpx',
              height: '30rpx',
              src: emoji[emojiName].img
            }
          })
        } else {//无效emoji
          richTextNode.push({
            type: 'text',
            text: emojiName
          })
        }
        tempStr = tempStr.substring(rightBracketIndex + 1, tempStr.length)
      }
    } else { // 开头不是[
      if (leftBracketIndex == -1) {// 最后全是文字
        richTextNode.push({
          type: 'text',
          text: tempStr.slice(0, tempStr.length)
        })
        tempStr = ''
      } else {
        richTextNode.push({
          type: 'text',
          text: tempStr.slice(0, leftBracketIndex)
        })
        tempStr = tempStr.substring(leftBracketIndex, tempStr.length + 1)
      }
    }
  }
  return richTextNode
}

//价格处理
function priceSwitch(x) {
  //强制保留两位小数
  var f = parseFloat(x);
  if (isNaN(f)) return '';
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length < (rs + 1) + 2) {
    s += '0';
  }
  //每三位用一个逗号隔开
  var leftNum = s.split(".")[0];
  var rightNum = "." + s.split(".")[1];
  var result;
  //定义数组记录截取后的价格
  var resultArray = new Array();
  if (leftNum.length > 3) {
    var i = true;
    while (i) {
      resultArray.push(leftNum.slice(-3));
      leftNum = leftNum.slice(0, leftNum.length - 3);
      if (leftNum.length < 4) {
        i = false;
      }
    }
    //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
    var sortArray = new Array();
    for (var i = resultArray.length - 1; i >= 0; i--) {
      sortArray.push(resultArray[i]);
    }
    result = leftNum + "," + sortArray.join(",") + rightNum;
  } else {
    result = s;
  }
  return result;
}

// date时间
function moment(_d) {
  var keep = ''
  var date = new Date(_d)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var rand = Math.round(Math.random() * 899 + 100)
  keep = y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s;
  return keep; // 2016-06-14 13:49:47
}

// date时间
function momentTime(_d) {
  var keep = ''
  var date = new Date(_d)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var rand = Math.round(Math.random() * 899 + 100)
  keep = y + '/' + m + '/' + d + ' ' + h + ':' + f + ':' + s;
  return keep; // 2016-06-14 13:49:47
}
/**
 * 处理图片富文本节点
 */
function generateImageNode(file) {
  // console.log(file)
  let width = 0, height = 0
  if (file.w > 250) {
    width = 200
    height = file.h / (file.w / 200)
  } else {
    width = file.w
    height = file.h
  }
  let richTextNode = []
  richTextNode.push({
    name: 'img',
    attrs: {
      width: `${width}rpx`,
      height: `${height}rpx`,
      src: file.url
    }
  })
  return richTextNode
}

function SwDate(time) {
  if (!time) return;
  if (/^\d+$/.test(time)) {
    return new Date(time);
  } else if (typeof time == 'object') {
    return time;
  } else {
    time = time.replace(/[-\/]/g, ':').replace(' ', ':')
    time = time.split(':')
    var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5])
    return time1;
  }

}


/**
 * 处理卖家店铺审核失败 审核中 草稿箱 等等  进入商品上架要还原页面
 * 通过  商品详细信息  -> 转化为 上架页面可用的数据
 * 参数  product  : 商品详细信息 
 * 返回值： 一个id   通过这个id 跳入上架商品的任何一个页面都可以还原商品的信息
 */
function setReplayData(product) {
  var ticket = 'replayData';

  // 
  var step1 = {
    select: {}
  };
  var step2 = {};
  var step3 = {
    select: ''
  };
  var step4 = {
    fileList: [], //图片列表
    selparts: {}, //选择配件是以对象方式存储的 
    description: product.description, //卖家寄语
    title: product.title, //商品名称
    stock_record: product.stock_record, //库存数量
    price: product.price, //售卖价格
    raw_price: product.raw_price, //购入价格
    starting_price: product.productauction && product.productauction.starting_price, //开卖价格
    buyout_price: product.productauction && product.productauction.buyout_price, //一口价
    fund: product.productauction && product.productauction.fund, //保证金
    crowd: product.crowd, //适用人群 空为全部
    size: product.size, //商品尺寸
    source_type: product.source_type,//货源
    selparts: {} //配件
  };

  var replayData = {
    id: product.id,
    step1,
    step2,
    step3,
    step4
  };
  product.categories && product.categories.map(it => {
    step1.select[it.id] = it;
  })
  // 
  setAddProductionStep1.apply(step1)


  setAddProductionStep('product_type', product.product_type);

  try {
    // 设置第二个页面数据
    var brand = {
      id: product.brand.id,
      title: product.brand.chinese_name,
      ename: product.brand.english_name
    };
    setAddProductionStep('step2', brand);


    // 设置第三个页面数据
    step3.select = product.conditions;
    var conditions = {
      value: product.conditions,
      label: `【${product.conditions}新】`
    }
    setAddProductionStep('step3', conditions);



    // 设置第四个页面数据
    // 复盘 图片列表
    step4.fileList = product.images && product.images.map(it => {
      if (!it) return '';
      return {
        "filePath": config.qnurl + it.original,
        "flag": true,
        "progress": 100,
        "response": {
          "code": 1,
          "data": {},
          "key": it.original,
          "msg": "记录已存在imageurl"
        },
        "success": true
      }
    })
    step4.fileList = step4.fileList.filter(it => !!it)
    product.parts_set && product.parts_set.map(it => {
      step4.selparts[it.id] = it;
    })
  }catch(e){
    wx.setStorageSync('replayData', replayData)
    return ticket;
  }


  
  wx.setStorageSync('replayData', replayData)
  return ticket;
}


function setAddProductionStep(name, ps) {
  var addProduction = wx.getStorageSync('addProduction') || {};
  addProduction[name] = ps;
  wx.setStorageSync('addProduction', addProduction);
}

function setAddProductionStep1() {
  var addProduction = wx.getStorageSync('addProduction') || {};
  addProduction.step1 = {};
  var name = [];
  for (var k in this.select) {
    name.push(this.select[k].name)
  }
  addProduction.step1.name = name;
  addProduction.step1.ids = Object.keys(this.select);
  wx.setStorageSync('addProduction', addProduction);
}

/**
 * 
 * @param {String} page 
 * @param {Object} product
 * 
 * page  取值   1|2|3
 * 分别对应商品上新：  
 *        1：选择品类
 *        2：选择品牌
 *        3：选择新旧程度
 *        4：确认发布页
 * 
 * product  商品详情数据
 */
function goSendProduct(page, product) {
  // 首先需要获取票据 
  var ticket = setReplayData(product);
  var ps = {
    ticket: ticket,
    product_type: product.product_type
  };
  if (product.status) {
    ps.power = product.status;
  }
  if (product.draftsKey >= 0) {
    ps.draftsKey = product.draftsKey;
  }

  // 发布商品页
  wepy.swnav(config.pageId[page], ps)
}

function delDraft(draftsKey) {
  if (!draftsKey) return;
  var drafts = wepy.getStorageSync('draftsData') || [];
  drafts = drafts.filter(it => it.draftsKey != draftsKey)
  wepy.setStorageSync('draftsData', drafts)
}

// 截取数字保留万位
function sliceNum(num, degit = 2) {
  if (num >= 10000) {
    return num = (num / 10000).toFixed(degit) + "万";
  } else {
    return num
  }
}

// 价格转换
function priceTransform(num, fixed) {
  if (typeof num !== "number") {
    num = parseFloat(num);
  }
  var reg = /\B(?=(\d{3})+$)/g;
  num = num.toString().split(".");
  fixed = fixed == undefined ? 2 : fixed;

  num[0] = num[0].replace(reg, ",");
  num[1] = num[1] ? num[1].substr(0, fixed) : "00000000000000000".substr(0, fixed);
  if (num[1] == 0) {
    return num[0]
  } else {
    return num.join(".")
  }
  // console.log(num)

  // return fixed ? num.join(".") : num[0];
}


/**
 * start_time 开始时间 
 * end_time 结束时间
 */
function getDateDiff(start_time, end_time) {
  var endTime = new SwDate(end_time).getTime();
  console.log('endTime', new SwDate(end_time));
  var startTime = new SwDate(start_time).getTime();
  var diff = endTime - startTime;
  var day = Math.floor(diff / (1000 * 60 * 60 * 24));
  var diff_hours = diff % (1000 * 60 * 60 * 24);
  var hours = Math.floor(diff_hours / (1000 * 60 * 60));
  var diff_minute = diff_hours % (1000 * 60 * 60);
  var minute = Math.floor(diff_minute / (1000 * 60));
  day = day < 0 ? 0 : day;
  hours = hours < 0 ? 0 : hours;
  minute = minute < 0 ? 0 : minute;

  return [day, hours, minute];
}



module.exports = {
  getCurrentTime: getCurrentTime,
  objLength: objLength,
  displayProp: displayProp,
  sTrim: sTrim,
  replaceMaohao: replaceMaohao,
  vailPhone: vailPhone,
  div: div,
  mul: mul,
  accAdd: accAdd,
  sliceAddress: sliceAddress,
  computePage: computePage,
  stringSlice,
  getGlobalData,
  calcTimeHeader,
  generateRichTextNode,
  urlParamsify,
  priceSwitch,
  moment,
  generateImageNode,
  getResidueTime,
  SwDate,
  setReplayData,
  goSendProduct,
  delDraft,
  sliceNum,
  priceTransform,
  auctionTime,
  momentTime,
  getDateDiff
}
