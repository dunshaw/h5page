(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 12 * (clientWidth / 320) + 'px';//其中“20”根据你设置的html的font-size属性值做适当的变化
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


let aAndI = detect()
if (aAndI == 'android') {
  console.log('android')
  if(isWeixin()){
    $('.wxmodel').css('display','block');
  }
}



const exp = /^1\d{10}$/;   //手机号正则
var nowHour = getNowFormatDate();
console.log(nowHour)



//判断当前设备是安卓还是ios
function detect() {
    var equipmentType = "";
    var agent = navigator.userAgent.toLowerCase();
    var android = agent.indexOf("android");
    var iphone = agent.indexOf("iphone");
    var ipad = agent.indexOf("ipad");
    var win = agent.indexOf("windows");
    if (android != -1) {
        equipmentType = "android";
    }
    if (iphone != -1 || ipad != -1) {
        equipmentType = "ios";
    }
    if (win != -1) {
        equipmentType = "windows";
    }
    return equipmentType;
}


$('.xiazai').click(function () {
  let aAndI = detect()
  console.log(aAndI)
  if (aAndI == 'android') {
    console.log(nowHour)
    if(7<parseInt(nowHour) && parseInt(nowHour)<21){
      let src = 'https://download.jobpoolhr.com/jobpoolhr-guanggaoye.apk';
      let form = document.createElement('form');
      form.action = src;
      document.getElementsByTagName('body')[0].appendChild(form);
      form.submit();
    }else{
      window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    }
  }else if(aAndI =='ios'){
    window.location.href='https://apps.apple.com/cn/app/id1485685440'
  }
  else {
      alert('请在移动端打开该网页')
      return
  }
})

function getQueryArgs() {
    var url = location.search;
    var qs = (url.length > 0 ? url.substring(url.indexOf('?')).substr(1) : ''),
      //保存每一项
      args = {},
      //得到每一项
      items = qs.length ? qs.split('&') : [],
      item = null,
      name = null,
      value = null,
      i = 0,
      len = items.length;

    for (i = 0; i < len; i++) {
      item = items[i].split('='),
        name = decodeURIComponent(item[0])
      value = decodeURIComponent(item[1])
      if (name.length) {
        args[name] = value;
      }
    }
    return args;
}



function isWeixin () {
  if(navigator.userAgent.toLowerCase().indexOf('miniprogram') != -1){
    console.log("微信小程序");
    return false
  } else if (navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1){
      console.log("微信内置浏览器");
      return true
  }
}

function getNowFormatDate() {

  var date = new Date();
  var char1 = "-";
  var char2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
  month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
  strDate = "0" + strDate;
  }
  var currentTime = date.getFullYear() + char1 + month + char1 + strDate
  + " " + date.getHours() + char2 + date.getMinutes()
  + char2 + date.getSeconds();
  return date.getHours();
}


