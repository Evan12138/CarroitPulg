
;(function ($) {
	//发送验证码
	$.fn.SendCode = function (options) {
	    var defaults  = {
				beforeSend:"beforeSend", //发送前的样式
				afterSend:"afterSend", //发送后的样式
				tips: "{times}秒后重新发送", //按钮提示信息
				times: 60, //间隔时间
				callback: null
		    }
	    var ops = $.extend(defaults, options);
	    var _temp, _this, _type, _time, _vals, _canSend; //缓存变量 _temp为缓存变量, _type=当前对象是什么类型button或者input或者a标签span标签等   _this=当前对象 _time=时间 _canSend=能否发送 true为不能发送 false为能发送
	    typeof (this.attr("class")) == "undefined" ? this.attr("class", "") : ""; //为了防止没有设置class的情况
	    //_canSend = this.attr("class").indexOf(ops.afterSend)>-1; // 如果class中包含发送后的样式说明不能发送
	    //if (_canSend) { return false; } //如果_canSend=true  则不能再次执行
	    _this = this; //缓存当前对象
	    _type = (_this[0].tagName).toLowerCase(); //拿到当前按钮类型
	    function GetVals() {
	        switch (_type) {
	            case "input":
	            case "button":
	                _vals = _this.val();
	                break;
	            default:
	                _vals = _this.text();
	                break;
	        }
	    }
	    GetVals();
	    function SetVal(val) {
	        switch (_type) {
	            case "input":
	            case "button":
	                _this.val(val);
	                break;
	            default:
	                _this.text(val);
	                break;
	        }
	    }
	    SetVal(_vals);
	   	_time = ops.times;
		function settime() {
		    _time--;
		    if (_time > 0) {
		        _this.attr("class").indexOf(ops.afterSend) > -1 ? "" : _this.removeClass(ops.beforeSend).addClass(ops.afterSend);
		        SetVal(ops.tips.replace("{times}", _time));
		        _canSend = true;
		        setTimeout(function () { settime() }, 1000);
		    }
		    else {
		        _time = ops.times;
		        SetVal(_vals);
		        _this.removeClass(ops.afterSend).addClass(ops.beforeSend);
		        _canSend = false;
		    }
		}
		$(_this).bind("click", function () {
		    if (_canSend) { return false; } //如果_canSend=true  则不能再次执行
		    if (ops.callback) {
		        if (ops.callback()) {
		            settime();
		        }
		    }
		});
	};
 })(jQuery);

; (function ($) {
    //窗体大小改变
    $.fn.Resize = function (options) {
        var defaults = {
            times: 100, //resize后的缓冲时间
            trigger: false, //false 在事件结束后触发 true 在开始前触发
            callback: null
        }
        var ops = $.extend(defaults, options);
        var _this = this;
        var isResize = function (func, threshold, execAsap) {
            var timeout;
            return function debounced() {
                var obj = this, args = arguments;
                function delayed() {
                    if (!execAsap)
                        func.apply(obj, args);
                    timeout = null;
                };
                if (timeout)
                    clearTimeout(timeout);
                else if (execAsap)
                    func.apply(obj, args);
                timeout = setTimeout(delayed, threshold || 100);
            };
        }
        //isResize(回调，延时毫秒，true=在resize开始的时候触发false在resize结束的时候触发)
        window.onresize = isResize(function () {
            if (ops.callback) {
                ops.callback({ width: $(this).width(), height: $(this).height() });
            }
        }, ops.time, ops.trigger);
    }
})(jQuery);

; (function ($) {
    $.fn.PlaceHolder = function (options) {
		
    }
})(jQuery);

; (function ($) {
    //滚动加载
    $.fn.ScrollLoading = function (options) {

    }
})(jQuery);

; (function ($) {
    //限制文字,统计字数
    $.fn.WordCount = function (options) {
		var defaults = {
            count: 100, //允许输入的字数
            stop: true, //文字输入完成后是否禁止继续输入
            callback: null
        }
		var _this = this;
		var less = 0;
		var IsContinue = true;
        var ops = $.extend(defaults, options);
        if(ops.stop){_this.attr("maxlength",ops.count);}
        function cal_WordCount(){
        	less= ops.count - _this.val().length;
        	if(ops.callback){
        		ops.callback(ops.count,_this.val().length,less);
        	}
        }
        _this.on("input propertychange",function(){
        	return cal_WordCount();
        })
    }
})(jQuery);

//增加扩展方法
$.extend({
	//获取QueryString str QueryString值 如果不存在返回空
    GetQueryString: function (str) {
        var data = {};
        var aPairs, aTmp;
        var queryString = new String(window.location.search);
        queryString = queryString.substr(1, queryString.length); //remove   "?"     
        aPairs = queryString.split("&");
        for (var i = 0; i < aPairs.length; i++) {
            aTmp = aPairs[i].split("=");
            data[aTmp[0]] = aTmp[1];
        }
        var res = data[str];
        res = typeof (res) == "undefined" ? "" : res;
        return res;
    },
	//替换全部  input 输入的字符串    waitreplace 需要替换的字符     replaceto 替换成什么 
	ReplaceAll: function(input,waitreplace,replaceto){
		eval("var re = /"+waitreplace+"/g ;"); 
		return input.replace(re, replaceto);
	},
    //判断是否微信浏览器
	IsWeiXin: function () { 
	    var ua = window.navigator.userAgent.toLowerCase();
	    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	        return true;
	    } else {
	        return false;
	    }
	},
    //是否移动设备
	IsMobile:function(){
	    var browser = {
	        versions: function () {
	            var u = navigator.userAgent, app = navigator.appVersion;
	            return {//移动终端浏览器版本信息   
	                trident: u.indexOf('Trident') > -1, //IE内核  
	                presto: u.indexOf('Presto') > -1, //opera内核  
	                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
	                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
	                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
	                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
	                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
	                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
	                iPad: u.indexOf('iPad') > -1, //是否iPad    
	                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
	            };
	        }(),
	        language: (navigator.browserLanguage || navigator.language).toLowerCase()
	    }

	    if (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad) {
	        return true;
	    }
	    else {
	        return false;
	    }
	},
    //是否移动设备的另外一种方法
	IsMobileUserAgent: function () {
	    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
	},
    //是否安卓设备
	IsAndroid: function () {
	    return (/android/i.test(navigator.userAgent.toLowerCase()));
	},
    //是否苹果设备
	IsApple: function () {
	    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
	},
    //加载CSS文件
	LoadStyle: function (url) {
	    try {
	        document.createStyleSheet(url)
	    } catch (e) {
	        var cssLink = document.createElement('link');
	        cssLink.rel = 'stylesheet';
	        cssLink.type = 'text/css';
	        cssLink.href = url;
	        var head = document.getElementsByTagName('head')[0];
	        head.appendChild(cssLink)
	    }
	},
    //格式化时间  格式  yyyy-MM-dd hh:mm:ss  只传 format 为当前时间格式化  没有参数为默认格式化
	FormartDate: function (format, time) {
	    var date;
	    if (arguments.length == 1) {
	        date = new Date();
	    }
	    else if (arguments.length == 0) {
	        format = "yyyy-MM-dd hh:mm:ss";
	        date = new Date();
	    }
	    else {
	        date = new Date(time);
	    }
	    var o = {
	        "M+": date.getMonth() + 1, //month
	        "d+": date.getDate(),  //day
	        "h+": date.getHours(),   //hour
	        "m+": date.getMinutes(), //minute
	        "s+": date.getSeconds(), //second
	        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
	        "S": date.getMilliseconds() //millisecond
	    };
	    if (/(y+)/.test(format)) {
	        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            //alert(format)
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	},
    /*
            输出个性化时间
    1、< 60s, 显示为“刚刚”
    2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
    3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
    4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
    5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
    */
	FormartTime: function (time) {
	    var date = new Date(time),
        curDate = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 10,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        curYear = curDate.getFullYear(),
        curHour = curDate.getHours(),
        timeStr;
	    if (year < curYear) {
	        timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
	    } else {
	        var pastTime = curDate - date,
                pastH = pastTime / 3600000;
	        if (pastH > curHour) {
	            timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
	        } else if (pastH >= 1) {
	            timeStr = '今天 ' + hour + ':' + minute + '分';
	        } else {
	            var pastM = curDate.getMinutes() - minute;
	            if (pastM > 1) {
	                timeStr = pastM + '分钟前';
	            } else {
	                timeStr = '刚刚';
	            }
	        }
	    }
	    return timeStr;
	},
    //返回页面ScrollTop
	GetScrollTop: function () {
	    var a = document;
	    return a.documentElement.scrollTop || a.body.scrollTop;
	},
    //金额大写转换 
	TransMoney:function (tranvalue) {
	    try {
	        var i = 1;
	        var dw2 = new Array("", "万", "亿"); //大单位
	        var dw1 = new Array("拾", "佰", "仟"); //小单位
	        var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
	        //以下是小写转换成大写显示在合计大写的文本框中     
	        //分离整数与小数
	        
	        typeof (tranvalue) == "number" ? tranvalue = String(tranvalue) : null;

	        var value = new Array('','');
	        temp = tranvalue.split(".");
	        for (var i = 0; i < temp.length; i++) {
	            value = temp;
	        }
	        var source = value;

	        var num = source[0];
	        var dig = source[1];
	        if (typeof (dig)=="undefined") {
	            dig = "00";
	        }
	        //转换整数部分
	        var k1 = 0; //计小单位
	        var k2 = 0; //计大单位
	        var sum = 0;
	        var str = "";
	        var len = source[0].length; //整数的长度
	        for (i = 1; i <= len; i++) {
	            var n = source[0].charAt(len - i); //取得某个位数上的数字
	            var bn = 0;
	            if (len - i - 1 >= 0) {
	                bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
	            }
	            sum = sum + Number(n);
	            if (sum != 0) {
	                str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
	                if (n == '0') sum = 0;
	            }
	            if (len - i - 1 >= 0) { //在数字范围内
	                if (k1 != 3) { //加小单位
	                    if (bn != 0) {
	                        str = dw1[k1].concat(str);
	                    }
	                    k1++;
	                } else { //不加小单位，加大单位
	                    k1 = 0;
	                    var temp = str.charAt(0);
	                    if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
	                        str = str.substr(1, str.length - 1);
	                    str = dw2[k2].concat(str);
	                    sum = 0;
	                }
	            }
	            if (k1 == 3){ //小单位到千则大单位进一
	                k2++;
	            }
	        }
	        //转换小数部分
	        var strdig = "";
	        if (dig != "") {
	            var n = dig.charAt(0);
	            if (n != 0) {
	                strdig += dw[Number(n)] + "角"; //加数字
	            }
	            var n = dig.charAt(1);
	            if (n != 0) {
	                strdig += dw[Number(n)] + "分"; //加数字
	            }
	        }
	        str += "元" + strdig;
	    } catch(e) {
	        return "";
	    }
	    return str;
	},
    //截取字符串  str = 字符串  len = 长度  flag = 超出长度的符号
	CutString: function (str, len, flag) {
	    if (str.length >= len) {
	        return str.substring(0, len) + flag;
	    }
	    else {
	        return str;
	    }
	},
   //生成随机字符串
	RadomStr: function (length, special) {
	    var iteration = 0;
	    var str = "";
	    var randomNumber;
	    if (special == undefined) {
	        var special = false;
	    }
	    while (iteration < length) {
	        randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
	        if (!special) {
	            if ((randomNumber >= 33) && (randomNumber <= 47)) { continue; }
	            if ((randomNumber >= 58) && (randomNumber <= 64)) { continue; }
	            if ((randomNumber >= 91) && (randomNumber <= 96)) { continue; }
	            if ((randomNumber >= 123) && (randomNumber <= 126)) { continue; }
	        }
	        iteration++;
	        str += String.fromCharCode(randomNumber);
	    }
	    return str;
	},
    //给金额千分位加逗号   amount =传过来的字符串    传过来保留几位返回保留几位   delimiter=分隔符  默认逗号
	FormatMoney: function (amount, delimiter) {
	    //将传过来的数据转换成字符串
	    amount = amount.toString();
	    if (arguments.length==1) {
	        delimiter = ",";
	    }
	    var a = amount.split('.', 2)
	    var d = a[1];
	    typeof (d) == "undefined" ? d="" : "";
	    var i = parseInt(a[0]);
	    if (isNaN(i)) { return ''; }
	    var minus = '';
	    if (i < 0) { minus = '-'; }
	    i = Math.abs(i);
	    var n = new String(i);
	    var a = [];
	    while (n.length > 3) {
	        var nn = n.substr(n.length - 3);
	        a.unshift(nn);
	        n = n.substr(0, n.length - 3);
	    }
	    if (n.length > 0) { a.unshift(n); }
	    n = a.join(delimiter);
	    if (d.length < 1) { amount = n; }
	    else { amount = n + '.' + d; }
	    amount = minus + amount;
	    return amount;
	},
	//获取农历 时间格式 2016-01-01 2016/01/01 返回格式 丙申(猴)年 十月初九
	LunarCalendar:function(date){
		//var result = new Array();
		var CalendarData = new Array(100);
		var madd = new Array(12);
		var tgString = "甲乙丙丁戊己庚辛壬癸";
		var dzString = "子丑寅卯辰巳午未申酉戌亥";
		var numString = "一二三四五六七八九十";
		var monString = "正二三四五六七八九十冬腊";
		var weekString = "日一二三四五六";
		var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
		var cYear, cMonth, cDay, TheDate;
		CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
		madd[0] = 0;
		madd[1] = 31;
		madd[2] = 59;
		madd[3] = 90;
		madd[4] = 120;
		madd[5] = 151;
		madd[6] = 181;
		madd[7] = 212;
		madd[8] = 243;
		madd[9] = 273;
		madd[10] = 304;
		madd[11] = 334;
		
		function GetBit(m, n) {
		    return (m >> n) & 1;
		}
		function e2c() {
		    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
		    var total, m, n, k;
		    var isEnd = false;
		    var tmp = TheDate.getYear();
		    if (tmp < 1900) {
		        tmp += 1900;
		    }
		    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
		
		    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
		        total++;
		    }
		    for (m = 0; ; m++) {
		        k = (CalendarData[m] < 0xfff) ? 11 : 12;
		        for (n = k; n >= 0; n--) {
		            if (total <= 29 + GetBit(CalendarData[m], n)) {
		                isEnd = true; break;
		            }
		            total = total - 29 - GetBit(CalendarData[m], n);
		        }
		        if (isEnd) break;
		    }
		    cYear = 1921 + m;
		    cMonth = k - n + 1;
		    cDay = total;
		    if (k == 12) {
		        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
		            cMonth = 1 - cMonth;
		        }
		        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
		            cMonth--;
		        }
		    }
		}
		
		function GetcDateString() {
		    var tmp = "";
		    tmp += tgString.charAt((cYear - 4) % 10);
		    tmp += dzString.charAt((cYear - 4) % 12);
		    tmp += "(";
		    tmp += sx.charAt((cYear - 4) % 12);
		    tmp += ")年 ";
		    if (cMonth < 1) {
		        tmp += "(闰)";
		        tmp += monString.charAt(-cMonth - 1);
		    } else {
		        tmp += monString.charAt(cMonth - 1);
		    }
		    tmp += "月";
		    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
		    if (cDay % 10 != 0 || cDay == 10) {
		        tmp += numString.charAt((cDay - 1) % 10);
		    }
		    return tmp;
		}
		
		function GetLunarDay(solarYear, solarMonth, solarDay) {
		    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
		    if (solarYear < 1921 || solarYear > 2020) {
		        return "";
		    } else {
		        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
		        e2c(solarYear, solarMonth, solarDay);
		        return GetcDateString();
		    }
		}
		if(arguments.length==0){ date=new Date(); }
		else{ date=new Date(date); }
		var D = date;
		var yy = D.getFullYear(); 
		var mm = D.getMonth() + 1;
		var dd = D.getDate();
		var ww = D.getDay();
		var ss = parseInt(D.getTime() / 1000);
		if (yy < 100) yy = "19" + yy;
		return GetLunarDay(yy, mm, dd);
	}
});