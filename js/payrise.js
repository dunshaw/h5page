// 如果看不懂js写了什么，也不用管，固定写法，写进去就可以用了
window.onload = function(){
  /* 第一个参数是你想让 1rem 等于多少像素，第二个参数是设计稿的宽度 */
  getRem(50,750)
};
window.onresize = function(){
  getRem(50,750)
};
function getRem(prem,pwidth){
  var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
  document.documentElement.style.fontSize = prem/pwidth*oWidth + "px";
}

let aAndI = detect();
if (aAndI == 'android') {
  console.log('android')
  if(isWeixin()){
    $('.wxmodel').css('display','block');
  }
}

var myDate = new Date();
var nowHour = myDate.getHours(); //获取当前小时数(0-23)
console.log(nowHour)
//判断当前设备是安卓还是ios
function detect(){
   var equipmentType = "";
   var agent = navigator.userAgent.toLowerCase();
   var android = agent.indexOf("android");
   var iphone = agent.indexOf("iphone");
   var ipad = agent.indexOf("ipad");
   if(android != -1){
       equipmentType = "android";
   }
   if(iphone != -1 || ipad != -1){
       equipmentType = "ios";
   }
   return equipmentType;
}


$('.btnBox').click(function () {
  let aAndI = detect()
  console.log(aAndI)
  if(aAndI =='ios'){
    window.location.href='https://apps.apple.com/cn/app/id1485685440'
  }else{
    console.log(nowHour)
    if(7<parseInt(nowHour) && parseInt(nowHour)<21){
      let src = 'https://download.jobpoolhr.com/jobpoolhr-luodiye.apk';
      let form = document.createElement('form');
      form.action = src;
      document.getElementsByTagName('body')[0].appendChild(form);
      form.submit();
    }else{
      window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.magic.baohangperson&channel=0002160650432d595942&fromcase=60001')
    }
  }
})

function isWeixin () {
  if (navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1){
    console.log("微信内置浏览器");
    return true
  }
  return false 
}




