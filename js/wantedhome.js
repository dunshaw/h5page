const _URL = 'https://tiger.quanjikj.com'; //服务器地址
const imgIp = 'https://img.quanjikj.com/'   // 图片服务器地址
// const imgIp = 'https://img.quanjikj.com/'   // 图片服务器地址

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
    if (arr) {
      for (let i = 0; i < res.body.records.length; i++) {
        $('.swiper-container2 .swiper-wrapper').append($(`
            <div class="swiper-slide">
                <img src="../images/indexArticleIcon.png" alt="" class="q-headlines">
                <span class="q-headlines-label">行业</span>
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

// 热招职位
let arr = []
let pages = 0
$.ajax({
  url:  '/api/job/list',
  type: 'get',
  data: {
    cityCode: cdcode,
    lng: _lng,
    lat: _lat
  },
  success: function (res) {
    pages = res.body.pages
    if (res.body.current <= pages) {
      arr = [...res.body.records]
      getlist(res.body.current + 1)
    }
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
        pageNum: page
      },
      success: function (res) {
        arr = [...arr, ...res.body.records]
        getlist(page + 1)
      }
    })
  }
  else {
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
      $('.q-position-block').append(`
              <div class="q-position-box">
              <div class="q-positiondetails">
                  <div class="q-position-headr">
                      <img src="${imgIp + arr[i].companyLogo.sourcePath}" alt="" class="q-position-portrait">
                      <div>
                          <div class="q-position-name">${arr[i].job.name}</div>
                          <div class="q-position-company">${arr[i].company.name}</div>
                      </div>
                  </div>
                  <div class="q-position-Situation">
                      <span class="q-position-region">${arr[i].job.area}</span>
                      <span class="q-position-years">${arr[i].job.workingYears}</span>
                      <span class="q-position-edu">${arr[i].job.education}</span>
                      <span>距离 <span>${arr[i].job.distance}</span> 公里</span>
                  </div>
                  <div class="q-position-fl">

                  </div>
                  <div>
                      <span class="q-interview-t">面试时间：</span>
                      <span class="q-interview-t-content">${arr[i].job.interviewTimeString}</span>
                  </div>
              </div>
              <div class="q-interview-right">
                  <div class="q-interview-right-top">
                      <div class="q-interview-right-xz">${arr[i].job.salaryMin / 1000}K-${arr[i].job.salaryMax / 1000}K</div>
                      <div class="q-interview-right-reward">

                      </div>
                  </div>
                  <div class="q-interview-right-ren">
                      已申请 <span class="q-interview-right-num"> ${arr[i].job.applyNumber} </span>人
                  </div>
              </div>
         </div>
         <div class="q-division"></div>
         `)
      if (arr[i].labels) {
        if (arr[i].labels.length > 3) {
          arr[i].labels = arr[i].labels.slice(0, 3)
        }
        for (let j = 0; j < arr[i].labels.length; j++) {
          let s = $(`<span class="q-position-label">${arr[i].labels[j].text}</span>`)[0]
          $('.q-position-fl')[i].appendChild(s)
        }
      }
      if (arr[i].job.type == 'online') {
        let d1 = $(`<div class="q-interview-right-type">在线直聘</div>`)[0]
        $('.q-interview-right-top')[i].insertBefore(d1, $('.q-interview-right-reward')[i])
      }
      if (arr[i].job.type == 'scene') {
        let d2 = $(`<div class="q-interview-right-type2">现场直面会</div>`)[0]
        $('.q-interview-right-top')[i].insertBefore(d2, $('.q-interview-right-reward')[i])
      }
      if (arr[i].job.maleReward) {
        let s1 = $('<span class="q-interview-man">男奖400</span>')[0]
        $('.q-interview-right-reward')[i].appendChild(s1)
      }
      if (arr[i].job.femaleReward) {
        let s2 = $('<span class="q-interview-women">女奖300</span>')[0]
        $('.q-interview-right-reward')[i].appendChild(s2)
      }

    }
  }

}

$('.swiper-wrapper').on('click', '.swiper-slide', function () {
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


$('.q-top-option').on('click', '.q-top-optiontab', function () {
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

$('.q-tabbox').on('click', '.q-tab', function () {
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

$('.q-position-block').on('click', '.q-position-box', function () {
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
