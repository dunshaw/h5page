const _URL = 'https://tiger.quanjikj.com'; //服务器地址
const imgIp = 'https://img.quanjikj.com/'   // 图片服务器地址

// var jobId = location.search.split('#')[1].split('$')[0].split('!')[1];
// var userId = location.search.split('#')[1].split('$')[1].split('!')[1];
var jobId = location.search.split('?')[1].split('&')[0].split('=')[1];
var userId = location.search.split('?')[1].split('&')[1].split('=')[1];

$.ajax({
    url:  '/api/user/resumeCompetitiveness',
    type: 'get',
    data: {
        jobId: jobId,
        userId: userId
    },
    success: function (res) {
        console.log(res)
        $('.q-block1-num').text(res.body.score);
        $('.q-block1-proportion').text(res.body.proportion + '%');

        //根据得分比例判断所在位置及箭头位置
        if (res.body.proportion >= 85) {
            $('.q-block1-hear').css({ 'transform': 'translateX(-100%)', 'left': res.body.proportion + '%' });
            $('.q-san').css({ 'left': '100%', 'transform': 'translateX(-100%)' })
        } else if (res.body.proportion <= 15) {
            $('.q-block1-hear').css({ 'transform': 'translateX(0)', 'left': res.body.proportion + '%' });
            $('.q-san').css({ 'left': '0%', 'transform': 'translateX(0%)' });
        } else {
            $('.q-block1-hear').css({ 'transform': 'translateX(-50%)', 'left': res.body.proportion + '%' });
            $('.q-san').css({ 'left': '50%', 'transform': 'translateX(-50%)' })
        }

        //根据比列显示比例图

        $('.q-block1-stage1').css('width', res.body.resumeScoreData.zero_sixty.proportion + '%');
        $('.q-block1-stage2').css('width', res.body.resumeScoreData.sixty_eighty.proportion + '%');
        $('.q-block1-stage3').css('width', res.body.resumeScoreData.eighty_hundred.proportion + '%');

        if (res.body.resumeScoreData.zero_sixty.proportion) {
            $('.q-block1-stage1 .q-block1-stage1-text').text(res.body.resumeScoreData.zero_sixty.proportion + '%');
        }
        if (res.body.resumeScoreData.sixty_eighty.proportion) {
            $('.q-block1-stage2 .q-block1-stage2-text').text(res.body.resumeScoreData.sixty_eighty.proportion + '%');
        }
        if (res.body.resumeScoreData.eighty_hundred.proportion) {
            $('.q-block1-stage3 .q-block1-stage3-text').text(res.body.resumeScoreData.eighty_hundred.proportion + '%');
        }

        //根据数据显示工作经验图表
        var workExpTitleArr = [];
        var workExpValueArr = [];
        for (let i in res.body.workExperienceChartData) {
            switch (res.body.workExperienceChartData[i].yearRatio) {
                case 'zero_one':
                    res.body.workExperienceChartData[i].yearRatio = '1年以内'
                    break;
                case 'one_two':
                    res.body.workExperienceChartData[i].yearRatio = '1-2年'
                    break;
                case 'two_three':
                    res.body.workExperienceChartData[i].yearRatio = '2-3年'
                    break;
                case 'three_five':
                    res.body.workExperienceChartData[i].yearRatio = '3-5年'
                    break;
                case 'five_hundred':
                    res.body.workExperienceChartData[i].yearRatio = '5年以上'
                    break;
            }
            workExpTitleArr.push(res.body.workExperienceChartData[i].yearRatio);
            workExpValueArr.push(res.body.workExperienceChartData[i].proportion);
        }
        if (res.body.workingYears < 1) {
            $('.q-block1-hear1').css('left', '10%')
        } else if (res.body.workingYears >= 1 && res.body.workingYears < 2) {
            $('.q-block1-hear1').css('left', '25%')
        } else if (res.body.workingYears >= 2 && res.body.workingYears < 3) {
            $('.q-block1-hear1').css('left', '45%')
        } else if (res.body.workingYears >= 3 && res.body.workingYears < 5) {
            $('.q-block1-hear1').css('left', '65%')
        } else {
            $('.q-block1-hear1').css('left', '85%')
        }


        $('.q-block2 .q-Years span').text(res.body.workingYearsRequirements);
        var myChart = echarts.init(document.getElementById('q-experience'));
        var option = {
            itemStyle: {
                color: 'rgba(75,195,250,1)'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{c}%'　　　　//这是关键，在需要的地方加上就行了
            },

            xAxis: {
                data: workExpTitleArr,
                axisLabel: {
                    interval: 0,
                    rotate: 40
                }
            },
            yAxis: {
                show: false
            },
            series: [{
                // name: '销量',
                type: 'bar',
                data: workExpValueArr,
                normal: {
                    lable: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'rgba(75,195,250,1)',
                            fontSize: 16
                        }
                    }
                }

            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


        // 根据数据显示学历图表
        var eduTitleArr = [];
        var eduValueArr = [];
        for (let i in res.body.educationChartData) {
            switch (res.body.educationChartData[i].educationRatio) {
                case 'doctor':
                    res.body.educationChartData[i].educationRatio = '博士'
                    break;
                case 'master':
                    res.body.educationChartData[i].educationRatio = '硕士'
                    break;
                case 'regularCollege':
                    res.body.educationChartData[i].educationRatio = '本科'
                    break;
                case 'juniorCollege':
                    res.body.educationChartData[i].educationRatio = '大专'
                    break;
                case 'technicalSecondary':
                    res.body.educationChartData[i].educationRatio = '中专'
                    break;
                case 'high':
                    res.body.educationChartData[i].educationRatio = '高中'
                    break;
            }
            eduTitleArr.push(res.body.educationChartData[i].educationRatio);
            eduValueArr.push(res.body.educationChartData[i].proportion);
        }

        if (res.body.education == '博士') {
            $('.q-block1-hear2').css('left', '85%')
        } else if (res.body.education == '硕士') {
            $('.q-block1-hear2').css('left', '70%')
        } else if (res.body.education == '本科') {
            $('.q-block1-hear2').css('left', '55%')
        } else if (res.body.education == '大专') {
            $('.q-block1-hear2').css('left', '40%')
        } else if (res.body.education == '中专') {
            $('.q-block1-hear2').css('left', '27%')
        } else {
            $('.q-block1-hear2').css('left', '15%')
        }
        $('.q-block3 .q-Years span').text(res.body.educationRequirements);
        var myChart2 = echarts.init(document.getElementById('q-edu'));
        var option2 = {

            itemStyle: {
                color: 'rgba(92,230,138,1)'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{c}%'　　　　//这是关键，在需要的地方加上就行了
            },

            xAxis: {
                data: eduTitleArr,
                axisLabel: {
                    interval: 0,
                    rotate: 40
                }
            },
            yAxis: {
                show: false
            },
            series: [{
                // name: '销量',
                type: 'bar',
                data: eduValueArr
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);


        //根据数据显示年龄图表
        var ageTitleArr = [];
        var ageValueArr = [];
        for (let i in res.body.ageChartData) {
            switch (res.body.ageChartData[i].ageRatio) {
                case 'eighteen_twentyFive':
                    res.body.ageChartData[i].ageRatio = '18-25岁'
                    break;
                case 'twentyFive_thirty':
                    res.body.ageChartData[i].ageRatio = '25-30岁'
                    break;
                case 'thirty_thirtyFive':
                    res.body.ageChartData[i].ageRatio = '30-35岁'
                    break;
                case 'thirtyFive_forty':
                    res.body.ageChartData[i].ageRatio = '35-40岁'
                    break;
                case 'forty_fifty':
                    res.body.ageChartData[i].ageRatio = '40-50岁'
                    break;
                case 'fifty_hundred':
                    res.body.ageChartData[i].ageRatio = '50岁以上'
                    break;
            }
            ageTitleArr.push(res.body.ageChartData[i].ageRatio);
            ageValueArr.push(res.body.ageChartData[i].proportion);
        }

        if (res.body.age >= 18 && res.body.age < 25) {
            $('.q-block1-hear3').css('left', '15%')
        } else if (res.body.age >= 25 && res.body.age < 30) {
            $('.q-block1-hear3').css('left', '28%')
        } else if (res.body.age >= 30 && res.body.age < 35) {
            $('.q-block1-hear3').css('left', '40%')
        } else if (res.body.age >= 35 && res.body.age < 40) {
            $('.q-block1-hear3').css('left', '55%')
        } else if (res.body.age >= 40 && res.body.age < 50) {
            $('.q-block1-hear3').css('left', '70%')
        } else {
            $('.q-block1-hear3').css('left', '85%')
        }
        $('.q-block4 .q-Years span').text(res.body.ageRequirements)
        var myChart3 = echarts.init(document.getElementById('q-age'));
        var option3 = {

            itemStyle: {
                color: 'rgba(112,128,250,1)'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{c}%'　　　　//这是关键，在需要的地方加上就行了
            },

            xAxis: {
                data: ageTitleArr,
                axisLabel: {
                    interval: 0,
                    rotate: 40
                }
            },
            yAxis: {
                show: false
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: ageValueArr
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart3.setOption(option3);
    }
})
