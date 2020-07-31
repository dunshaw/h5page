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
    _URL = 'https://app.jobpoolhr.com'
    
}else{
    imgIp ='https://imgtest.jobpoolhr.com/'
    _URL = 'https://apptest.jobpoolhr.com/'
}

// 轮播
setTimeout(function () {
  var mySwiper = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: true,
    observer: true,       //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true  //修改swiper的父元素时，自动初始化swiper

  })
}, 1000)

// 获取轮播图
$.ajax({
  url:  '/api/banner/list',
  type: 'get',
  data: {
    type: 'community'
  },
  success: function (res) {
    console.log(res)
    for (let i = 0; i < res.body.length; i++) {
      $('.swiper-container .swiper-wrapper').append($(`<div class="swiper-slide"> <img src="${imgIp + res.body[i].pictureLink}"> </div>`))
    }
  }
})
// 获取评论
let comments = [] //评论列表
$.ajax({
  url:  '/api/community/list?lng=104.0647&lat=30.5702',
  type: 'get',
  success: function (res) {
    console.log(res)
    if (res.body.length != 0) {
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].commentList.length) {
          comments.push(res.body[i].commentList)
        }
        //判断自己是否点赞
        if (res.body[i].isLike) {
          $('.q-block4-faandcom-left img').attr('src', '../images/zany.png')
        }
        // 显示基本信息
        let basrinfo = `
        <div class="item">
          <div class="q-block4-msgtop">
            <div class="q-block4-msgtop-left">
              <img src="${ (res.body[i].userAvatar == 'null' || !res.body[i].userAvatar) ? '../images/dftouxiang.png' : imgIp + res.body[i].userAvatar}" alt="">
              <div class="q-block4-msgtop-leftuser">
                  <span class="q-block4-msgtop-username">${res.body[i].userName}</span>
                  <span class="q-block4-msgtop-onlinetime">${res.body[i].releaseTime}</span>
              </div>
            </div>
            <div class="q-block4-msgtop-right">
              <img src="../images/hotfire.png" alt="">
              <span>${res.body[i].viewNumber}</span>
            </div>
          </div>
          <div class="q-block4-msgcontent">
            <div class="q-block4-msgcontent-text">${res.body[i].content}</div>
            <div class="q-block4-msgcontent-photos"></div>
            <div class="q-block4-msgcontent-photos-bottom">
              <div class="q-block4-distance">距离 <span>${res.body[i].distance}</span> 公里</div>
              <div class="q-block4-faandcom">
                  <div class="q-block4-faandcom-left">
                      <img src="../images/zann.png" alt="">
                      <span>${res.body[i].likeNumber}</span>
                  </div>
                  <div class="q-block4-faandcom-right">
                      <img src="../images/Producttheory.png" alt="">
                      <span>${res.body[i].commentNumber}</span>
                  </div>
              </div>
            </div>
          </div>
          <div class="q-block4-comment"></div>
        </div>
        `
        $('.q-block4-con').append(basrinfo)

        //聊天图片
        if (res.body[i].resourceFileList) {
          for (let j = 0; j < res.body[i].resourceFileList.length; j++) {
            let img = document.createElement('img');
            img.setAttribute('src', imgIp + res.body[i].resourceFileList[j])
            $('.q-block4-msgcontent-photos')[i].appendChild(img)
          }
        }

        //聊天内容
        let len = 0
        // 评论数小于等于3
        if (res.body[i].commentList.length <= 3) {
          len = res.body[i].commentList.length
        }
        // 评论数大于3
        else {
          len = 3;
        }
        for (let j = 0; j < len; j++) {
          // item = 
          $('.q-block4-comment').eq(i).append(`
            <div class="q-block4-comment1">
                <span class="q-block4-comment-user">${res.body[i].commentList[j].commentUser}：</span>
                <span class="q-block4-comment-text">${res.body[i].commentList[j].content}</span>
              </div>
            `)
        }
        if (res.body[i].commentList.length != 0) {
          // 超出隐藏
          $('.item').eq(i).append(`
            <div class="q-block4-seeall">
                查看全部${res.body[i].commentNumber}条评论
            </div>
          `)
        }
      }
      // // 提取content存入arr
      // let arr = []
      // for (let index = 0; index < comments.length; index++) {
      //   const element = comments[index];
      //   for (let index = 0; index < element.length; index++) {
      //     const element1 = element[index];
      //     if (element1.content) {
      //       arr.push(element1.content)
      //     }
      //   }
      // }
      // let num = 0
      // // danmu(arr[0], 0)
      // const timer = setInterval(() => {
      //   num++
      //   if (num === arr.length ) {
      //     num = 0
      //     // clearInterval(timer)
      //     $('.q-block3-contentbox').empty()
      //   }
      //   danmu(arr[num], num)
      // }, 1000);

    }
  }
})

// 获取弹幕
$.ajax({
  url:  '/api/community/hotlist',
  type: 'get',
  success: function (res) {
    console.log(res)

  }
})

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

$('.q-block2').on('click', '.q-block2-job', function () {
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

$('.q-block4-titleshe').click(function () {
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

$('.q-block4-titlesee').click(function () {
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

$('.q-block4-con').click(function () {
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


$('.q-bottom').on('click', '.q-bottom-tab', function () {
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

function danmu(content, num) {
  const tops = ['0%', '25%', '75%', '100%']
  $('.q-block3-contentbox').append(`<span class="q-block3-c"> ${content}~</span>`)
  $('.q-block3-c').eq(num).css({ 'top': tops[Math.floor(Math.random() * 4)] })
  $('.q-block3-c').eq(num).animate({ 'left': '-100%', }, 5000, 'linear')
}