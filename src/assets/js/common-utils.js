
/**非业务处理,公共js处理*/
//////////////////////////////////////////////////////////////////////////////
//功能说明：3种trim实现
//////////////////////////////////////////////////////////////////////////////
String.prototype.trim = function() { 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
}  
String.prototype.ltrim = function() { 
	return this.replace(/(^\s*)/g, ""); 
}  
String.prototype.rtrim = function() { 
	return this.replace(/(\s*$)/g, ""); 
}
//////////////////////////////////////////////////////////////////////////////
//功能说明： 替换目标字符串中所有的某个指定字符
//参数定义： s1 = 将要被替换的目标字符 (原字符)
//          s2 = 替换字符（新字符）
//@author: chenfang
//////////////////////////////////////////////////////////////////////////////
String.prototype.replaceAll = function(s1,s2){ 
	return this.replace(new RegExp(s1,"gm"),s2);
}

/**
 * 用变量值替换字符串的占位符
 * @param params ｛Array|Object} 占位符对应的值
 * @returns {String} 替换后的字符串
 * @example "I love :1 ,my name is ':0' ".format(["jinceon", "javascript"]);
 * @example "I love :you ,my name is ':name' ".format({name: "jinceon", you: "javascript"});
 */
String.prototype.format = function(params) {
    if (!params) {
        params = {};
    }
    return this.replace(/:(\w+)/g, function(match, p1) {
        return params[p1];
    });
};

//扩展String类，将字符转换为数字
String.prototype.toNumber = function() {
	if(this==""){
		return 0;
	}
	return Number(this); 
}
//四舍五入,参数可以是保留小数的位数,返回数字或者空字符--added by William 2012-02-10
String.prototype.toFixed = function (fractionDigits){
	if(this){
		var param = this+"";
		if(param==""){
			return "";
		}
		return Number(param).toFixed(fractionDigits);
	}else{
		return "";
	}
}
//////////////////////////////////////////////////////////////////////////////
//功能说明：获取给定字符串的长度,包括回车换行符
//////////////////////////////////////////////////////////////////////////////
String.prototype.getLengthrn = function() {  
	var length = this.length;
	if(this.indexOf("\n") != -1){
		var nrl = this.match(new RegExp("\n","g")).length;
		length +=  nrl;
	}
	return length;   
}
//////////////////////////////////////////////////////////////////////////////
//功能说明：截取字符串，长度去掉回车换行
//////////////////////////////////////////////////////////////////////////////
String.prototype.substrrn = function(length) { 
	var nrl = 0;
	if(this.indexOf("\n") != -1){
		nrl = this.match(new RegExp("\n","g")).length;
	}
	return this.substr(0, length-nrl);
}
//////////////////////////////////////////////////////////////////////////////
//功能说明： 定义JS中用于高效拼接字符串的StringBuiler
//////////////////////////////////////////////////////////////////////////////
function StringBuilder(){
	this.__string__ = new Array();
}
//////////////////////////////////////////////////////////////////////////////
//功能说明： 定义StringBuiler的append方法
//////////////////////////////////////////////////////////////////////////////
StringBuilder.prototype.append = function(str){
	this.__string__.push(str);
};
//////////////////////////////////////////////////////////////////////////////
//功能说明： 定义StringBuiler的toString方法
//////////////////////////////////////////////////////////////////////////////
StringBuilder.prototype.toString = function(){
	return this.__string__.join("");
};
//////////////////////////////////////////////////////////////////////////////
//功能说明：字段截取，返回截取的从0个到n个的字符串，中文为2个字节长度，其他为1个字节
//参数定义：n：需要截取最大长度
//////////////////////////////////////////////////////////////////////////////
String.prototype.sub = function(n)
{    
	var r = /[^\x00-\xff]/g;    
	if(this.replace(r, "mm").length <= n) return this;     
	var m = Math.floor(n/2);    
	for(var i=m; i<this.length; i++) {    
	if(this.substr(0, i).replace(r, "mm").length>=n) {    
	   return this.substr(0, i) ; }    
	} 
	return this;   
};
//////////////////////////////////////////////////////////////////////////////
//功能说明：特殊字符转义 add by wlsun date 2018-5-25 02:21:07 
//参数定义：string 转义字符
//////////////////////////////////////////////////////////////////////////////
String.prototype.escapeHtml = function(string) 
{
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}
//////////////////////////////////////////////////////////////////////////////
//功能说明：后台拿到前台的DATETIME需要转换，提供日期date转换方法
//参数定义：datetime:需要转换的datetime/ new Date(datetime).format("yyyy-MM-dd");
//////////////////////////////////////////////////////////////////////////////
Date.prototype.format = function(format)
{
    var o =
    {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), // cond
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format))
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};

// add by mdpenga 2018-2-7 form表单序列化方法 
$.fn.serializeObject = function() 
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
//add by wlsun date 2018-5-23 22:25:44 数组搜索
Array.prototype.arrIndexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
//add by wlsun date 2018-5-23 22:25:44 数组指定值删除
Array.prototype.remove = function(val) {
    var index = this.arrIndexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

export const issCommonUtils = {
	//判断参数是否为空
	isNotBlank:function(param) {
		if(param==null|| typeof param=='undefined' || param=='null'){
			return false;
		}
		//数值类型的先转换成字符串
		param+="";
		if(param.trim()==""){
			return false;
		}
		return true;
	},
    isFunction:function(param){
      return  Object.prototype.toString.apply(param) === '[object Function]';
    },
	//判断参数是不是数字
	isNumber:function(param){
		if(!param||param==""){
			return false;
		}
		return !isNaN(param);
	},
	//////////////////////////////////////////////////////////////////////////////
	//功能说明： 判断给定的字是否为中文
	//参数定义： word unicode字符
	//////////////////////////////////////////////////////////////////////////////
	isChinese:function(word) {
		var lst = /[\u4e00-\u9fa5]/;
		return !lst.test(word);
	},
	//////////////////////////////////////////////////////////////////////////////
	//功能说明： 判断给定的值是否为int型
	//参数定义： word unicode字符
	//////////////////////////////////////////////////////////////////////////////
	
	isInt:function(intValue){
		var intnumber = /^\d+$/;
		if(intnumber.test(intValue)){
			return true;
		}else{
			return false;
		}
	},
	//功能说明：判定给的值是否为字母，格式正确返回true,否则返回false
	isLetter:function(param){
		var str = /[a-zA-z]/;
		if(str.test(param)){
			return true;
		}else{
			return false;
		}
	},
	//功能说明：判定给的值是否只能包含数字、字母、汉字，空格，*，减号，下划线 以及#，格式正确返回true,否则返回false
	isCheckSymbol:function(param){
		var str = /^[\s\(\)\（\）\、a-zA-z\d\u4e00-\u9fa5#*_-]+$/;
		if(str.test(param)){
			return true;
		}else{
			return false;
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//功能说明： 判断给定的值是否为Email,格式正确返回true,否则返回false
	//参数定义：给定的字符串
	//////////////////////////////////////////////////////////////////////////////
	validateEmail:function(val){
		//var regExp = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
		//var regExp = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$");
		var regExp = new RegExp("^[a-zA-Z0-9_.-]+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
		if(regExp.test(val)){
			return true;
		}
		return false;
	},
	//////////////////////////////////////////////////////////////////////////////
	//功能说明： 判断给定的值是否为手机号码,目前支持号码段为13，14，15，16，17，18，19 格式正确返回true,否则返回false
	//参数定义：给定的字符串
	//////////////////////////////////////////////////////////////////////////////
	validateCellPhone:function(val){
		var regExp = /^1[3|4|5|6|7|8|9]\d{9}$/;
		if(regExp.test(val)){
			return true;
		}
		return false;
	},
	//////////////////////////////////////////////////////////////////////////////
	//功能说明： 判断给定的值是否为纯数字，格式正确返回true,否则返回false
	//参数定义：给定的字符串
	//////////////////////////////////////////////////////////////////////////////
	validateCardNumbers:function(val){
		var regExp = /^[0-9]*$/;
		if(regExp.test(val)){
			return true;
		}
		return false;
	},
	validateCellPhoneCopThrid:function(val){
		var regExp = /([\d])\1{5}/;
		if(regExp.test(val)){
			return true;
		}
		return false;
	},
	//////////////////////////////////////////////////
	//功能说明：密码验证
	//参数定义：给定字符串
	checkPassword:function(password){
		//只能输入6-20个以字母开头、数字的字串
//		var regExp = new RegExp("[a-zA-Z0-9]{6,18}");
		var regExp = new RegExp("^[a-zA-Z0-9+~!@#$%&()_]{6,20}$");//支持数字，字母，特殊字符（英文）
		if(regExp.test(password)){
			return true;
		}
		return false;
		
	},
	/**
	 * @category 获取dom对象
	 * @param id1,id2,id3......
	 **/
	$O:function() {
	  var elements = new Array();
	  for (var i = 0; i < arguments.length; i++) {
	    var element = arguments[i];
	    if (typeof element == 'string')
	      element = document.getElementById(element);
	    if (arguments.length == 1)
	      return element;
	    elements.push(element);
	  }
	  return elements;
	},
	/**
	 * 日期合法性验证：判断dataStr是否符合formatStr指定的日期格式
	 * 示例：
	 * (1)alert(Date.isValiDate('2008-02-29','yyyy-MM-dd'));//true
	 * (2)alert(Date.isValiDate('aaaa-58-29','yyyy-MM-dd'));//false
	 * @param dateStr：必选，日期字符串
	 * @param formatStr：可选，格式字符串，可选格式有：(1)yyyy-MM-dd(默认格式)或YYYY-MM-DD (2)yyyy/MM/dd或YYYY/MM/DD (3)MM-dd-yyyy或MM-DD-YYYY (4)MM/dd/yyyy或MM/DD/YYYY
	 */
	dateIsValiDate:function(dateStr, formatStr)
	{
	    if(!dateStr){
	        return false;
	    }
	    if(!formatStr){
	        formatStr = "yyyy-MM-dd";//默认格式：yyyy-MM-dd
	    }
	    if(dateStr.length!=formatStr.length){
	        return false;
	    }else{
	        if(formatStr=="yyyy-MM-dd"||formatStr=="YYYY-MM-DD"){
	            var r1=/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
	        	return r1.test(dateStr);
	        }else if(formatStr=="yyyy/MM/dd"||formatStr=="YYYY/MM/DD"){
	            var r2=/((^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(10|12|0?[13578])(\/)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(11|0?[469])(\/)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(0?2)(\/)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(\/)(29)$)|(^([3579][26]00)(\/)(0?2)(\/)(29)$)|(^([1][89][0][48])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][0][48])(\/)(0?2)(\/)(29)$)|(^([1][89][2468][048])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][2468][048])(\/)(0?2)(\/)(29)$)|(^([1][89][13579][26])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][13579][26])(\/)(0?2)(\/)(29)$))/;
	        	return r2.test(dateStr);
	        }else{
	            return false;
	        }
	    }
	    return false;
	},
	
	/**
	 * 日期和时间合法性验证
	 * 格式：yyyy-MM-dd hh:mm:ss
	 * @param dateTimeStr 必选，日期字符串
	 */
	dateIsValiDateTime:function(dateTimeStr)
	{
	    var dateTimeReg=/^(?:(?:(?:(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-)(?:0?2\1(?:29)))|(?:(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-)(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[1,3-9]|1[0-2])\2(29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1\d|2[0-8])))))\s(?:([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d)$/;
		return dateTimeReg.test(dateTimeStr);
	},
	sharedMethod:function(obj,value){
		var flag=true;
		if($.trim(value)!=''){
			if(value.length<=10){
				if(!dateIsValiDate(value,""))
				{
					$.msg.alert("系统提示","请重新填写正确日期!</br>默认格式如下: yyyy-MM-dd",function(){
						obj.focus();
					});
					flag=false;
				}
			}else{
				if(!dateIsValiDateTime(value))
				{
					$.msg.alert("系统提示","请重新填写正确日期!</br>默认格式如下: yyyy-MM-dd hh:mm:ss",function(){
						obj.focus();
					});
					flag=false;
				}
			}
		}
		return flag;
	},	
	date2Day:function(newDate, oldDate){
		if(newDate == "" || oldDate == "") return 0;
		var nd = newDate.split("-"), n_year = nd[0], n_month = nd[1], n_day = nd[2].split(" ")[0];
		var od = oldDate.split("-"),o_year = od[0], o_month = od[1], o_day = od[2].split(" ")[0];
		var re_day = (new Date(n_year,n_month,n_day).getTime() - new Date(o_year,o_month,o_day).getTime()) / (1 * 24 * 60 * 60 * 1000);
		return re_day;
	},
	validationDateDiff:function(beginDateId, endDateId){
		if(!sharedMethod($O(beginDateId), $O(beginDateId).value)) return false;
		if(!sharedMethod($O(endDateId), $O(endDateId).value)) return false;
		var beginDateVal = $("#" + beginDateId).attr("value");
		var endDateVal = $("#" + endDateId).attr("value");
		if(isNotBlank(beginDateVal) && isNotBlank(endDateVal)){
			var diffDay = date2Day(endDateVal, beginDateVal) / 365;
			if(diffDay < 0){
				$.msg.alert("系统提示","查询起期不能大于查询止期!");
				return false;
			}
		}
		return true;
	},
	//////////////////////////////////////////////////////////////////////////////
	//功能说明： 判断给定的节点对象是否为空
	//参数定义： word unicode字符
	//////////////////////////////////////////////////////////////////////////////
	isNull:function(field){
		var Text=""+field.value;
		if(Text.length)
		{
			for(var i=0;i<Text.length;i++)
			if(Text.charAt(i)!=" ")
			break;
			if(i>=Text.length){
			    return true;
			} else { 
			    return false;
			}
		}else
			return true;
	},
	
	//////////////////////////////////////////////////////////////////////////////
	//功能说明：如果字符串大于num个字符截取字符串前num个字符，后面省略显示
	//参数定义：str:需要省略的字符串
	//////////////////////////////////////////////////////////////////////////////
	shortDesc:function(str,num){
		if(str==null || str=='')
			return str;
		if(str.match(/[^\x00-\xff]/ig)){
			var cArr = str.match(/[^\x00-\xff]/ig);
			if((str.length+cArr.length)<=num){
				return str;
			}else{
				return str.sub(num)+"...";
			}
		}else{
			if(str.length<=num){
				return str;
			}else{
				return str.sub(num)+"...";
			}
		}
	},
	//////////////////////////////////////////////////////////////////////////////
	//功能说明： 验证字符串长度，如果验证通过返回true，未通过返回false
	//参数定义：str:需要验证的字符串，length:验证不超过的长度
	//////////////////////////////////////////////////////////////////////////////
	lengthValidate:function(str,length){
		str.length<=length ? flag=true : flag=false;
		return flag;
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：校验日期
	//Matches invalid dates such as February 31st
	/////////////////////////////////////////////////////////////////////
	validateYMDDate:function(d){
		return /(19|20)[0-9]{2}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])/.test(d);
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：等比例缩放图片
	//img 图片Id
	//width,height 限定的最大高度和宽度
	/////////////////////////////////////////////////////////////////////
	setPopimage:function(img,width,height){
		var image = document.getElementById(img);
		if (image.width > image.height){
		   if(image.width>width){
		    image.width=width;
		    image.height=width/image.width*image.height;
		   }
		}else{
		   if(image.height>height){
		    image.height=height;
		    image.width=height/image.height*image.width;
		   }
		}
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：判断当前浏览器类型
	/////////////////////////////////////////////////////////////////////
	getClientOs:function(){
			var Sys = {};
			var ua = navigator.userAgent.toLowerCase();
			var s;
			var nowClient="";
			(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
			(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
			(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
			(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
			if (Sys.ie) nowClient='IE' + Sys.ie;
			if (Sys.firefox) nowClient='Firefox';
			if (Sys.chrome) nowClient='Chrome';
			if (Sys.opera) nowClient='Opera';
			if (Sys.safari) nowClient='Safari';
			return nowClient;
	},
	
	//////////////////////////////////////////////////////////////////////
	///功能说明：格式化数据货币，以千分符分割，例如1,000,000,000
	///参数定义：number 需要格式化的金额字符串,d 可选参数，指定精度
	///@see String.propotype.toFixed
	/////////////////////////////////////////////////////////////////////	
	outputDollars:function(number,d){
		//0是false
		if(!number&&Number(number)!=0){
			return "";
		}
		number = number+"";
		if(number==""){
			return "";
		}
		if(d&&d>0){
			number = number.toFixed(d);
		}
		var flag = "";
		if(number.indexOf("-")!=-1){
			flag = "-";
			number = number.replace("-","");
		}
		var numArr = number.split(".");
		number = numArr[0];
		if (number.length<= 3)
			return flag + (number == '' ? '0' : number+'.'+numArr[1]);
		else{
			 var mod = number.length%3;
			 var output = (mod == 0 ? '' : (number.substring(0,mod)));
			 for (i=0 ; i< Math.floor(number.length/3) ; i++)
			 {
			   if ((mod ==0) && (i ==0))
			   output+= number.substring(mod+3*i,mod+3*i+3);
			   else
			   output+= ',' + number.substring(mod+3*i,mod+3*i+3);
			 }
			 return (flag + output+'.'+numArr[1]);
		}
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：年龄校验
	///参数定义：age 待校验年龄,minAge 最小年龄,maxAge 最大年龄
	/////////////////////////////////////////////////////////////////////	
	ageValid:function(age,minAge,maxAge){
		return age>=minAge&&age<=maxAge ? true : false;
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：计算年龄
	///参数定义：birthDate 出身日期,格式是yyyy年mm月dd的字符串,或者是Date类型
	/////////////////////////////////////////////////////////////////////	
	calcAge:function(date, type){
		var d1 = new Date(Date.parse(date.replace('年','-').replace('月','-').replace('日','')));//2012-01-01
		var d2 = null;
		//2013/11/19 chenfang start
		//当服务器时间currentSysDate为空时，则取前台浏览器的当前时间
		if(issCommonUtils.isNotBlank(currentSysDate)){
			d2= new Date(Date.parse(currentSysDate.substring(0,10).replace(/-/g, "/")));//currentSysDate：获取后台传递过来的系统时间，定义在vhl_quick_app.jsp页面中
		}else{
			d2 = new Date();
		}
		//var d2 = new Date();
		//2013/11/19 chenfang end
		var year1 = d1.getFullYear();
		var year2 = d2.getFullYear();
		var month1 = d1.getMonth();
		var month2 = d2.getMonth();
		var diff = (d2.getTime() - d1.getTime()) / (24 * 60 * 60 * 1000);
		var age = d2.getFullYear() - d1.getFullYear() - ((d2.getMonth() < d1.getMonth() || d2.getMonth() == d1.getMonth() && d2.getDate() < d1.getDate()) ? 1 : 0);
		var result = ((diff / 365) * 100).toString().split(".");
		if(type == "0"){//驾龄计算
			return parseInt(result[0] / 100);
		}else{
			return age;
		}
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：计算天数
	///参数定义：birthDate 出身日期,格式是yyyy年mm月dd的字符串,或者是Date类型
	/////////////////////////////////////////////////////////////////////	
	calcDate:function(date){
		var infoDate = Date.parse(date.replace('年','-').replace('月','-').replace('日',''));
		return parseInt((Date.parse(currDate.replace(/-/g,'/'))-infoDate)/(1000*3600*24));
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：验证身份证
	///参数定义：value 身份证号码
	/////////////////////////////////////////////////////////////////////
	validateCard:function(value) {
		/*IPARTNER-2033 
		 * 将身份证校验改成跟核心一样调用存储过程校验，屏蔽之前的方法
		 * 修改人：dhtan
		 * 时间：2013年4月19日15:03:07
		 * 
	 	*/
	 	value=value.trim();
	 	var Y,JYM;  
	    var S,M;  
	    var idcard_array = new Array();  
	    idcard_array = value.split("");
	 	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
		if(value!=""&&value.length!=15&&value.length!=18){
			return false;
		}
	 	if(value!=""&&area[parseInt(value.substr(0,2))]==null){
	 		return false;
	 	}		 	
	 	switch(value.length){
	 	//15位身份证号校验
	 	case 15: 
	 		if ((parseInt(value.substr(6,2))+1900) % 400 == 0 || ((parseInt(value.substr(6,2))+1900) % 100 != 0 && (parseInt(value.substr(6,2))+1900) % 4 == 0 )){ 
	 			ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; 
	 		} else { 
	 			ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; 
	 		}
	 		if(!ereg.test(value)){
	 			return false;	
	 		}
	 	break;
	 	//18位身份证号校验
	 	case 18: 
	 		if ( parseInt(value.substr(6,4)) % 400 == 0 || (parseInt(value.substr(6,4)) % 100 != 0 && parseInt(value.substr(6,4))%4 == 0 )){ 
	 			//闰年出生日期的合法性正则表达式 
	 			ereg=/^[1-9][0-9]{5}(19|([2-9][0-9]))[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9xX]{1}$/;
	 		} else { 
	 			//平年出生日期的合法性正则表达式 
	 			ereg=/^[1-9][0-9]{5}(19|([2-9][0-9]))[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9xX]{1}$/;
	 		}
	 		if(ereg.test(value)){//测试出生日期的合法性  
	 		     //计算校验位  
	 		     S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7  
	 		     + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9  
	 		     + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10  
	 		     + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5  
	 		     + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8  
	 		     + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4  
	 		     + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2  
	 		     + parseInt(idcard_array[7]) * 1   
	 		     + parseInt(idcard_array[8]) * 6  
	 		     + parseInt(idcard_array[9]) * 3 ;  
	 		     Y = S % 11;  
	 		     M = "F";  
	 		     JYM = "10X98765432";  
	 		     M = JYM.substr(Y,1);/*判断校验位*/
	 		    if(M == idcard_array[17].toUpperCase()){  
	 		       return true; /*检测ID的校验位false;*/  
	 		    }  
	 		    else {  
	 		       return false;  
	 		    }
	 		}
	 		else {
	 		     return false;  
	 		}  
	 	break;
	 	default:  
	 	     return true;
	 	}
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：外部调用通用验证身份证
	///参数定义：O对象；n提示信息
	/////////////////////////////////////////////////////////////////////
	checkIDCard:function(o,n){
		if(o.val()==""){
			return true;
		}
		var cardNo = o.val();
		var boolFlag = issCommonUtils.validateCard(cardNo);
		if(!boolFlag){
			$.msg.alert("系统提示",n+"输入不合法！",function(){
			o.focus();
			});
		}
		return boolFlag;
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：比较两个日期 大小
	///参数定义：startDate endDate 以 yyyy-MM-dd格式
	///返回结果：1：大于 ，0：等于 ，-1：小于
	/////////////////////////////////////////////////////////////////////
	dateCompare:function (startdate,enddate){    
		var arr=startdate.split("-");     
		var starttime=new Date(arr[0],arr[1]-1,arr[2]);     
		var starttimes=starttime.getTime();    
		var arrs=enddate.split("-");     
		var endtime=new Date(arrs[0],arrs[1]-1,arrs[2]);     
		var endtimes=endtime.getTime();    
		if(starttimes>endtimes){    
			return 1;    
		}else if(starttimes == endtimes) {
			return 0;   
		}else{
			return -1;  
		}
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：比较两个日期相差天数
	///参数定义：startDate endDate 以 yyyy-MM-dd格式
	/////////////////////////////////////////////////////////////////////
	dateDiff:function(startDate,endDate){
		times = startDate.split("-");
		date1 = new Date(times[0],times[1]-1,times[2]);
		times = endDate.split("-");
		date2 = new Date(times[0],times[1]-1,times[2]);
		var diffValue = date2.getTime() - date1.getTime();
		return parseInt(diffValue/86400000);    
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：根据身份证号获取出生日期、性别、年龄
	///参数定义：params ,如{id:"420625********664X",format:"yyyy-MM-dd"}
	///参见：format()方法
	///返回：返回对象result,如result = {birthDay:"1987-02-09",sex:"F",age:25}
	/////////////////////////////////////////////////////////////////////
	dateDiff:function(params){
		params.id=$.trim(params.id);
		var result = {};
		var _birthDate;
		switch(params.id.length){
		case 18: _birthDate = {year : params.id.substr(6, 4),
				month : params.id.substr(10, 2),
				date : params.id.substr(12, 2)};
			result['sex'] = parseInt(params.id.substr(16, 1))%2==0 ? "F":"M";//第17位
			break;
		case 15:
			_birthDate = {year : "19" + params.id.substr(6, 2),
					month : params.id.substr(8, 2),
					date : params.id.substr(10, 2)};
			result['sex'] = parseInt(params.id.substr(14, 1))%2==0 ? "F":"M";//第15位
			break;
		}
		var birthDate = new Date(Number(_birthDate.year),Number(_birthDate.month) - 1,Number(_birthDate.date));
		result['birthDay'] = birthDate.format(params.format);
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
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：根据身份证号获取性别
	///参数定义：{id:"420625********664X"}
	///返回：字符串 M-表示男 ,F-表示女
	/////////////////////////////////////////////////////////////////////
	getSexById:function(id){
		id=$.trim(id);
		var sex = "";
		switch(id.length){
			case 18:
				sex = parseInt(id.substr(16, 1))%2==0 ? "F":"M";//第17位  奇数为男，偶数为女
				break;
			case 15:
				sex = parseInt(id.substr(14, 1))%2==0 ? "F":"M";//第15位  奇数为男，偶数为女
				break;
		}
		return sex;
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：根据身份证号获取出生日期
	///参数定义：{id:"420625********664X"}
	///返回：出生日期 格式yyyy-MM-dd
	/////////////////////////////////////////////////////////////////////
	getBirthDayById:function(id){
		id=$.trim(id);
		var _birthDate;
		switch(id.length){
			case 18:
				_birthDate = {year : id.substr(6, 4), month : id.substr(10, 2), date : id.substr(12, 2)};
				break;
			case 15:
				_birthDate = {year : "19" + id.substr(6, 2), month : id.substr(8, 2), date : id.substr(10, 2)};
				break;
		}
		var birthDate = new Date(Number(_birthDate.year),Number(_birthDate.month) - 1,Number(_birthDate.date));
		return birthDate.format("yyyy-MM-dd");
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：校验传入日期是否与身份证件号码一致
	///参数定义：tBirthday-出生日期
	///			id -证件号码
	///返回：是否相同 true一致 ，false不一致
	/////////////////////////////////////////////////////////////////////
	birthDayCompare:function(tBirthday,id){
		var birthDay = issCommonUtils.getBirthDayById(id); //根据身份号码获取出生日期
		var arr = tBirthday.split(' ');
		var year = arr[0].split('-')[0];
		var month = arr[0].split('-')[1];
		var day = arr[0].split('-')[2];
		tBirthday =  year+month+day;
		
		var arr1 = birthDay.split(' ');
		var year1 = arr1[0].split('-')[0];
		var month1 = arr1[0].split('-')[1];
		var day1 = arr1[0].split('-')[2];
		birthDay =  year1+month1+day1;
		
		if(birthDay != tBirthday){
			return false;
		}
		return true;
	},
	
	//////////////////////////////////////////////////////////////////////
	///功能说明：根据日期字符串转换为Date类型
	///参数定义：date
	///返回：Date
	/////////////////////////////////////////////////////////////////////
	resolveCharacter2Date:function(date){
		var arr = date.split("-");
		return new Date(Number(arr[0]),Number(arr[1]) - 1,Number(arr[2]));
	},
	//////////////////////////////////////////////////////////////////////
	///功能说明：html转义，增加从数据库中取数据，数据里有\n等回车转义符不能识别
	/////////////////////////////////////////////////////////////////////
	htmlEncode:function(s) {
		if(s != null){
		    s = s.replace(new RegExp("&","g"), "&amp;");
		    s = s.replace(new RegExp("<","g"), "&lt;");
		    s = s.replace(new RegExp(">","g"), "&gt;");
		    s = s.replace(new RegExp("\"","g"), "&quot;");
		    s = s.replace(new RegExp("\'","g"), "&#34;");
		    s = s.replace(new RegExp(" ","g"), "&nbsp;");
		    s = s.replace(new RegExp("\n","g"), "<br/>");
		}
	    return s;
	},
	isEmpty:function(text){
//		if(text==null || typeof text=='undefined' || text.toString().trim()==''){
		//modify by yangtang 2014-10-08 
		if(text==null || typeof text=='undefined' || (typeof text!="object" && text.toString().trim()=='')){
			return true;
			
		}
		return false;
	},

	/**
	* 获取某个值的长度，英文的长度为1，中文为2。
	* add by pxg 2012.10.19 
	*/
	getLength:function(value) {
		var _tmp = value;
		var _length = 0;
		for(var i=0;i<_tmp.length;i++) {
			if(_tmp.charCodeAt(i) >255) {
				_length = _length+2;
			} else {
				_length++;
			}
		}
		return _length;
	},
	
	/**
	 * 银行卡号校验,符合为true，不符合false
	 */
	checkCardNum:function(CCardNo){
		var valFlag = false;
		var valMsg = "";
		var reg = /^(\d+)$/;//用于验证一般的银行卡号的正则表达式
		var reg1 = /^\d{2}(-)+\d{12,23}$/;//用于验证农行企业客户的卡号是否正确的正则表达式
		var i = CCardNo.indexOf('-');//用于判断是否为农行企业客户卡号
		if(i>=0){
	        if(!(reg1.test(CCardNo))){
	           valMsg = '请您输入合法的农行企业卡号,格式：02-1500001040005114!';
	    	   valFlag = true;
	        }
		}else{
		   if(!(reg.test(CCardNo))){
			   valMsg = '请您输入合法的银行账号,账号由数字组成,格式：800108373718092001!';
	    	   valFlag = true;
			}
	    }
		return {valFlag: valFlag, valMsg : valMsg};
	},
	
	/**
	* 判断数字合法性
	* @author wlsun
	* @param str 字符
	* @param num 数字类型
	* @return 1 正确 0 不正确
	*/
	isNumeric_:function(str, num){
		var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,6})?$/;
		if(num == "2")
			reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
		if(num == "3")
			reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,3})?$/;
		if(reg.test(str)){
			return 1;
		}else{
			return 0;
		}
	},
	/**
	* @decs：获得两个日期的月份差（不考虑天）
	* @param： strDate1 日期字符串1
	* @param： strDate2 日期字符串2
	* @return：月份差值
	* @author： sylai@isoftstone.com
	*/
	getDiffMonthIgnoreDate:function(strDate1,strDate2){
		var date1 = toDate(strDate1);
		var date2 = toDate(strDate2);
		var monthDiff = 0;
	
	    //计算年份差距
	    var year2 = parseInt(date2.getFullYear(),10);
	    var year1 = parseInt(date1.getFullYear(),10);
	    monthDiff = monthDiff + 12 * (year2 - year1);
	
	    //计算月份差距
	    var month2 = parseInt(date2.getMonth(),10);
	    var month1 = parseInt(date1.getMonth(),10);
	    monthDiff = monthDiff + (month2 - month1);
	    
	    return Math.abs(monthDiff);
	},
	/**
	 * @decs:不判断js数据类型的等于
	 * */
	inNotTypeArray:function(elem, array){
		if(issCommonUtils.isNotBlank(array)){
			for ( var i = 0, length = array.length; i < length; i++ )
				if ( array[ i ] == elem )
					return i;
		}
		return -1;
	},
	/***
	 * @decs:获取字符串的字节长度（中文为2个字节，英文为1个字节）
	 */
	getStrLeng:function (str){     
		var realLength = 0, len = str.length, charCode = -1;
		for(var i = 0; i < len; i++){         
			charCode = str.charCodeAt(i);         
			if (charCode >= 0 && charCode <= 128) realLength += 1;         
			else realLength += 2;        // 如果是中文则长度加2    
		}      
		return realLength; 
	},
	/**
	* 计算日期差
	*/
	setDiffCUseYear:function(TInsrncBgnTm,TInsrncEndTm){
		var diffCUseYear = 0;
		
	    var bgnYear = parseInt(TInsrncBgnTm.substring(0,4),10);  //年
	    var bgnMonth = parseInt(TInsrncBgnTm.substring(5,7),10); //月
	    var bgnDay = parseInt(TInsrncBgnTm.substring(8,10),10);  //日
	    
	    var endYear = parseInt(TInsrncEndTm.substring(0,4),10);//年
	    var endMonth = parseInt(TInsrncEndTm.substring(5,7),10);//月
	    var endDay = parseInt(TInsrncEndTm.substring(8,10),10);//日
	    
	    var dateBgn = Date.parse(TInsrncBgnTm.replace(/-/g, "/"));
	    var dateEnd = Date.parse(TInsrncEndTm.replace(/-/g, "/"));
	    
	   
         if(TInsrncBgnTm && TInsrncEndTm ){
            
				var NYearTemp = endYear - bgnYear;
				var NMonthTemp = endMonth - bgnMonth;
				var NMonthTempResult = NYearTemp * 12 + NMonthTemp;
				diffCUseYear = NMonthTempResult / 12; 
        }
        return diffCUseYear;
	},
	/**判断json或者是数据是否为空数据
	 * @param true:空,false:非空
	 * */
	isEmptyObject: function(obj) {
		if(obj!=null){
			for (var name in obj) {
				return false;
			}
		}
		return true;
	},
	/**
	 * @dese: 用于将科学计数法样式的数字转换成标准样式，适应阅读习惯
	 * @param: num 需要转换的数字，或者能转换成数字的字符串
	 *             如：'1.2E6',1.2E6
	 * @return: Number
	 */
	formatNumber: function(num) {
		if(isNaN(num)) { //判断是否数字
			if(isNaN(eval(num))) { //判断是否代表数字的表达式字符串
				return num; //如果不是数字，原样返回
			} else {
				num = eval(num);
			}
		}
		var formatNum = new Number(num);
		return formatNum;
	},
	/**
	 * @dese: 校验是否非数字，不能为负数
	 * @param: num  
	 * @date： 2016-12-27 21:20:33 
	 * @author wlsun
	 * @return: flag
	 */
	checkNumber: function(num) {
	 	var temp = /^\d+(\.\d+)?$/;
	 	return temp.test(num);
	}
	
};