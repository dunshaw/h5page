const _URL = 'https://tiger.quanjikj.com'; //服务器地址
const exp = /^1\d{10}$/;   //手机号正则
var str = location.search.split('?')[1];
// var relationId = str.split('&')[0].split('=')[1];
var relationId = getQueryArgs().relationId
var jobId = getQueryArgs().id
// var interviewTime = getQueryArgs().interviewTime

var type = str.split('&')[1].split('=')[1];

//获取手机屏幕高度
var h = window.screen.height;
$('.q-bigbox').css('height', h)
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


$('.q-bottom button').click(function () {
    if (exp.test($('.q-bottom input').val())) {

        $.ajax({
            url:  '/api/shareQrCode/save',
            type: 'post',
            data: {
                relationId: relationId,
                type: type,
                phone: $('.q-bottom input').val(),
                jobId: jobId,
                interviewTime:''
            },
            success: function (res) {
                console.log(res)
                let aAndI = detect()
                console.log(aAndI)
                if (aAndI == 'android') {
                    window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
                }else if(aAndI =='ios'){
                    window.open('https://apps.apple.com/cn/app/id1485685440')
                }
                else {
                    alert('请在移动端打开该网页')
                    return
                }
            }
        })

    } else {
        alert('手机号错误')
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