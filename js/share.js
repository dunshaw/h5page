

let nowUrl = window.location.host;
var imgIp;
var _URL;
console.log(nowUrl)
if(nowUrl=='apptest.jobpoolhr.com'){
    imgIp ='https://imgtest.jobpoolhr.com/'
    _URL = 'https://apptest.jobpoolhr.com/api'
}else{
    imgIp = 'https://img.jobpoolhr.com/'
    _URL = 'https://app.jobpoolhr.com/api'
}


const exp = /^1\d{10}$/;   //手机号正则
var str = location.search.split('?')[1];
// var relationId = str.split('&')[0].split('=')[1];
var relationId = getQueryArgs().relationId
var jobId = getQueryArgs().id?getQueryArgs().id:''
var scanCodeType = getQueryArgs().scanCodeType
// var interviewTime = getQueryArgs().interviewTime

var type = str.split('&')[1].split('=')[1];

//获取手机屏幕高度
var winHeight = $(window).height();
$(window).resize(function() {
    var thisHeight = $(this).height();
    var keyboardHeight = thisHeight - winHeight;
    $(".q-bigbox").css({ 'bottom': keyboardHeight + 'px' });
});
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

$.ajax({
    url:  '/api/job/findRandomJobs',
    type: 'get',
    success: function (res) {
      console.log(res)
      $('.content').empty()
      let data = res.body;
      for (let i = 0; i < data.length; i++) {
          let _div = $('<div class="content-item" onclick="itemclick()"></div>')
          _div.html(`<div class="content-item-left">
                    <div class="content-item-left-top">
                        <div class='imgdiv'><img src="${imgIp +data[i].logoPath}" alt=""></div>
                        <div class='jobnamediv'>
                            <h3>${data[i].jobName}</h3>
                            <p>${data[i].companyName}</p>
                        </div>
                    </div>
                    <div class="content-item-left-bottom">
                    </div>
                    <div class="content-item-reward-bottom">
                    </div>
                </div>
                <div class="content-item-right">
                    <h3>${(data[i].salaryMin / 1000).toFixed(1)}K-${(data[i].salaryMax / 1000).toFixed(1)}k</h3>
                </div>`)
          if (data[i].labels != null) {
                data[i].labels = data[i].labels.split(",");
            } else {
                data[i].labels = [];
            }
          if (data[i].labels) {
            if (data[i].labels.length > 3) {
              data[i].labels = data[i].labels.slice(0, 3)
            }
            for (let j = 0; j < data[i].labels.length; j++) {
              _div.find('.content-item-left-bottom').append(`<span class="q-position-label">${data[i].labels[j]}</span>`)
            }
          }
          if (data[i].maleReward && data[i].recommendReward) {
            _div.find('.content-item-reward-bottom').append(`<div class="m_reward">男奖${data[i].maleReward}</div>`)
          }
          if (data[i].femaleReward && data[i].recommendReward) {
            _div.find('.content-item-reward-bottom').append(`<div class="w_reward">女奖${data[i].femaleReward}</div>`)
          }
          if (data[i].recommendedAwardNew && data[i].recommendAmount) {
            _div.find('.content-item-reward-bottom').append(`<div class="r_reward">推荐${data[i].recommendAmount}</div>`)
          }
          $('.content').append(_div)
      }
    }
  })


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
                interviewTime:'',
                scanCodeType:scanCodeType
            },
            success: function (res) {
                console.log(res)
                let aAndI = detect()
                console.log(aAndI)
                if (aAndI == 'android') {
                  window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
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

function itemclick() {
  console.log('123')
  // window.location.href = `../page/jobDetails.html?id=${e.currentTarget.dataset.id}`
  let timer = setInterval('changeColor()',300);
  setTimeout(()=>{
    clearInterval(timer);
    $(".q-bottom input").css("background","#eee");
  },1500)
};
var colorFlag = 0;
function changeColor(
  ) { 
  if (!colorFlag)
  {
   $(".q-bottom input").css("background","#fff");
   colorFlag = 1;
  }else{
   $(".q-bottom input").css("background","#eee");
   colorFlag = 0;
  }
}

