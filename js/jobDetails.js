let aAndI = detect()
if (aAndI == 'android') {
  console.log('android')
  if(isWeixin()){
    $('.wxmodel').css('display','block');
  }
}

var id = getQueryArgs().id
var relationId = getQueryArgs().relationId
var scanCodeType = getQueryArgs().scanCodeType
var nowHour = getQueryArgs().nowHour
var type = getQueryArgs().type
if(!type){
    $('.q-bottom').hide()
}
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
// const imgIp = 'https://img.jobpoolhr.com/'   // 图片服务器地址
// const _URL = 'https://app.jobpoolhr.com/'; //服务器地址




// 动态设置banner高度
console.log($('.q-top-bg').height())
$('.q-top-bigbox').css('height', $('.q-top-bg').height());
$(window).resize(function () {
    $('.q-top-bigbox').css('height', $('.q-top-bg').height());
})

var job = '';
var company = '';
var labels = [];
var requirements = '';
var publisher = '';
var similarJobList = [];
$.ajax({
    url:  '/api/job/get',
    type: 'get',
    data: { id: id },
    success: function (res) {
        console.log(res)
        let a = res.body.job
        if (a.workingTime) {
            let am = a.workingTime.split(' ')[1].substring(0, 5);
            let pm = a.offWorkingTime.split(' ')[1].substring(0, 5);
            a.workingTime = am + ' - ' + pm;
        }
        switch (a.education) {
            case 'no':
                a['xueliyaoqiu'] = "不限";
                break;
            case 'primary':
                a['xueliyaoqiu'] = "小学";
                break;
            case 'juniorHigh':
                a['xueliyaoqiu'] = "初中";
                break;
            case 'high':
                a['xueliyaoqiu'] = "高中";
                break;
            case 'technicalSecondary':
                a['xueliyaoqiu'] = "中专";
                break;
            case 'juniorCollege':
                a['xueliyaoqiu'] = "大专";
                break;
            case 'regularCollege':
                a['xueliyaoqiu'] = "本科";
                break;
            case 'master':
                a['xueliyaoqiu'] = "硕士";
                break;
            case 'doctor':
                a['xueliyaoqiu'] = "博士";
                break;
        }
        switch (a.workingYears) {
            case 'no':
                a['gongzuonianxian'] = "经验不限";
                break;
            case 'ltOneYears':
                a['gongzuonianxian'] = "1年以下";
                break;
            case 'oneYears':
                a['gongzuonianxian'] = "1年以上";
                break;
            case 'betweenOneAndTwoYears':
                a['gongzuonianxian'] = "1-2年";
                break;
            case 'twoYears':
                a['gongzuonianxian'] = "2年以上";
                break;
            case 'betweenTwoAndThreeYears':
                a['gongzuonianxian'] = "2-3年";
                break;
            case 'betweenThreeAndFiveYears':
                a['gongzuonianxian'] = "3-5年";
                break;
            case 'geFiveYears':
                a['gongzuonianxian'] = "5年以上";
                break;
        }
        switch (a.siesta) {
            case 'min30':
                a['wuxiu'] = "30分钟";
                break;
            case 'min45':
                a['wuxiu'] = "45分钟";
                break;
            case 'hours1':
                a['wuxiu'] = "1个小时";
                break;
            case 'hours2':
                a['wuxiu'] = "2个小时";
                break;
            case 'unfixed':
                a['wuxiu'] = "不定";
                break;
            case 'no':
                a['wuxiu'] = "无";
                break;
        }
        switch (a.workSystem) {
            case 'byDay':
                a['banzhileixing'] = "长白班";
                break;
            case 'twoTurn':
                a['banzhileixing'] = "两班倒";
                break;
            case 'threeTurn':
                a['banzhileixing'] = "三班倒";
                break;
        }
        

        if (a.interviewTime != null) {
            let str = "周";
            let date = new Date(a.interviewTime);
            let week = date.getDay();
            switch (week) {
                case 0:
                    str += "日";
                    break;
                case 1:
                    str += "一";
                    break;
                case 2:
                    str += "二";
                    break;
                case 3:
                    str += "三";
                    break;
                case 4:
                    str += "四";
                    break;
                case 5:
                    str += "五";
                    break;
                case 6:
                    str += "六";
                    break;
            }
            a["mianshishijian"] = date.getMonth() + 1 + "月" + date.getDate() + "日(" + str + ") " + date.getHours() + ":" + date.getMinutes();
        } else {
            a["mianshishijian"] = '等待面试通知'
        }
        for (let i in res.body.similarJobList) {
            let b = res.body.similarJobList[i];
            switch (b.education) {
                case 'no':
                    b['xueliyaoqiu'] = "不限";
                    break;
                case 'primary':
                    b['xueliyaoqiu'] = "小学";
                    break;
                case 'juniorHigh':
                    b['xueliyaoqiu'] = "初中";
                    break;
                case 'high':
                    b['xueliyaoqiu'] = "高中";
                    break;
                case 'technicalSecondary':
                    b['xueliyaoqiu'] = "中专";
                    break;
                case 'juniorCollege':
                    b['xueliyaoqiu'] = "大专";
                    break;
                case 'regularCollege':
                    b['xueliyaoqiu'] = "本科";
                    break;
                case 'master':
                    b['xueliyaoqiu'] = "硕士";
                    break;
                case 'doctor':
                    b['xueliyaoqiu'] = "博士";
                    break;
            }
            switch (b.workingYears) {
                case 'no':
                    b['gongzuonianxian'] = "经验不限";
                    break;
                case 'ltOneYears':
                    b['gongzuonianxian'] = "1年以下";
                    break;
                case 'betweenOneAndTwoYears':
                    b['gongzuonianxian'] = "1-2年";
                    break;
                case 'betweenOneAndThreeYears':
                    b['gongzuonianxian'] = "1-3年";
                    break;
                case 'betweenThreeAndFiveYears':
                    b['gongzuonianxian'] = "3-5年";
                    break;
                case 'betweenFiveAndTenYears':
                    b['gongzuonianxian'] = "5-10年";
                    break;
                case 'geTenYears':
                    b['gongzuonianxian'] = "10年以上";
                    break;
            }
            if (b.interviewTime != null) {
                b["mianshishijian"] = b.interviewTime
            } else {
                b["mianshishijian"] = '等待通知'
            }
            if (b.labels != null) {
                b.labels = b.labels.split(",");
            } else {
                b.labels = [];
            }
        }
        job = a;
        company = res.body.company;
        labels = res.body.labels;
        requirements = res.body.requirements;
        publisher = res.body.publisher;
        similarJobList = res.body.similarJobList;
        if(a.workingTime){
            $('.shangbanshijian').html(a.workingTime);
            $('.show1').show();
        }
        if(a.workSystem != 'byDay'){
            $('#banzhileixingbox').hide()
        }   
        $('.wuxiu').html(a.wuxiu);
        $('.banzhileixing').html(a.banzhileixing);
        $('.q-jobTitle').html(job.name);
        $('.q-jobaddress').html(job.area);
        $('.q-educational').html(job.xueliyaoqiu);
        $('.q-w-year').html(job.gongzuonianxian);
        $('.q-salary').html(`${(job.salaryMin / 1000).toFixed(1)}K~${(job.salaryMax / 1000).toFixed(1)}K`);
        $('.q-applynum').html(job.applyNumber);
        $('.q-Interviewtime-content').html(job.interviewTimeString?job.interviewTimeString:'等待通知');
        $('.q-miansidizhi').html(job.interviewAddress.substring(0,5)+'...')
        $('.q-workadd').html(job.workingAddress + job.supplementAddress)
        $('.q-km').html(job.distance)
        $('.q-incomenum').html(job.salaryMin + '-' + job.salaryMax)
        $('.q-jibengongzi').html(job.baseSalaryMin + '-' + job.baseSalaryMax)
        if(job.baseSalaryMin==0&&job.baseSalaryMax==0){
            $('.q-jibengongzi').parent().hide()
        }
        $('.q-jixiaogongzi').html(job.performanceMin + '-' + job.performanceMax)
        if(job.performanceMin==0&&job.performanceMax==0){
            $('.q-jixiaogongzi').parent().hide()
        }
        if(job.type=='online'){
            $('#mianshidizhi').hide()
            $('.fwlc-baoming').html('公司邀约');
            $('.fwlc-kefu').html('免费投递')
        }
        // if(job.type=='scene'){
        //     $('.q-workingAddress').hide()
        // }
        if(job.lookStatus == 0){
            $('.mianshidizhiqiehuan').html('邀请后可查看');
        }else{
            $('.mianshidizhiqiehuan').html('申请成功可查看');
        }
        $('.q-butie').html(job.subsidyMin + '-' + job.subsidyMax)
        if(job.subsidyMin==0&&job.subsidyMax==0){
            $('.q-butie').parent().hide()
        }
        $('.q-jiaban').html(job.overtimeSalaryMin + '-' + job.overtimeSalaryMax)
        if(job.overtimeSalaryMin==0&&job.overtimeSalaryMax==0){
            $('.q-jiaban').parent().hide()
        }
        $('.q-qita').html(job.otherSalaryMin + '-' + job.otherSalaryMax)
        if(job.otherSalaryMin==0&&job.otherSalaryMax==0){
            $('.q-qita').parent().hide()
        }
        $('.q-quanqin').html(job.attendanceBonusMin + '-' + job.attendanceBonusMax)
        if(job.attendanceBonusMin==0&&job.attendanceBonusMax==0){
            $('.q-quanqin').parent().hide()
        }
        $('.q-income-supplement').html(job.salaryDescription)

        if (labels) {
            for (let i = 0; i < labels.length; i++) {
                if (labels[i].type == 'welfare') {
                    $('.q-welfare').html(`<span class="q-welfareLabel">${labels[i].text}</span>`)
                }
                if (labels[i].type == 'workingTime') {
                    $('.q-workwelfare').html(`<span class="q-welfareLabel">${labels[i].text}</span>`)
                }
                if (labels[i].type == 'jobDuty') {
                    $('.q-fl1').html(`<span class="q-welfareLabel">${labels[i].text}</span>`)
                }
                if (labels[i].type == 'require') {
                    $('.q-fl2').html(`<span class="q-welfareLabel">${labels[i].text}</span>`)
                }
            }
        }
        $('.q-tSupplement').html(job.companyWelfare)
        $('.q-worksupplement').html(job.workingTimeDesc)
        $('.q-operatingDuty').html(job.jobDuty)
        if(job.jobDuty.length > 40){
            $('.q-operatingDuty').addClass('closebox');
            $('.bot2').show()
        }else if(job.jobDuty.length == 0){
            $('.q-operatingDuty').addClass('nonebox');
        }
        $('.q-recruitconten').html(job.jobRequire)
        if(job.jobRequire.length > 40){
            $('.q-recruitconten').addClass('closebox');
            $('.bot4').show()
        }else if(job.jobRequire.length == 0){
            $('.q-recruitconten').addClass('nonebox');
        }
        $('.q-gsAbbreviation').html(company.alias)
        $('.q-name span').html(company.name)
        $('.q-gsregion').html(company.city)
        $('.q-scale').html(company.scaleName)
        $('.q-hy').html(company.industryName)
        // $('.q-r-edu').html(requirements.educationRequirement)
        // $('.q-r-age').html(requirements.ageRequirement)
        // $('.q-r-exp').html(requirements.workExperienceRequirement)
        if(publisher){
            if(job.type=='online'){
                $('.q-p-name').html(publisher.name)
                $('.q-active').html(publisher.lastActive)
                $('.q-p-position').html(publisher.position)
                $('#zhiweifabuzhe').css('display','flex')
                $('.zhiweifabuzhebox').css('display','block')  
            }
            if (res.body.publisher.avatar) {
                $('.q-p-touxiang').attr('src', imgIp + res.body.publisher.avatar)
            }
        }
        
        if (res.body.companyLogo.sourcePath) {
            $('.q-gongsitouxiang').attr('src', imgIp + res.body.companyLogo.sourcePath)
        }
        
        if(similarJobList.length!=0){
            $('#xiangsizhiwei').show()
            $('.q-position-box').remove();
            for (let i = 0; i < similarJobList.length; i++) {
                switch (similarJobList[i].workingYears) {
                    case 'no':
                        similarJobList[i]['workingYears'] = "经验不限";
                        break;
                    case 'ltOneYears':
                        similarJobList[i]['workingYears'] = "1年以下";
                        break;
                    case 'betweenOneAndTwoYears':
                        similarJobList[i]['workingYears'] = "1-2年";
                        break;
                    case 'betweenOneAndThreeYears':
                        similarJobList[i]['workingYears'] = "1-3年";
                        break;
                    case 'betweenThreeAndFiveYears':
                        similarJobList[i]['workingYears'] = "3-5年";
                        break;
                    case 'betweenFiveAndTenYears':
                        similarJobList[i]['workingYears'] = "5-10年";
                        break;
                    case 'geTenYears':
                        similarJobList[i]['workingYears'] = "10年以上";
                        break;
                }
                let _div = $('<div class="q-position-box"></div>')
                _div.html(`
                    <div class="q-positiondetails">
                        <div class="q-position-name">${similarJobList[i].name}</div>
                        <div class="q-position-Situation">
                            <span class="q-position-region">${similarJobList[i].areaName}</span>
                            <span class="q-position-years">${similarJobList[i].gongzuonianxian}</span>
                            <span class="q-position-edu">${similarJobList[i].xueliyaoqiu}</span>
                            <span>距离 <span>${similarJobList[i].distance}</span> 公里</span>
                        </div>
                        <div class="q-position-fl">
                            
                        </div>
                        <div>
                            <span class="q-interview-t">面试时间：</span>
                            <span class="q-interview-t-content">${similarJobList[i].mianshishijian}</span>
                        </div>
                    </div>
                    <div class="q-interview-right">
                        <div class="q-interview-right-xz">${((similarJobList[i].salaryMin) / 1000).toFixed(1)}k-${((similarJobList[i].salaryMax) / 1000).toFixed(1)}k</div>
                        <div class="q-interview-right-ren">
                            已申请 <span class="q-interview-right-num"> ${similarJobList[i].applyNumber} </span>人
                        </div>
                    </div>
                    `)

                for (let b = 0; b < similarJobList[i].labels.length; b++) {
                    _div.find('.q-position-fl').append(`<span class="q-position-label">${similarJobList[i].labels[b]}</span>`)
                    if(b==2){
                        break
                    }
                }
                $('#xiangsizhiwei').append(_div);
            }
        }
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

$('.q-bottom button').click(function () {
    if (exp.test($('.q-bottom input').val())) {
        $.ajax({
            url:  '/api/shareQrCode/save',
            type: 'post',
            data: {
                relationId: relationId,
                type: type,
                phone: $('.q-bottom input').val(),
                jobId: id,
                interviewTime:'',
                scanCodeType:scanCodeType
            },
            success: function (res) {
                console.log(res)
                let aAndI = detect()
                console.log(aAndI)
                if (aAndI == 'android') {
                    console.log(nowHour)
                    if(7<parseInt(nowHour) && parseInt(nowHour)<20){
                        let src = 'https://download.jobpoolhr.com/jobpoolhr-luodiye.apk';
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
            }
        })

    } else {
        itemclick()
    }
});


function itemclick() {
    if(!type){
        let aAndI = detect()
        if (aAndI == 'android') {
            window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
        }else if(aAndI =='ios'){
          window.location.href='https://apps.apple.com/cn/app/id1485685440'
        }
        return
    }
    $("#tishibox").toggle();
};


$('.q-top-back').click(function () {
    history.back()
})
$('.q-top-fx').click(function () {
    itemclick()
})

$('.q-top-bg').click(function () {
    itemclick()
})
$('.q-competitivePower').click(function () {
    itemclick()
})
$('.q-successsee').click(function () {
    itemclick()
})
$('.q-gongsiSituation').click(function () {
    itemclick()
})
$('.q-publisher').click(function () {
    itemclick()
})
$('.q-position-box').click(function () {
    itemclick()
})
$('.q-bottom-btn').click(function () {
    itemclick()
})

function isWeixin () {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

function downbox(type){
    if(type=='duty'){
        $('.bot2').hide()
        $('.bot1').show()
        $('.q-operatingDuty').removeClass('closebox');
    }else{
        $('.bot4').hide()
        $('.bot3').show()
        $('.q-recruitconten').removeClass('closebox');
    }
}
function closebox(type){
    if(type=='duty'){
        $('.bot1').hide()
        $('.bot2').show()
        $('.q-operatingDuty').addClass('closebox');
    }else{
        $('.bot3').hide()
        $('.bot4').show()
        $('.q-recruitconten').addClass('closebox');
    }
}