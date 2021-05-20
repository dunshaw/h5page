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
}else if(nowUrl=='download.jobpoolhr.com' || nowUrl == 'app.jobpoolhr.com'){
  imgIp = 'https://img.jobpoolhr.com/'
  _URL = 'https://app.jobpoolhr.com/'
}else{
  imgIp ='https://imgtest.jobpoolhr.com/'
  _URL = 'https://apptest.jobpoolhr.com/'
}

var _model =''
if(navigator.userAgent.toLowerCase().indexOf('miniprogram') != -1){
  console.log("微信小程序");
  _model = 1
} else if (navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1){
    console.log("微信内置浏览器");
    _model = 0
}else{
  _model = 2
}

// 判断手机类型
function detect() {
  var equipmentType = "";
  var agent = navigator.userAgent.toLowerCase();
  var android = agent.indexOf("android");
  var iphone = agent.indexOf("iphone");
  var ipad = agent.indexOf("ipad");
  if (android != -1) {
    equipmentType = "android";
  }
  if (iphone != -1 || ipad != -1) {
    equipmentType = "ios";
  }
  return equipmentType;
}
// 微信安卓浏览器模态显示
if((detect()=='android') && (_model==0)){
  $('.wxmodel').show()
}else{
  $('.wxmodel').hide()
}

var jobHuntingIntention = false;
var islogin = false;
var isVip = false;
var token = getQueryArgs().token;

console.log(token)
if(token){
  $.ajax({
    url:'/api/user/getJobHuntingIntentionH5',
    type:'get',
    data:{token:token},
    success: function (res) {
      console.log(res)
      if(res.code == 200 && res.body){
        jobHuntingIntention = res.body.expectIndustry?true:false
      }
    }
  })
  $.ajax({
    url:'/api/user/getUserH5',
    type:'get',
    data:{token},
    success: function (res) {
      console.log(res)
      if(res.code == 200){
        islogin = true
        $('.username').text(res.body.name)
        if(res.body.avatar){
          $('.hasnoavatar').attr('src',imgIp+res.body.avatar).show()
          $('.noavatar').hide()
        }else{
          $('.hasnoavatar').hide()
        }
        isVip = res.body.purchaseCVip?res.body.purchaseCVip:false
        setvipstyle()
      }
    }
  })
}else{
  setvipstyle()
}

// 获取今天日期
const d = new Date().getDate();
const y = new Date().getFullYear();
const m = new Date().getMonth() + 1;
var today = `${y}-${m}-${d} 00:00:00`
var pageNum = 1;
var loading = false;
getlist()

// 获取职位列表
function getlist(){
  $.ajax({
    url:`/api/job/list?cityCode=510100&interViewTime=${today}&pageNum=${pageNum}&lat=30.5702&lng=104.0647&feature=scene`,
    type:'get',
    success: function (res) {
      console.log(res)
      if(res.code == 200 && res.body.records){
        if(pageNum == 1){
          $('.mslist').empty()
        }
        if(res.body.records && res.body.records.length == 10){
          loading = false
        }
        for (let item of res.body.records) {
          switch (item.job.education) {
            case 'no':
              item.job.education = "学历不限";
              break;
            case 'primary':
              item.job.education = "小学";
              break;
            case 'juniorHigh':
              item.job.education = "初中";
              break;
            case 'high':
              item.job.education = "高中";
              break;
            case 'technicalSecondary':
              item.job.education = "中专";
              break;
            case 'juniorCollege':
              item.job.education = "大专";
              break;
            case 'regularCollege':
              item.job.education = "本科";
              break;
            case 'master':
              item.job.education = "硕士";
              break;
            case 'doctor':
              item.job.education = "博士";
              break;
          }
          let _div = $('<div class="item" onclick="gotodetails(`'+item.job.id+'`)" ></div>')
          _div.html(`
            <div class="main">
              <div class="info">
                <image class="companylogo" src="${imgIp+item.companyLogo.sourcePath}" />
                <div class="name">
                  <div class="title">
                    ${item.job.name}
                  </div>
                  <div class="subtitle">${item.job.companyName}</div>
                </div>
              </div>
              <div class="xz">
                <div style="font-size:12px;text-align:center">${((item.job.salaryMin) / 1000).toFixed(1)}K - ${(item.job.salaryMax / 1000).toFixed(1)}K</div>
                <div class="companypgbox"></div>
                <span class="typespan">现场直面会</span>
              </div>
            </div>
            <div class="need">
              <span>
                ${item.job.area} | ${item.job.workingYearsShow}| ${item.job.education } | 距离
                <span class="num" >${item.job.distance }</span>公里
              </span>
              <div class="tuijianbox">
                
              </div>
              <div class="q-position-fl">
                
              </div>
            </div>
            <div class="dividerline"></div>
            <div class="time">
              <span>面试时间:<span class="num">${item.job.interviewTimeString?item.job.interviewTimeString:"等待通知" }</span></span>
              <span>已申请<span class="num">${item.job.applyNumber }</span> 人</span>
            </div>
          `)
          if(item.job.recommendReward){
            _div.find('.xz').append(`
              <div class="shouyelabelbox" >
                <span class="less"></span>
                <div class="shouyelabel">
                  入职奖励${item.job.femaleReward>item.job.maleReward?item.job.femaleReward:item.job.maleReward}
                </div>
              </div>
            `)
          }
          if(item.job.hourWage){
            _div.find('.companypgbox').append(`<image src="../images/xiaoshi.png" class="companypg"></image>`)
          }
          if(item.job.partTimeJob){
            _div.find('.companypgbox').append(`<image src="../images/jianzhi.png" class="companypg"></image>`)
          }
          if(item.job.general){
            _div.find('.companypgbox').append(`<image src="../images/pugong.png" class="companypg"></image>`)
          }
          if(item.job.popular){
            _div.find('.companypgbox').append(`<image src="../images/hotfire.png" class="companypg"></image>`)
          }
          if(item.job.isRichText){
            _div.find('.companypgbox').append(`<image src="../images/fuwenben.png" class="companypg"></image>`)
          }
          if(item.job.quickEntry){
            _div.find('.companypgbox').append(`<image src="../images/speed.png" class="companypg"></image>`)
          }
          if(item.job.dailyWage){
            _div.find('.companypgbox').append(`<image src="../images/rijie.png" class="companypg2"></image>`)
          }

          if(item.job.recommendedAwardNew&&item.job.recommendAmount){_div.find('.tuijianbox').append(`<div class="tuijian">推荐${item.job.recommendAmount}</div>`)}
          
          if(item.labels && item.labels.length>0){
            for (let b = 0; b < item.labels.length; b++) {
                _div.find('.q-position-fl').append(`<span class="q-position-label">${item.labels[b].text}</span>`)
                if(b==2){
                    break
                }
            }
          }
          
          $('.mslist').append(_div);
        }
        $('.nodatabox').hide()
      }else{
        if(pageNum==1){
          $('.mslist').hide()
        }
      }
    }
  })
}
function setvipstyle(){
  if(isVip){
    $('.titlebox').addClass('vipcolor')
    $('.user-panel').addClass('vipcolor2')
    $('.novipsan').hide()
    $('.yellow-btn').hide()
    if(token){
      $('.ifshow2').show()
    }
  }else{
    $('.vipimg').hide()
    $('.botbox').show()
    $('.joblist').css('padding-bottom','4rem')
    $('.titlebox').addClass('ordinarycolor')
    $('.user-panel').addClass('ordinarycolor2')
    if(token){
      $('.ifshow1').show()
    }
  }
}



$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
    var scrollHeight = $(document).height();   //当前页面的总高度
    var clientHeight = $(this).height();    //当前可视的页面高度
    var totalHeight = parseFloat(clientHeight) + parseFloat(scrollTop);

    if (scrollHeight - totalHeight < 40) {  
      if (!loading) {
          loading = true;
          pageNum += 1;
          //加载数据
          getlist();
      } else {
          return false;
      }
    }
});

// 跳转职位详情
function gotodetails(id){
  console.log(id)
  if(!islogin){
    download()
    return false
  }
  let aAndI = detect()
  if(_model == 1){
    wx.miniProgram.navigateTo({
      url:`../recruitDetail/recruitDetail?id=${id}&interviewTime=${today}&cityCode=510100`,//跳转回小程序的页面
      success: function(){
        console.log('success')
      },
      fail: function(){
        console.log('fail');
      },
    });
  }else if (aAndI == 'android') {
    let params = JSON.stringify({id:id,type:'job'})
    window.test.callbackAndroid(params)
  }else{
    let params = {id:id,type:'job'}
    window.webkit.messageHandlers.jobCompanyDetail.postMessage(params)
  }
}

// 跳转求职意向
function jobintention(){
  console.log(jobHuntingIntention)
  if(!islogin){
    download()
    return false
  }
  if(jobHuntingIntention){
    freetocharge()
  }else{
    let aAndI = detect();
    if(_model == 1){
      console.log("微信小程序");
      wx.miniProgram.redirectTo({
        url:'../../packageA/pages/wantedJob/wantedJob?member=1&src='+window.location.href.split('?')[0],//跳转回小程序的页面
        success: function(){
          console.log('success')
        },
        fail: function(){
          console.log('fail');
        },
      });
    }else if(aAndI=='android'){
      let params = JSON.stringify({back:true})
      window.test.jobHuntingIntention(params)
    }else{
      let params = {back:true}
      window.webkit.messageHandlers.jobHuntingIntention.postMessage(params)
    }
    return false
  }
}
// 下载
function download() {
  let aAndI = detect();
  var myDate = new Date();
  var nowHour = myDate.getHours(); //获取当前小时数(0-23)
  if (aAndI == 'android') {
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
    // window.open('https://apps.apple.com/cn/app/id1485685440')
    window.location.href='https://apps.apple.com/cn/app/id1485685440'
  }
  else {
      alert('请在移动端打开该网页')
      return
  }
}
// 免费领取
function freetocharge(){
  if(islogin){
    $.ajax({
      url:`/api/userProps/buyVipCustomer?token=${token}`,
      type:'get',
      success: function (res) {
        console.log(res)
        if(res.code == 200){
          $('.tipsbox').show()
          setTimeout(()=>{
            window.location.reload()
            isVip = true
          },2000)
        }else{
          return Toast.fail(res.data.msg);
        }
      }
    })
  }else{
    download()
  }
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