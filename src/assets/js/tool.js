import md5 from 'js-md5'

/**
 * js 获取页面参数 
 * 
 */
export function getUrlKey(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

// 计算鉴权
export function getSign (salesmancode, thirdcode) {
  const hashStr = 'salesmancode=' + salesmancode + '&thirdcode=' + thirdcode + "&smartLinkKeyGas"
  return md5(hashStr)
}


/*
** crypto-js 
** word：待加密或者解密的字符串
** keyStr：AES 加密需要用到的16位字符串的key
*/
import CryptoJS from 'crypto-js'
export const crypto = { //加密
  encrypt(val){
    var keyStr = randomWord(true, 16, 20);
    var key  = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(val);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  },
  //解密
  decrypt(val){
    var keyStr = randomWord(true, 16, 20);
    var key  = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(val, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}


/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
function randomWord(randomFlag, min, max){
	var str = "",
	range = min,
	arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	// 随机产生
	if(randomFlag){
		range = Math.round(Math.random() * (max-min)) + min;
	}
	for(var i=0; i<range; i++){
		pos = Math.round(Math.random() * (arr.length-1));
		str += arr[pos];
	}
	return str;
}
 

export function getDevice(){
	
	var browser = {
		versions: function () {  
			var u = navigator.userAgent, app = navigator.appVersion;  
			return {//移动终端浏览器版本信息   
				trident: u.indexOf('Trident') > -1, //IE内核  
				presto: u.indexOf('Presto') > -1, //opera内核  
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端  
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
				iPad: u.indexOf('iPad') > -1, //是否iPad  
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
			};  
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()  
	} 

	let device
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {  
		device = "IOS"
	}  
	else if (browser.versions.android) {  
		device = "android"  
	} else {  
		device = "other" 
	}
	return device
}

// 随机字符串
function randomString (len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890'
  var maxPos = $chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export function getHeaders () {
  const clientId = 'comma-api' // 应用ID
  const clientSecret = 'db0127ad4ab899ef13140b21b64958a1' // 应用ID对应的secret
  const deviceId = randomString(32) // 设备Id
  const nonce = randomString(32) // 随机字符串
  const sign = getSign(clientId, deviceId, nonce, clientSecret).toUpperCase() // 签名
  const tokenAssign = sessionStorage.userToken // 签名

  return {
    'clientId': clientId,
    'clientSecret': clientSecret, // 应用秘钥
    'deviceId': deviceId, // 设备Id
    'nonce': nonce, // 随机字符串
    'sign': sign, // 签名
    'token': tokenAssign // 访问令牌
  }
}


// 日期格式
export function DateFormat (date, fmt = 'yyyy-MM-dd') {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    // 'h+': date.getHours(), // 小时
    // 'm+': date.getMinutes(), // 分
    // 's+': date.getSeconds(), // 秒
    // 'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    // 'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}


// 获取几 天/年 后的日期
export function getDateLater(type, num){
	let d = new Date();
	switch(type){
		case "day":
			d.setDate(d.getDate() + num)
			break
		case "year":
			d.setDate(d.getDate() + 1)
			d.setFullYear(d.getFullYear() + num)
			break
		default:
			break
	}
	return DateFormat(d)
}

// 根据身份证号获取信息：性别、出生日期、年龄
export function getIdentity(id){
		var result = {};
		var _birthDate;
		switch(id.length){
				case 18:
						_birthDate = {
								year : id.substr(6, 4), 
								month : id.substr(10, 2), 
								date : id.substr(12, 2)
						};
						//第 17 位
						result['sex'] = parseInt(id.substr(16, 1))%2==0 ? "106001":"106002"; 
						break;
				case 15:
						_birthDate = {
								year : "19" + id.substr(6, 2), 
								month : id.substr(8, 2), 
								date : id.substr(10, 2)
						};
						// 第 15 位
						result['sex'] = parseInt(id.substr(14, 1))%2==0 ? "106001":"106002";
						break;
				default:
						break;
		}
		var birthDate = new Date(Number(_birthDate.year),Number(_birthDate.month) - 1,Number(_birthDate.date));
    result['birthDay'] = DateFormat(birthDate)
        
		var _currDate = new Date();
		if(Number(_birthDate.month) - 1 < _currDate.getMonth()){
			result['age'] = _currDate.getFullYear() - birthDate.getFullYear();
		}else if(Number(_birthDate.month) - 1 == _currDate.getMonth()){
			if(Number(_birthDate.date)<=_currDate.getDate()){
				result['age'] = _currDate.getFullYear() - birthDate.getFullYear();
			}else{
				result['age'] = _currDate.getFullYear() - birthDate.getFullYear() - 1;
			}
		}else{
			result['age'] = _currDate.getFullYear() - birthDate.getFullYear() - 1;
		}
		return result;
}




 
