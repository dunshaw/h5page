let str = location.search.split('?id=')[1]
const index = str.search(/&/)
let id = ''
// 有&，判断IOS浏览器在地址后面添加参数
if (index) {
    id = str.slice(0, 19)
}
// 正常浏览器
else {
    id = str
}
const _URL = 'https://tiger.quanjikj.com'; //服务器地址
const imgIp = 'https://img.quanjikj.com/'   // 图片服务器地址

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

//动态设置banner高度  避免页面大小发生变化时banner把页面占完了
// $(document).ready(function(){
$('.q-top-bigbox').css('height', $('.q-top-bg').height())
$('.q-top-gongsi').css('top', $('.q-top-bg').height() - 30)
// })

$(window).resize(function () {
    $('.q-top-bigbox').css('height', $('.q-top-bg').height())
    $('.q-top-gongsi').css('top', $('.q-top-bg').height() - 30)
})


$('.q-top-back').click(function () {
    history.back()
})
$('.q-top-fx').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        alert('苹果客户端暂未开放，敬请期待！')
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-top-gongsi').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        alert('苹果客户端暂未开放，敬请期待！')
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-top-bg').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        alert('苹果客户端暂未开放，敬请期待！')
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-follow').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        alert('苹果客户端暂未开放，敬请期待！')
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-introduce-title').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        alert('苹果客户端暂未开放，敬请期待！')
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-post-title').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        alert('苹果客户端暂未开放，敬请期待！')
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-more').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        alert('苹果客户端暂未开放，敬请期待！')
    } else {
        alert('请在移动端打开该网页')
        return
    }
})

$.ajax({
    url:  '/api/company/getById',
    type: 'GET',
    data: { id: id },
    success: function (res) {
        console.log(res)
        if (res.code == 200) {
            if (res.body.logo) {
                $('.q-top-gongsi').attr('src', imgIp + res.body.logo)
            }

            $('.q-gongsiname').html(res.body.alias);
            $('.q-name').html(res.body.name);
            $('.q-dq').html(res.body.area);
            $('.q-gm').html(res.body.scale);
            $('.q-hy').html(res.body.industry);
            $('.q-introduce-text').html(res.body.introduction);
            $('.q-posi span').html(res.body.location);
            $('.q-timet').html(res.body.establishTime);

            switch (res.body.businessStatus) {
                case 'subsisting':
                    res.body.businessStatus = '存续'
                    break;
                case 'inBusiness':
                    res.body.businessStatus = '在业'
                    break;
                case 'revoke':
                    res.body.businessStatus = '吊销'
                    break;
                case 'dissolve':
                    res.body.businessStatus = '注销'
                    break;
                case 'moveIn':
                    res.body.businessStatus = '迁入'
                    break;
                case 'moveOut':
                    res.body.businessStatus = '迁出'
                    break;
                case 'closed':
                    res.body.businessStatus = '停业'
                    break;
                case 'liquidation':
                    res.body.businessStatus = '清算'
                    break;
                case 'unknown':
                    res.body.businessStatus = '未知'
                    break;
            }
            $('.q-businessStatus').html(res.body.businessStatus);
            $('.q-enterpriseType').html(res.body.nature)
        } else {
            alert(res.msg)
        }

    }
})