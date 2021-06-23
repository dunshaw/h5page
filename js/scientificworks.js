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
var ua = navigator.userAgent.toLowerCase();
var _source = 0;
let aAndI = detect();
if(ua.match(/MicroMessenger/i)=="micromessenger") {
    //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
    wx.miniProgram.getEnv((res)=>{
       if (res.miniprogram) {   // 小程序
           _source = 1
       }
    })
}else{
    console.log('不在微信里');
    if (aAndI == 'android') {    // 安卓
	 	_source = 2
	}else{              // ios
		_source = 3
	}
}




// 跳转职位
function gotojobDetails(id){
	console.log('job')
	if(_source == 1){
		wechatJump(id,'job')
	}else if(_source == 2){
		AndroidConsole(id,'job')
	}else if(_source == 3){
		AppConsole(id,'job')
	}else{
		return false
	}
}

// 跳转公司
function gotocompDetails(id){
	console.log('comp')
	if(_source == 1){
		wechatJump(id,'company')
	}else if(_source == 2){
		AndroidConsole(id,'company')
	}else if(_source == 3){
		AppConsole(id,'company')
	}else{
		return false
	}
}


function AppConsole(id,type){
	let params = {id,type}
	window.webkit.messageHandlers.jobCompanyDetail.postMessage(params)
}

function AndroidConsole(id,type){
	let params = JSON.stringify({id,type})
	window.test.callbackAndroid(params)
}

function wechatJump(id,type){
	let url;
	if(type == 'job'){
		url=`/packageA/pages/recruitDetail/recruitDetail?id=${id}`
	}else{
		url=`/pages/companyInfo/companyInfo?id=${id}`
	}
	wx.miniProgram.navigateTo({
        url:url,
    });
}