const exp = /^1\d{10}$/;   //手机号正则
const _URL = 'https://tiger.quanjikj.com'; //服务器地址
var referrerUserId = location.search.split('?')[1].split('&')[0].split('=')[1]
console.log(referrerUserId)
var h = window.screen.height;
$('.q-elastic-bg').css('height', h)

$('.q-bottom-top-im').click(function () {
    if (exp.test($('.q-bottom-top-phone').val()) && $.trim($('.q-bottom-top-name').val())) {
        $.ajax({
            url:  '/api/recommendFriends/save',
            type: 'post',
            data: {
                friendName: $('.q-bottom-top-name').val(),
                friendPhone: $('.q-bottom-top-phone').val(),
                referrerUserId: referrerUserId
            },
            success: function (res) {
                if (res.code == 200) {
                    $('.q-elastic-bg').css('display', 'block')
                } else {
                    $('.q-ela-tps').css('display', 'block');
                    $('.q-ela-tps-content').text(res.msg);
                }
            }
        })
    } else {
        alert('输入的信息不合法')
    }
})

$('.q-elastic-false').click(function () {
    $('.q-elastic-bg').css('display', 'none')
})
$('.q-elastic-true').click(function () {
    $('.q-elastic-bg').css('display', 'none')
})

$('.q-ela-tps-btn').click(function () {
    $('.q-ela-tps').css('display', 'none')
})
// $(document).scroll(function(){

// })