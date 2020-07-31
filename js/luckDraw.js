
var nowUrl = window.location.host;
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


//获取临时token

const token = getQueryArgs().token;
const liArr = [0, 1, 2, 4, 7, 6, 5, 3]; //转动顺序
// const arr = ['10积分','1000M流量','30积分','iphoneXS','商城优惠卷','谢谢参与','80积分','5积分'];
var arr = []; //['10积分','1000M流量','30积分','商城优惠卷','5积分','80积分','谢谢参与','iphoneXS'];
var n = 0;        //圈数
var a = 0;
var b = 0;         //每圈加id的数量
var btn = false;

var integral = 0;   // 当前积分
var count = 0;   // 免费次数    
$.ajax({
    url:  '/api/user/getIntegral',
    type: 'get',
    data: {
        token: token
    },
    async: false,
    success: function (res) {
        console.log(res)
        if (res.code == 200) {
            integral = res.body.intergral;
            count = res.body.count;
            $('#intergral').text(integral);
            
            // freechange
        }
    }
})

$.ajax({
    url:  '/api/prize/list',
    type: 'get',
    async: false,
    success: function (res) {
        console.log(res)
        arr = res.body
        getuserlist()
        $('.q-choujiangqu').append(`
            <li class="q-xz">
                <div>
                    <img src="${imgIp + res.body[1].image}"> 
                </div>
                <span>${res.body[1].name}</span>
            </li>
            <li class="q-xz">
                <div>
                    <img src="${imgIp + res.body[2].image}"> 
                </div>
                <span>${res.body[2].name}</span>
            </li>
            <li class="q-xz">
                <div>
                    <img src="${imgIp + res.body[3].image}"> 
                </div>
                <span>${res.body[3].name}</span>
            </li>
            <li class="q-xz">
                <div>
                    <img src="${ imgIp + res.body[0].image}"> 
                </div>
                <span>${res.body[0].name}</span>
            </li>
            <li id="q-choujiang-btn">
                <div>
                    抽奖
                </div>
                <span>（使用10工钱）</span>
            </li>
            <li class="q-xz">
                <div>
                    <img src="${imgIp + res.body[4].image}" alt="">
                </div>
                <span>${res.body[4].name}</span>
            </li>
            <li class="q-xz">
                <div>
                    <img src="../images/3Q.png" alt="">
                </div>
                <span>谢谢参与</span>
            </li>
            <li class="q-xz">
                <div>
                    <img src="${imgIp + res.body[6].image}" alt="">
                </div>
                <span>${res.body[6].name}</span>
            </li>
            <li class="q-xz">
                <div>
                    <img src="${imgIp + res.body[5].image}" alt="">
                </div>
                <span>${res.body[5].name}</span>
            </li>
        `)
        if(count != 0){
            $('#q-choujiang-btn span').text(`今日剩余免费次数 \n ${count}次`);
        }
    }
})

//点击开始抽奖
$('.q-choujiangqu').on('click', '#q-choujiang-btn', function () {
    //判断当前是否在抽奖
    if (btn) return false;
    btn = true;
    //判断当前积分是否够一次抽奖
    console.log(integral,count)
    if (integral >= 10 || count != 0 ) {
        $.ajax({
            url:  '/api/user/integralLottery',
            type: 'post',
            data: {
                token: token
            },
            async: false,
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    //将抽奖后的积分重新赋值
                    integral = res.body.intergral;
                    count = res.body.count;
                    $('#intergral').html(integral);;
                    if(count == 0){
                        $('#q-choujiang-btn span').text(`（使用10工钱）`);
                    }else{
                        $('#q-choujiang-btn span').text(`今日剩余免费次数${count}次`);
                    }
                    var z = 6; //random(0,8);
                    var timer1 = setInterval(function () {
                        $('.q-xz').attr('id', '')
                        if (a >= $('.q-xz').length) {
                            a = 0;
                        }
                        console.log(liArr[a])
                        $('.q-xz')[liArr[a]].setAttribute('id', 'q-active')
                        a++
                        b++
                        if (b == 8) {
                            b = 0
                            n++
                        }

                        if (n == 3) {
                            b = 0
                            clearInterval(timer1)
                            var timer2 = setInterval(function () {
                                addID()
                                if (b == 8) {
                                    b = 0
                                    clearInterval(timer2)
                                    var timer3 = setInterval(function () {
                                        $('.q-xz').attr('id', '')
                                        $('.q-xz')[liArr[b]].setAttribute('id', 'q-active')

                                        if (b == z) {
                                            clearInterval(timer3)
                                            $('.q-zhe').css('display', 'block');
                                            $('.q-dialog').css('display', 'block');
                                            $('.q-dialog-content').text('您获得：谢谢参与');

                                            btn = false;
                                            b = 0;
                                            a = 0;
                                            n = 0;
                                        }
                                        b++
                                    }, 350)
                                }
                            }, 200)
                        }
                    }, 100)
                } else {
                    $('.q-zhe').css('display', 'block');
                    $('.q-dialog').css('display', 'block');
                    $('.q-dialog-content').html(res.msg);
                }
            }
        })
    } else {
        $('.q-zhe').css('display', 'block');
        $('.q-dialog').css('display', 'block');
        $('.q-dialog-content').html('您的工钱不足!');
    }
})

$('.q-dialog-btn').click(function () {
    $('.q-zhe').css('display', 'none');
    $('.q-dialog').css('display', 'none')
    btn = false;
})
function addID() {
    $('.q-xz').attr('id', '')
    $('.q-xz')[liArr[b]].setAttribute('id', 'q-active')
    b++
}

function random(n, m) {
    return parseInt((m - n) * Math.random() + n);
}
function getuserlist() {
    let num = 0
    let item = ''
    let time = ''
    for (let index = 0; index < 12; index++) {
        num = Math.floor(Math.random() * 7)
        time = new Date().getTime() - 38 * 60 * 1000 - index * 38 * 60 * 1000 //38分钟前时间戳
        name = Math.random().toString(36).substr(2, 8)
        item = `<p> ${new Date(time).getMonth() + 1}-${new Date(time).getDate()} ${new Date(time).getHours()}:${new Date(time).getMinutes().toString().length === 1 ? '0' + new Date(time).getMinutes() : new Date(time).getMinutes()}  ${name} 抽中了${arr[num].name}</P>`
        $('.q-zhongjiang-conten').append(item)
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

// $('.q-bigbox').css('height', h + 'px')