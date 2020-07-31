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
}else if(nowUrl=='download.jobpoolhr.com'){
    imgIp = 'https://img.jobpoolhr.com/'
    _URL = 'https://app.jobpoolhr.com'
    
}else{
    imgIp ='https://imgtest.jobpoolhr.com/'
    _URL = 'https://apptest.jobpoolhr.com/'
}

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
$('.q-top-bigbox').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        window.location.href='https://apps.apple.com/cn/app/id1485685440'
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-introduction').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        window.location.href='https://apps.apple.com/cn/app/id1485685440'
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-division').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        window.location.href='https://apps.apple.com/cn/app/id1485685440'
    } else {
        alert('请在移动端打开该网页')
        return
    }
})
$('.q-introduce').click(function () {
    let aAndI = detect()
    if (aAndI == 'android') {
        window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    } else if (aAndI == 'ios') {
        window.location.href='https://apps.apple.com/cn/app/id1485685440'
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
        window.location.href='https://apps.apple.com/cn/app/id1485685440'
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
        window.location.href='https://apps.apple.com/cn/app/id1485685440'
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
        window.location.href='https://apps.apple.com/cn/app/id1485685440'
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
            // $('.q-posi span').html(res.body.location);
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
            // $('.q-businessStatus').html(res.body.businessStatus);
            // $('.q-enterpriseType').html(res.body.nature)
        } else {
            alert(res.msg)
        }

    }
})
const _lng = 104.0647;
const _lat = 30.5702;

$.ajax({
    url:  '/api/company/getJobList',
    type: 'GET',
    data: { id: id,lat:_lat,lng:_lng},
}).then(function (res) {
    console.log(res)
    $('#joblist').empty()
    for (let i = 0; i < res.body.length; i++) {
        res.body[i].salaryMin =  (res.body[i].salaryMin / 1000).toFixed(1)
        res.body[i].salaryMax = (res.body[i].salaryMax / 1000).toFixed(1)
        switch (res.body[i].education) {
          case 'no':
            res.body[i].education = "不限";
            break;
          case 'primary':
            res.body[i].education = "小学";
            break;
          case 'juniorHigh':
            res.body[i].education = "初中";
            break;
          case 'high':
            res.body[i].education = "高中";
            break;
          case 'technicalSecondary':
            res.body[i].education = "中专";
            break;
          case 'juniorCollege':
            res.body[i].education = "大专";
            break;
          case 'regularCollege':
            res.body[i].education = "本科";
            break;
          case 'master':
            res.body[i].education = "硕士";
            break;
          case 'doctor':
            res.body[i].education = "博士";
            break;
        }
        switch (res.body[i].workingYears) {
          case 'no':
            res.body[i].workingYears = "经验不限";
            break;
          case 'ltOneYears':
            res.body[i].workingYears = "1年以下";
            break;
          case 'oneYears':
            res.body[i].workingYears = "1年以上";
            break;
          case 'betweenOneAndThreeYears':
            res.body[i].workingYears = "1-3年";
            break;
          case 'betweenOneAndTwoYears':
            res.body[i].workingYears = "1-2年";
            break;
          case 'geTwoYears':
            res.body[i].workingYears = "2年以上";
            break;
          case 'twoYears':
            res.body[i].workingYears = "2年以上";
            break;
          case 'betweenTwoAndThreeYears':
            res.body[i].workingYears = "2-3年";
            break;
          case 'betweenThreeAndFiveYears':
            res.body[i].workingYears = "3-5年";
            break;
          case 'geFiveYears':
            res.body[i].workingYears = "5年以上";
            break;
          case 'betweenFiveAndTenYears':
            res.body[i].workingYears = "5-10年";
            break;
          case 'geTenYears':
            res.body[i].workingYears = "10年以上";
            break;
          default:
            res.body[i].workingYears = "";
            break;
        }
        if (res.body[i].labels) {
          res.body[i].labels = res.body[i].labels.split(',');
            if (res.body[i].labels.length > 3) {
            res.body[i].labels = res.body[i].labels.slice(0, 3)
            }
        }
        let _div = $('<div class="job-item"></div>')
        _div.html(`
            <div class="jobInfoShell">
              <div class="jobInfoLeft">
                  <h3>${res.body[i].jobName}</h3>
                  <p class="jobInfoLeft-addr">${res.body[i].areaName}|${res.body[i].workingYears}|${res.body[i].education}|距离<span class="distance">${res.body[i].distance}</span>公里</p>
                  <p class="jobInfoLeft-labels"></p>
              </div>
              <div class="jobInfoRight">
                  <p class="salary">${res.body[i].salaryMin}k-${res.body[i].salaryMax}k</p>
              </div>
          </div>
          <div class="jobInfofoot">
              <p>面试时间:<span class="viewtime">${res.body[i].interviewTime?res.body[i].interviewTime:'等待通知'}</span></p>
              <p>已申请<span class="numb">${res.body[i].applyNumber}</span>人</p>
          </div>
            `)

        if(res.body[i].labels){
            for (let j = 0; j < res.body[i].labels.length; j++) {
                _div.find('.jobInfoLeft-labels').append(`<span>${res.body[i].labels[j]}</span>`)
            }
        } 
        if(res.body[i].type=="scene"){
            _div.find('.jobInfoRight').append(`<span class="casen">现场直面会</span>`)
        }else{
            _div.find('.jobInfoRight').append(`<span class="online">在线直聘</span>`)
        }      
        $('#joblist').append(_div);
    }
})