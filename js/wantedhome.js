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

var mySwiper = new Swiper('.swiper-container', {
  // direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  autoplay: true,
  observer: true,       //修改swiper自己或子元素时，自动初始化swiper
  observeParents: true,  //修改swiper的父元素时，自动初始化swiper
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },

  // 如果需要前进后退按钮
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // 如果需要滚动条
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
})


var mySwiper2 = new Swiper('.swiper-container2', {
  direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  autoplay: true,
  observer: true,       //修改swiper自己或子元素时，自动初始化swiper
  observeParents: true  //修改swiper的父元素时，自动初始化swiper
})

$.ajax({
  url:  '/api/banner/list',
  type: 'get',
  data: {
    type: 'index'
  },
  success: function (res) {
    for (let i = 0; i < res.body.length; i++) {
      $('.swiper-container .swiper-wrapper').append($(`<div class="swiper-slide"> <img src="${imgIp + res.body[i].pictureLink}"> </div>`))
    }
  }
})
// 新闻
$.ajax({
  url:  '/api/news/list',
  type: 'get',
  data: {
    pageNum: 1,
    pageSize: 5,
    isHeadline: true
  },
  success: function (res) {
    $('.swiper-container2 .swiper-wrapper').empty()
    console.log(res)
    if (arr) {
      for (let i = 0; i < res.body.records.length; i++) {
        $('.swiper-container2 .swiper-wrapper').append($(`
            <div class="swiper-slide">
                <img src="../images/indexArticleIcon.png" alt="" class="q-headlines">
                <span class="q-headlines-title">${res.body.records[i].title}</span>
            </div>
          `))
      }
    }

  }
})

//定死的城市代码和经纬度  获取不到定位就以这个来展示
const cdcode = 510100;
const _lng = 104.0647;
const _lat = 30.5702;

// 获取置顶职位
$.ajax({
  url:  '/api/job/list',
  type: 'get',
  data: {
    cityCode: cdcode,
    lng: _lng,
    lat: _lat,
    homeFlag:false,
    order:'topCardList'
  },
  success: function (res) {
    console.log(res)
    let data = res.body.records
    for (let i = 0; i < data.length; i++) {
      switch (data[i].job.education) {
        case 'no':
          data[i].job.education = '不限'
          break;
        case 'juniorHigh':
          data[i].job.education = '初中'
          break;
        case 'high':
          data[i].job.education = '高中'
          break;
        case 'technicalSecondary':
          data[i].job.education = '中专'
          break;
        case 'juniorCollege':
          data[i].job.education = '大专'
          break;
        case 'regularCollege':
          data[i].job.education = '本科'
          break;
        case 'master':
          data[i].job.education = '硕士'
          break;

        case 'doctor':
          data[i].job.education = '博士'
          break;
      }
      switch (data[i].job.workingYears) {
        case 'no':
          data[i].job.workingYears = '经验不限'
          break;
        case 'ltOneYears':
          data[i].job.workingYears = '一年以内'
          break;
        case 'geOneYears':
          data[i].job.workingYears = '一年以上'
          break;
        case 'oneYears':
          data[i].job.workingYears = '一年'
          break;
        case 'betweenOneAndTwoYears':
          data[i].job.workingYears = '1-2年'
          break;
        case 'twoYears':
          data[i].job.workingYears = '2年'
          break;
        case 'geTwoYears':
          data[i].job.workingYears = '2年以上'
          break;
        case 'betweenTwoAndThreeYears':
          data[i].job.workingYears = '2-3年'
          break;
        case 'betweenOneAndThreeYears':
          data[i].job.workingYears = '1-3年'
          break;
        case 'betweenThreeAndFiveYears':
          data[i].job.workingYears = '3-5年'
          break;
        case 'geFiveYears':
          data[i].job.workingYears = '5年以上'
          break;
      }
      if (!data[i].job.interviewTimeString) {
        data[i].job.interviewTimeString = '等待通知'
      }
      let _div = $('<div class="q-position-box"></div>')
      _div.html(`<div class="q-positiondetails">
                  <div class="q-position-headr">
                      <img src="../images/toutiao.png" class="headrtoutiao" alt="">
                      <img src="${imgIp + data[i].companyLogo.sourcePath}" alt="" class="q-position-portrait">
                      <div>
                          <div class="q-position-name">${data[i].job.name}
                            <img src="../images/pugong.png" class="pugongicon"></img>
                            <img src="../images/hotfire.png" class="hoticon"></img>
                            <img src="../images/fuwenben.png" class="fuwenben"></img>
                          </div>
                          <div class="q-position-company">${data[i].job.companyName}</div>
                      </div>
                  </div>
                  <div class="q-position-Situation">
                      <span class="q-position-region">${data[i].job.area}</span>
                      <span class="q-position-years">${data[i].job.workingYears}</span>
                      <span class="q-position-edu">${data[i].job.education}</span>
                      <span>距离 <span>${data[i].job.distance}</span> 公里</span>
                  </div>
                  <div class="q-interview-right-reward"></div>
                  <div class="q-position-fl">

                  </div>
                  <div>
                      <span class="q-interview-t">面试时间：</span>
                      <span class="q-interview-t-content">${data[i].job.interviewTimeString?data[i].job.interviewTimeString:'等待通知'}</span>
                  </div>
              </div>
              <div class="q-interview-right">
                  <div class="q-interview-right-top">
                      <div class="q-interview-right-xz">${(data[i].job.salaryMin / 1000).toFixed(1)}K-${(data[i].job.salaryMax / 1000).toFixed(1)}K</div>
                      <div class="q-interview-right-type">在线直聘</div>
                      <div class="q-interview-right-type2">现场直面会</div>
                      
                  </div>
                  <div class="q-interview-right-ren">
                      已申请 <span class="q-interview-right-num"> ${data[i].job.applyNumber} </span>人
                  </div>
              </div>`)

      if(!data[i].job.general){
        _div.find('.pugongicon').css('display','none')
      }
      if(!data[i].job.popular){
        _div.find('.hoticon').css('display','none')
      }
      if(!data[i].job.isRichText){
        _div.find('.fuwenben').css('display','none')
      }

      if (data[i].labels) {
        if (data[i].labels.length > 3) {
          data[i].labels = data[i].labels.slice(0, 3)
        }
        for (let j = 0; j < data[i].labels.length; j++) {
          _div.find('.q-position-fl').append(`<span class="q-position-label">${data[i].labels[j].text}</span>`)
        }
      }
      if (data[i].job.type == 'online') {
        _div.find('.q-interview-right-type').css('display','block')
      }
      if (data[i].job.type == 'scene') {
        _div.find('.q-interview-right-type2').css('display','block')
      }
      if (data[i].job.maleReward && data[i].job.recommendReward) {
        _div.find('.q-interview-right-reward').append(`<span class="q-interview-man">男奖${arr[i].job.maleReward}</span>`)
      }
      if (data[i].job.femaleReward && data[i].job.recommendReward) {
        _div.find('.q-interview-right-reward').append(`<span class="q-interview-women">女奖${arr[i].job.femaleReward}</span>`)
      }
      if (data[i].job.recommendedAwardNew && data[i].job.recommendAmount) {
        _div.find('.q-interview-right-reward').append(`<span class="q-interview-tuijian">推荐${arr[i].job.recommendAmount}</span>`)
      }
      $('.q-position-block-top').append(_div)
      let _div2 = $('<div class="q-division"></div>')
      $('.q-position-block-top').append(_div2)
    }

  }
})



// 获取职位
let arr = []
let pages = 0
let current = 1;
$.ajax({
  url:  '/api/job/list',
  type: 'get',
  data: {
    cityCode: cdcode,
    lng: _lng,
    lat: _lat,
    homeFlag: true,
    pageNum: current
  },
  success: function (res) {
    console.log(res)
    pages = res.body.pages
    current = res.body.current;
    setArrdata([...res.body.records])
  }
})
function getlist(page) {
  if (page <= pages) {
    $.ajax({
      url:  '/api/job/list',
      type: 'get',
      data: {
        cityCode: cdcode,
        lng: _lng,
        lat: _lat,
        homeFlag: true,
        pageNum: page
      },
      success: function (res) {
        console.log(res)
        setArrdata([...res.body.records])
      }
    })
  }
}

function setArrdata(arr){
    let newArr = []
    for (let index = 0; index < arr.length; index++) {
      if (newArr.indexOf(arr[index].job.id) == -1) {
        newArr.push(arr[index].job.id)
      }else{
        arr.splice(index, 1)
      }
    }
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i].job.education) {
        case 'no':
          arr[i].job.education = '不限'
          break;
        case 'juniorHigh':
          arr[i].job.education = '初中'
          break;
        case 'high':
          arr[i].job.education = '高中'
          break;
        case 'technicalSecondary':
          arr[i].job.education = '中专'
          break;
        case 'juniorCollege':
          arr[i].job.education = '大专'
          break;
        case 'regularCollege':
          arr[i].job.education = '本科'
          break;
        case 'master':
          arr[i].job.education = '硕士'
          break;

        case 'doctor':
          arr[i].job.education = '博士'
          break;
      }
      switch (arr[i].job.workingYears) {
        case 'no':
          arr[i].job.workingYears = '经验不限'
          break;
        case 'ltOneYears':
          arr[i].job.workingYears = '一年以内'
          break;
        case 'geOneYears':
          arr[i].job.workingYears = '一年以上'
          break;
        case 'oneYears':
          arr[i].job.workingYears = '一年'
          break;
        case 'betweenOneAndTwoYears':
          arr[i].job.workingYears = '1-2年'
          break;
        case 'twoYears':
          arr[i].job.workingYears = '2年'
          break;
        case 'geTwoYears':
          arr[i].job.workingYears = '2年以上'
          break;
        case 'betweenTwoAndThreeYears':
          arr[i].job.workingYears = '2-3年'
          break;
        case 'betweenOneAndThreeYears':
          arr[i].job.workingYears = '1-3年'
          break;
        case 'betweenThreeAndFiveYears':
          arr[i].job.workingYears = '3-5年'
          break;
        case 'geFiveYears':
          arr[i].job.workingYears = '5年以上'
          break;
      }
      if (!arr[i].job.interviewTimeString) {
        arr[i].job.interviewTimeString = '等待通知'
      }
      let _div = $('<div class="q-position-box"></div>')
      _div.html(`
        <div class="q-positiondetails">
          <div class="q-position-headr">
              <img src="../images/tuijian.png" class="headrtoutiao" alt="">
              <img class="headrtoutiao2" src="../images/gongxiang.png"></img>
              <img src="${imgIp + arr[i].companyLogo.sourcePath}" alt="" class="q-position-portrait">
              <div>
                  <div class="q-position-name">${arr[i].job.name}
                    <img src="../images/pugong.png" class="pugongicon"></img>
                    <img src="../images/hotfire.png" class="hoticon"></img>
                    <img src="../images/fuwenben.png" class="fuwenben"></img>
                  </div>
                  <div class="q-position-company">${arr[i].job.companyName}</div>
              </div>
          </div>
          <div class="q-position-Situation">
              <span class="q-position-region">${arr[i].job.area}</span>
              <span class="q-position-years">${arr[i].job.workingYears}</span>
              <span class="q-position-edu">${arr[i].job.education}</span>
              <span>距离 <span>${arr[i].job.distance}</span> 公里</span>
          </div>
          <div class="q-interview-right-reward"></div>
          <div class="q-position-fl">

          </div>
          <div>
              <span class="q-interview-t">面试时间：</span>
              <span class="q-interview-t-content">${arr[i].job.interviewTimeString?arr[i].job.interviewTimeString:'等待通知'}</span>
          </div>
      </div>
      <div class="q-interview-right">
          <div class="q-interview-right-top">
              <div class="q-interview-right-xz">${(arr[i].job.salaryMin / 1000).toFixed(1)}K-${(arr[i].job.salaryMax / 1000).toFixed(1)}K</div>
              <div class="q-interview-right-type">在线直聘</div>
              <div class="q-interview-right-type2">现场直面会</div>
          </div>
          <div class="q-interview-right-ren">
              已申请 <span class="q-interview-right-num"> ${arr[i].job.applyNumber} </span>人
          </div>
      </div>
      `)
      
      if(!arr[i].job.general){
        _div.find('.pugongicon').css('display','none')
      }
      if(!arr[i].job.popular){
        _div.find('.hoticon').css('display','none')
      }
      if(!arr[i].job.isRichText){
        _div.find('.fuwenben').css('display','none')
      }
      if(arr[i].job.showType!='recommend'){
        _div.find('.headrtoutiao').css('display','none')
      }
      if(arr[i].job.showType !='other' || !arr[i].job.jobShared){
        _div.find('.headrtoutiao2').css('display','none')
      }
      if (arr[i].labels) {
        if (arr[i].labels.length > 3) {
          arr[i].labels = arr[i].labels.slice(0, 3)
        }
        for (let j = 0; j < arr[i].labels.length; j++) {
          _div.find('.q-position-fl').append(`<span class="q-position-label">${arr[i].labels[j].text}</span>`)
        }
      }
      if (arr[i].job.type == 'online') {
        _div.find('.q-interview-right-type').css('display','block')
      }
      if (arr[i].job.type == 'scene') {
        _div.find('.q-interview-right-type2').css('display','block')
      }
      if (arr[i].job.maleReward && arr[i].job.recommendReward) {
        _div.find('.q-interview-right-reward').append(`<span class="q-interview-man">男奖${arr[i].job.maleReward}</span>`)
      }
      if (arr[i].job.femaleReward && arr[i].job.recommendReward) {
        _div.find('.q-interview-right-reward').append(`<span class="q-interview-women">女奖${arr[i].job.femaleReward}</span>`)
      }
      if (arr[i].job.recommendedAwardNew && arr[i].job.recommendAmount) {
        _div.find('.q-interview-right-reward').append(`<span class="q-interview-tuijian">推荐${arr[i].job.recommendAmount}</span>`)
      }
      $('.q-position-block').append(_div)
      let _div2 = $('<div class="q-division"></div>')
      $('.q-position-block').append(_div2)
    }
}

$('.swiper-wrapper').on('click', '.swiper-slide', function () {
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


$('.q-top-option').on('click', '.q-top-optiontab', function () {
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

$('.q-tabbox').on('click', '.q-tab', function () {
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

$('.q-position-block').on('click', '.q-position-box', function () {
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

$('.q-position-block-top').on('click', '.q-position-box', function () {
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

$('.q-recommend-set').click(function () {
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

$('.swiper-container-vertical').on('click', '.swiper-container-vertical',function () {
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
//判断当前设备
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
//文档高度

function getDocumentTop() {

  var scrollTop = 0,

  bodyScrollTop = 0,

  documentScrollTop = 0;

  if (document.body) {

    bodyScrollTop = document.body.scrollTop;

  }

  if (document.documentElement) {

    documentScrollTop = document.documentElement.scrollTop;

  }

  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;

  return scrollTop;

}
//可视窗口高度

function getWindowHeight() {

  var windowHeight = 0;

  if (document.compatMode == "CSS1Compat") {

    windowHeight = document.documentElement.clientHeight;

  } else {

    windowHeight = document.body.clientHeight;

  }

  return windowHeight;

}

//滚动条滚动高度

function getScrollHeight() {

  var scrollHeight = 0,

  bodyScrollHeight = 0,

  documentScrollHeight = 0;

  if (document.body) {

    bodyScrollHeight = document.body.scrollHeight;

  }

  if (document.documentElement) {

    documentScrollHeight = document.documentElement.scrollHeight;

  }

    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;

  return scrollHeight;

}

//下面我们需要一个监听滚动条的事件

window.onscroll = function () {

  //当滚动条移动马上就出发我们上面定义的事件触发函数,但是我们要求的是滚动条到底后才触发,所以自然这个触发事件里面需要逻辑控制一下.

  if(getScrollHeight() == getWindowHeight() + getDocumentTop()){
      if (current <= pages) {
        current = current+1
        getlist(current)
      }
    }

}
