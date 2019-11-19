const _URL = 'https://tiger.quanjikj.com'; //服务器地址
const exp = /^1\d{10}$/;   //手机号正则
var str = location.search.split('?')[1];
var relationId = str.split('&')[0].split('=')[1];
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
                phone: $('.q-bottom input').val()
            },
            success: function (res) {
                if (res.code == 200) {
                    let aAndI = detect()
                    if (aAndI == 'android') {
                        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
                    } else if (aAndI == 'ios') {
                        alert('苹果客户端暂未开放，敬请期待！')
                    } else {
                        alert('请在移动端打开该网页')
                        return
                    }
                } else {
                    alert(res.msg)
                }
            }
        })

    } else {
        alert('手机号错误')
    }
})
