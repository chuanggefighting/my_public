import md5 from 'js-md5'

/**
	* @function is 判断数据是否某类型
	* @param it {any} 要判断的数据
	* @param type {string} 某类型
	*
	* @function isAtom 判断数据是否原子类型 (除了对象和数组之外)
	* @function isArray 判断数据是否为数组
	* @function isEquals 判断两个对象是否相同
	*/
function is (it, type) {
	return Object.prototype.toString.call(it) === `[object ${firstLetterUpperCase(type)}]`
}
function isAtom (it) {
	return it === null || typeof it !== 'object' || it instanceof Date || it instanceof RegExp
}
function isArray(it){
	return Array.isArray(it) || is(it, 'array')
}
function isEquals (a, b) {
	// null, undefined, number, boolean, symbol, string, function
	if (typeof a !== 'object' || a === null) {
		return Object.is(a, b)
	} else if (is(a, "regExp")) {
		return is(b, "regExp") && a.source === b.source && a.flags === b.flags
	} else if (is(a, "date")) {
		return is(b, "date") && a.getTime() === b.getTime()
	} else if (isArray(a)) {
		return isArray(b) && a.length === b.length && a.every((datum, index) => datum === b[index])
	} else {
		if (!is(b, "object") || Object.keys(a).length !== Object.keys(b).length) return false
		for (const i in a) {
			if (!equals(a[i], b[i])) return false
		}
		return true
	}
}
// 字符串的首字母大写
function firstLetterUpperCase (args) {
	const [first, ...rest] = args
	return first.toUpperCase() + rest.join('')
}

// 获取 URL 参数值
function getQuery(key){
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}

/**
	* 在某个日期上增减 天数/月份/年份，负数时为减少
	* @param date {string|Date} 字符串表示的日期
	* @param Offset {number} 增加或减少的 天数/月份/年份
	* @returns {Date} 日期对象
	*/
function addDay (date, dayOffset) {
	const toDate = is(data, "data") ? date : new Date(date)
	const unit = 1000 * 60 * 60 * 24
	return new Date(toDate.getTime() + unit * dayOffset)
}
function addMonth (date, monthOffset) {
	const anchor = new Date(date)
	const month = anchor.getUTCMonth()
	// 修改新日期对象而不应修改原日期，所以前面 new Date
	anchor.setUTCMonth(month + monthOffset)
	return anchor
}
function addYear (date, yearOffset) {
	return addMonth(date, yearOffset * 12)
}

/**
* 获取两个日期的差距值
* @param a {string|Date} 日期a
* @param b {string|Date} 日期b
* @returns {number} 两个日期的差距值
*/
function compareTime (a, b) {
	const aToDate = is(a, "data") ? a : new Date(a)
	const bToDate = is(b, "data") ? b : new Date(b)
	return aToDate.getTime() - bToDate.getTime()
}
/**
* (特殊注意)投保当天生日则是false,规则中的区间不包含当天
* 比较一个月份comparisonDate(MM-DD)今年以及第二年是否在当前日期new Date(YY-MM-DD)到指定日期appointedDate(YY-MM-DD)间
* @param comparisonDate {string|Date} 日期
* @param appointedDate {string|Date} 日期
* @returns {boolean|Date}  是否满足条件 满足条件的日期
*/

export default function compareDate (comparisonDate, appointedDate) {
	comparisonDate = comparisonDate.slice(5)
	const newDate = dateFormat(new Date()).slice(0, 5)
	comparisonDate = newDate + comparisonDate
	// thisYearToday今年 nextYearToday明年 today 今天 mappointedDayd 指定生效日期
	// 适用于判断生日  是否在今天到某个区间
	const thisYearToday = comparisonDate.replace(/-/g, '')
	const nextYearToday = dateFormat(addYear(comparisonDate, 1)).replace(/-/g, '')
	const today = dateFormat(new Date()).replace(/-/g, '')
	const appointedDay = appointedDate.replace(/-/g, '')
	if (today < thisYearToday && thisYearToday < appointedDay) {
		return thisYearToday
	} else if (today < nextYearToday && nextYearToday < appointedDay) {
		return nextYearToday
	} else {
		return false
	}
}

/**
	* 转换日期格式
	* @param date {string|Date} 日期
	* @param format {string} 日期格式
	* @returns {Date} 新格式的日期
	*/
function dateFormat (date, format = 'yyyy-MM-dd') {
	if(!date) return
	date = is(date, "date") ? date : new Date(date)
	const info = {
		'y+': date.getFullYear(), //  年
		'Y+': date.getFullYear(), //  年
		'M+': date.getMonth() + 1, // 月
		'D+': date.getDate(), // 日
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		a: ['一', '二', '三', '四', '五', '六', '日'][date.getDay() - 1], // 星期
		S: date.getMilliseconds() // 毫秒
	}

	const weekFormatMap = {
		2: week => `周${week}`,
		3: week => `星期${week}`
	}

	// 星期使用一个函数单独格式化
	const formatWeek = (value, format) => {
		const len = Math.min(3, format.length)
		const formatter = weekFormatMap[len]
		return formatter ? formatter(value) : value
	}

	for (var key in info){
		const reg = new RegExp(key)
		if (reg.test(format)) {
			format = format.replace(reg, $0 => {
				const formatted = (Number.isNaN(info[key]) || info[key] === undefined) ? '??' : info[key]
				return key === 'a' ? formatWeek(info[key], key) : formatted.toString().padStart($0.length, '0')
			})
		}
	}
	return format
}

// 获取某年某月的天数
function getDays ({ year, month }) {
	const isLeapYear = year % 4 === 0 && year % 100 !== 0
	const map = {
		1: 31,
		2: isLeapYear ? 29 : 28,
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31
	}
	return map[month]
}

// 获取当前时间时间段
function getTimeSlot () {
	const timeSlot = new Date().getHours()
	if (timeSlot < 6) {
		return '凌晨'
	} else if (timeSlot < 9) {
		return '早上'
	} else if (timeSlot < 12) {
		return '上午'
	} else if (timeSlot < 14) {
		return '中午'
	} else if (timeSlot < 17) {
		return '下午'
	} else if (timeSlot < 19) {
		return '傍晚'
	} else if (timeSlot < 22) {
		return '晚上'
	} else {
		return '夜里'
	}
}

// 获取明天的日期
function getTomorrow (anchor) {
	const date = new Date()
	const now = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate()
	}
	let { year, month, day } = anchor || now
	day += 1
	if (day > getDays({ year, month })) {
		month += 1
		day = 1
	}
	if (month > 12) {
		year += 1
		month = 1
	}
	return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

/**
	* 一个深克隆函数
	* 期望的应用场景是数据克隆，而非对象克隆
	* [边际问题]：处理 Date、Function、Symbol、RegExp、prototype ?
	* 现在的克隆策略：
	* 1. Date，RegExp会重新初始化一个对象
	* 2. 对于Symbol, Function会继续保持相同的引用
	* 3. 对于原型会忽略
	* 除了对象和数组外，都归类为"原子类型" (isAtom(it) => true)
	* @param source {*} 要克隆的源数据
	* @returns {*} 克隆后的数据
	*/
function clone (source) {
	if (source === null || typeof source !== 'object') {
		return source
	} else if (source instanceof Date) {
		return new Date(source)
	} else if (source instanceof RegExp) {
		return new RegExp(source)
	}
	const target = isArray(source) ? [] : {}
	for (const key in source) {
		if (!source.hasOwnProperty(key)) { //  忽略原型
			break
		}
		target[key] = clone(source[key])
	}
	return target
}

// 根据身份证号获取信息：性别、出生日期、年龄
function getIdentity(id){
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
		var birthDate = new Date(Number(_birthDate.year), Number(_birthDate.month) - 1, Number(_birthDate.date));
		result['birthDay'] = dateFormat(birthDate)

		toAge()
				
		var _currDate = new Date();
		if(Number(_birthDate.month) - 1 < _currDate.getMonth()){
			result['age'] = _currDate.getFullYear() - birthDate.getFullYear();
		}else if(Number(_birthDate.month) - 1 == _currDate.getMonth()){
			if(Number(_birthDate.date) <= _currDate.getDate()){
				result['age'] = _currDate.getFullYear() - birthDate.getFullYear();
			}else{
				result['age'] = _currDate.getFullYear() - birthDate.getFullYear() - 1;
			}
		}else{
			result['age'] = _currDate.getFullYear() - birthDate.getFullYear() - 1;
		}
		return result;
}

// 根据生日计算周岁
function toAge (birthday) {
	const now = new Date()
	const anchor = new Date(birthday)
	let age = now.getUTCFullYear() - anchor.getUTCFullYear()
	// 现在的月份，比生日月份更大，虚岁+1
	if (now.getMonth() > anchor.getMonth()) {
		age += 1
	} else if (now.getUTCMonth() === anchor.getUTCMonth()) {
		// 月份相同时，当前天数比生日的天数更大，或者当前天数等于生日的天数时，虚岁+1
		if (now.getUTCDate() >= anchor.getUTCDate()) {
			age += 1
		}
	}
	return age - 1 // 周岁为虚岁-1
}

// 计算鉴权
export function getSign (salesmancode, thirdcode) {
  const hashStr = 'salesmancode=' + salesmancode + '&thirdcode=' + thirdcode + "&smartLinkKeyGas"
  return md5(hashStr)
}

// 随机整数
export function random(min, max){
	if(max == null){
			max = min;  
			min = 0;
	}
	return min + Math.floor(Math.random()*(max-min+1))
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
export function randomWord(randomFlag, min, max){
	var str = "",
	pos = "",
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

/*
** crypto-js 
** word：待加密或者解密的字符串
** keyStr：AES 加密需要用到的16位字符串的key
*/
import CryptoJS from 'crypto-js'
export const crypto = {
	aesKey: 'com.iescp.gate',
  AESEnc (content, key) {
    if (!key) {
      key = this.aesKey;
    }
    key = CryptoJS.enc.Utf8.parse(key) // 加密密钥
    var srcs = CryptoJS.enc.Utf8.parse(content)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: key, mode: CryptoJS.mode.CBC })
    return encrypted.toString();
  },

  AESDec: function (content, key) {
    if (!key) {
      key = this.aesKey;
    }
    key = CryptoJS.enc.Utf8.parse(key) // 解密密钥
    let decrypted = CryptoJS.AES.decrypt(content, key, { iv: key, mode: CryptoJS.mode.CBC })
    let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
    return decryptedStr;
	}
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


// 图片压缩：根据 file.size 字节数判断是否需要压缩：1MB = 1024KB，1KB = 1024字节
function compressImg (base64, w, callback, min, max) {
	var newImage = new Image()
	var quality = 0.6 // 压缩系数0-1之间
	newImage.src = base64
	newImage.setAttribute('crossOrigin', 'Anonymous')	// url为外域时需要
	var imgWidth, imgHeight
	newImage.onload = function () {
		imgWidth = this.width
		imgHeight = this.height
		var canvas = document.createElement('canvas')
		var ctx = canvas.getContext('2d')
		if (Math.max(imgWidth, imgHeight) > w) {
			if (imgWidth > imgHeight) {
				canvas.width = w
				canvas.height = w * imgHeight / imgWidth
			} else {
				canvas.height = w
				canvas.width = w * imgWidth / imgHeight
			}
		} else {
			canvas.width = imgWidth
			canvas.height = imgHeight
			quality = 0.6
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
		var base64 = canvas.toDataURL('image/jpeg', quality) // 压缩语句
		// 如想确保图片压缩到自己想要的尺寸,如要求在 min-max kb之间，请加以下语句，quality初始值根据情况自定
		while (base64.length / 1024 > max) {
			quality -= 0.01
			base64 = canvas.toDataURL('image/jpeg', quality)
		}
		// 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
		while (base64.length / 1024 < min) {
			quality += 0.001
			base64 = canvas.toDataURL('image/jpeg', quality)
		}
		callback(base64)// 必须通过回调函数返回，否则无法及时拿到该值
	}
}
 
// 页面滚动
function scrollAnimation (currentY, targetY, dom) {

	// 计算需要移动的距离
	let needScroll = targetY - currentY
	let _currentY = currentY

	// 注意 window 滚动
	dom = dom ? dom : 'window'
	
	setTimeout(() => {
			const dist = Math.ceil(needScroll / 10)
			_currentY += dist
			dom.scrollTo(_currentY, currentY)
			// 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
			if (needScroll < 10 || needScroll > -10) {
					scrollAnimation(_currentY, targetY, dom)
			} else {
					dom.scrollTo(currentY, targetY)
			}
	}, 10)
}


// =========== js 算法 ==============

// 冒泡排序
Array.prototype.bubbleSort = function() {
	for (let i = 0; i < this.length; i++) {
			for (let j = 0; j < this.length - 1 - i; j++) {
					if (this[j] > this[j + 1]) {
							let temp = this[j]
							this[j] = this[j + 1]
							this[j + 1] = temp
					}
			}
	}
}

// 选择排序
Array.prototype.selectionSort = function() {
	let indexMin
	for (let i = 0; i < this.length - 1; i++){
			indexMin = i
			for (var j = i; j < this.length; j++){ 
					if(this[indexMin] > this[j]) {
							indexMin = j
					}
			} 
			if (i !== indexMin){
					let aux = this[i]
					this[i] = this[indexMin]
					this[indexMin] = aux
			}
	}
	return this
}

// 插入排序
Array.prototype.insertionSort = function() {
	let j
	let temp
	for (let i = 1; i < this.length; i++) {
			j = i
			temp = this[i]
			while (j > 0 && this[j - 1] > temp) {
					this[j] = this[j - 1]
					j--
			} 
			this[j] = temp
			console.log(this.join(', '))
	}
	return this
}

// 归并排序
Array.prototype.mergeSort = function() {
	const merge = (left, right) => {
			const result = []
			let il = 0
			let ir = 0
			while(il < left.length && ir < right.length) {
					if(left[il] < right[ir]) {
							result.push(left[il++])
					} else {
							result.push(right[ir++])
					}
			}
			while (il < left.length) {
					result.push(left[il++])
			}
			while (ir < right.length) {
					result.push(right[ir++])
			}
			return result
	}
	const mergeSortRec = array => {
			if (array.length === 1) {
					return array
			}
			const mid = Math.floor(array.length / 2)
			const left = array.slice(0, mid)
			const right = array.slice(mid, array.length)
			return merge(mergeSortRec(left), mergeSortRec(right))
	}
	return mergeSortRec(this)
}

// 快速排序
Array.prototype.quickSort = function() {
	const partition = (array, left, right) => {
			var pivot = array[Math.floor((right + left) / 2)]
			let i = left
			let j = right
			while (i <= j) {
					while (array[i] < pivot) {
							i++
					}
					while (array[j] > pivot) {
							j--
					}
					if (i <= j) {
							let aux = array[i]
							array[i] = array[j]
							array[j] = aux
							i++
							j--
					}
			}
			return i
	}
	const quick = (array, left, right) => {
			let index
			if (array.length > 1) {
					index = partition(array, left, right)
					if (left < index - 1) {
							quick(array, left, index - 1)
					}
					if (index < right) {
							quick(array, index, right)
					}
			}
	}
	quick(this, 0, this.length - 1)
	return this
}

// 顺序搜索
Array.prototype.sequentialSearch = function(item) {
	for (let i = 0; i < this.length; i++) {
			if (item === this[i]) return i
	}
	return -1
}

// 二分搜索
Array.prototype.binarySearch = function(item) {
	this.quickSort()
	let low = 0
	let mid = null
	let element = null
	let high = this.length - 1
	while (low <= high){
			mid = Math.floor((low + high) / 2)
			element = this[mid]
			if (element < item) {
					low = mid + 1
			} else if (element > item) {
					high = mid - 1
			} else {
					return mid
			}
	}
	return -1
}

