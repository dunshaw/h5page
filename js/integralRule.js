var str = location.search.split('?')[1].split('=')[1];

$.ajax({
    url: `/api/setting/getRichText/${str}`,
    type: 'get',
    success: function (res) {
        console.log(res)
        $('.q-box').html(res.body.value)
    }
})