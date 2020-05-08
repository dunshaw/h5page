const exp = /^1\d{10}$/;   //手机号正则
let nowUrl = window.location.host;
var imgIp;
var _URL;
console.log(nowUrl)
if(nowUrl=='apptest.jobpoolhr.com'){
    imgIp ='https://imgtest.jobpoolhr.com/'
    _URL = 'https://apptest.jobpoolhr.com/'
}else if(nowUrl=='47.108.24.6:8100'){
    _URL = 'http://47.108.24.6:8100/'
    imgIp =''
}
else{
    imgIp = 'https://img.jobpoolhr.com/'
    _URL = 'https://app.jobpoolhr.com/'
}
var referrerUserId = getQueryArgs().relationId
var nowHour = getQueryArgs().nowHour
console.log(referrerUserId)
var h = window.screen.height;
$('.q-top').css('height', h)

$('.q-ela-tps-btn').click(function () {
    if (exp.test($('.q-bottom-top-phone').val())) {
        $.ajax({
            url:  '/api/recommendFriends/save',
            type: 'post',
            data: {
                friendPhone: $('.q-bottom-top-phone').val(),
                referrerUserId: referrerUserId
            },
            success: function (res) {
                if (res.code == 200) {
                    let aAndI = detect();
                    console.log(aAndI)
                    if (aAndI == 'android') {
                        console.log(nowHour)
                        if(7<parseInt(nowHour) && parseInt(nowHour)<20){
                            let src = 'https://download.jobpoolhr.com/jobpoolhr.apk';
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
                } else {
                    alert(res.msg);
                }
            }
        })
    } else {
        alert('请检查手机号！')
    }
})


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

// ios输入框ui还原
function iptblur(){
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isiOS) { // 判断是否为IOS系统
     setTimeout(() => {
           const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
           window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
    }   
}