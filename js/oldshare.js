
let aAndI = detect()
if (aAndI == 'android') {
  console.log('android')
  if(isWeixin()){
    $('.wxmodel').css('display','block');
  }
}

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
}else if(nowUrl=='download.jobpoolhr.com' ||nowUrl == 'app.jobpoolhr.com'){
    imgIp = 'https://img.jobpoolhr.com/'
    _URL = 'https://app.jobpoolhr.com'
    
}else{
    imgIp ='https://imgtest.jobpoolhr.com/'
    _URL = 'https://apptest.jobpoolhr.com/'
}


const exp = /^1\d{10}$/;   //手机号正则
var str = location.search.split('?')[1];
// var relationId = str.split('&')[0].split('=')[1];
var relationId = getQueryArgs().relationId
var jobId = getQueryArgs().id?getQueryArgs().id:''
var scanCodeType = getQueryArgs().scanCodeType
var nowHour = getQueryArgs().nowHour
var interviewTime = getQueryArgs().interviewTime

var type = str.split('&')[1].split('=')[1];

//获取手机屏幕高度
var winHeight = $(window).height();
$(window).resize(function() {
    var thisHeight = $(this).height();
    var keyboardHeight = thisHeight - winHeight;
    $(".q-bigbox").css({ 'bottom': keyboardHeight + 'px' });
});

//判断当前设备是安卓还是ios
function detect(){
   var equipmentType = "";
   var agent = navigator.userAgent.toLowerCase();
   var android = agent.indexOf("android");
   var iphone = agent.indexOf("iphone");
   var ipad = agent.indexOf("ipad");
   if(android != -1){
       equipmentType = "android";
   }
   if(iphone != -1 || ipad != -1){
       equipmentType = "ios";
   }
   return equipmentType;
}


$('.q-bottom button').click(function () {
    if (exp.test($('.q-bottom input').val())) {
        $('#xiazaibtn').attr("disabled",true).css('background-color','#ddd');
        $.ajax({
            url:  '/api/shareQrCode/save',
            type: 'post',
            data: {
                relationId: relationId,
                type: type,
                phone: $('.q-bottom input').val(),
                jobId: jobId,
                interviewTime:interviewTime,
                scanCodeType:scanCodeType
            },
            success: function (res) {
                console.log(res)
                let aAndI = detect()
                console.log(aAndI)
                if(aAndI =='ios'){
                  window.location.href='https://apps.apple.com/cn/app/id1485685440'
                }else{
                  console.log(nowHour)
                  if(7<parseInt(nowHour) && parseInt(nowHour)<21){
                    let src = 'https://download.jobpoolhr.com/jobpoolhr-luodiye.apk';
                    let form = document.createElement('form');
                    form.action = src;
                    document.getElementsByTagName('body')[0].appendChild(form);
                    form.submit();
                  }else{
                    window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
                  }
                }
            }
        })

    } else {
        itemclick()
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

function itemclick() {
  console.log('123')
  $("#tishibox").toggle();
};


$('input').blur(function(){
    window.scrollTo(0, 0)
})

function isWeixin () {
  if(navigator.userAgent.toLowerCase().indexOf('miniprogram') != -1){
    console.log("微信小程序");
    return false
  } else if (navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1){
      console.log("微信内置浏览器");
      return true
  }
}
