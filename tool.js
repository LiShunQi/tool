/**
 * Created by ggshu on 2018/4/21.
 */
//设置cookie  1
function setCookie(name, value, day){
    var exp = new Date();

    day = day || 7;
    exp.setTime(exp.getTime() + day*24*60*60*1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}
//获取cookie
function getCookie(name){
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        ,result = document.cookie.match(reg);

    if(result !== null) return unescape(result[2]); return null;
}
//删除cookie
function delCookie(name){
    var exp = new Date()
        ,val = getCookie(name);

    exp.setTime(exp.getTime() - 1);

    if(val !== null) document.cookie = name + '=' + val + ';expires=' + exp.toGMTString();
}

//时间转字符串 2
function toDateString(date, format){
    date = date || new Date();
    format = format || 'yyyy-MM-dd HH:mm:ss';

    var now = new Date(date)
        //前置补零
        ,digit = function(num, length){
            var str = '';
            length = length || 2;
            for(var i = (num + '').length; i < length; i++){
                str += '0';
            }
            return str + num;
        }
        ,ymd = [
            digit(now.getFullYear(), 4),
            digit(now.getMonth() + 1, 2),
            digit(now.getDate(), 2)
        ]
        ,hms = [
            digit(now.getHours()),
            digit(now.getMinutes()),
            digit(now.getSeconds())
        ];

    return format.replace(/yyyy/g, ymd[0]).replace(/MM/g, ymd[1]).replace(/dd/g, ymd[2])
        .replace(/HH/g, hms[0]).replace(/mm/g, hms[1]).replace(/ss/g, hms[2]);
}

//字符串转date 3
function str2date(str_date){
    if(!str_date) return '';

    var temArr = str_date.split('-');

    if(temArr.length !== 3){
        return false;
    }
    var date = null
        ,dateArr = str_date.split(' ');

    if(dateArr.length === 2){
        var ymd = dateArr[0].split('-')
            ,hms = dateArr[1].split(':');

        date = new Date(ymd[0], ymd[1], ymd[2] - 1, hms[0], hms[1], hms[2]);
    }else{
        date = new Date(temArr[0], temArr[1] - 1, temArr[2], 00, 00, 01);
    }

    return date;
}
//数字金额转为大写 4
function moneyChange(n) {
    var fraction = ['角', '分']
        ,digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
        ,unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
        ,head = n < 0? '欠': '';

    n = Math.abs(n);
    var s = '';
    //小数部分
    for(var k = 0; k < fraction.length; k++){
        s += (digit[n*10*Math.pow(10,k)%10] + fraction[k]).replace(/零./, '');
    }
    s = s || '整';

    //整数部分
    n = Math.floor(n);
    for(var i = 0; i < unit[0].length && n > 0; i++){
        var p = '';
        for(var j = 0; j < unit[1].length && n > 0; j++){
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }

    return head +  s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
//获取查询字符 5
function getSearchObj(){
    var str = location.search.slice(1);
    var obj = {};

    if(!str) return null;

    var temArr =  str.split('&');
    for(var i = 0; i < temArr.length; i++){
        var itemArr = temArr[i].split('=');

        obj[itemArr[0]] = itemArr[1];
    }
    return obj;
}

//判断元素是否包含某各类 6
function hasClass(ele, name){
    var reg = new RegExp('(^| )' + name + '( |$)');
    var className = ele.className;

    return reg.test(className);
}

//添加classname 7
function addClass(ele, name){
    if(hasClass(ele, name)) return;

    ele.className = ele.className + " " + name;
}

//移除classname 8
function removeClass(ele, name){
    if(!hasClass(ele, name)) return;

    ele.className = ele.className.replace(new RegExp(name), '');
}
//toggle class 9
function toggleClass(ele, name) {
    if(hasClass(ele, name)){
        removeClass(ele, name);
    }else{
        addClass(ele, name);
    }
}

// 短横线写法  < > 驼峰写法
function c2l(str){
    if(!str) return;
    return str.substring(0,str.indexOf('-')) + str[str.indexOf('-') + 1].toUpperCase() + str.substring(str.indexOf('-') + 2);
}

function c2l2(str){
    return str.replace(/-(\w)/g, function(all, letter, letter2){
        console.log(all,letter, letter2);
        return letter.toUpperCase();
    });
}

function l2c(str){
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

Array.prototype.indexof = function(searchElement, fromIndex){
    var k;

    if(this == null){
        throw new TypeError("'this' is null or not defind");
    }

    var o = Object(this);

    var len = o.length;

    if(len === 0){
        return -1;
    }

    var n = +fromIndex || 0;

    if(Math.abs(n) === Infinity){
        n = 0;
    }

    if(n > len){
        return -1;
    }

    k = Math.max(n > 0?n: len - Math.abs(n), 0);

    while(k < len){
        if(k in o && o[k] === searchElement){
            return k;
        }
        k++;
    }
    return -1;
};

// 数组去重
function unique1(arr){
    var result = []
        ,len = arr.length;

    for(var i = 0; i < len; i++) {
        if(result.indexOf(arr[i]) === -1){
            result.push(arr[i]);
        }
    }

    return result;
}
//hash 法
function unique2(arr){
    var result = []
        ,len = arr.length
        ,val
        ,type
        ,json = {};

    for(var i = 0; i < len; i++){
        val = arr[i];
        type = typeof arr[i];

        if(!json[val]){
            json[val] = [type];
            result.push(val);
        }else if(json[val].indexOf(type) === -1){
            json[val].push(type);
            result.push(val);
        }
    }

    return result;
}
//set 对象
// function unique3(arr){
//     return [...(new Set(arr))];
// }

//双重循环
function unique4(arr){
    var result = [arr[0]]
        ,len = arr.length;

    for(var i = 1; i < len; i++){
        var flg = false;

        for(var j = 0; j < result.length; j++){
            if(arr[i] === result[j]){
                flg = true;
                break;
            }
        }

        if(!flg){
            result.push(arr[i]);
        }
    }

    return result;
}

//对象法
function unique5(arr) {
    var result = []
        ,json = {}
        ,len = arr.length
        ,val
        ,type;

    for(var i = 0; i < len; i++){
        type = typeof arr[i];
        val = arr[i];

        if(!json[type + val]){
            json[type + val] = 1;
            result.push(val);
        }
    }

    return result;
}

//数组排序
function sort(arr){
    arr.sort(function(a, b) {
        return a - b;
    });
    return arr;
}

//冒泡排序
function sort1(arr) {
    var len = arr.length;

    for(var i = 0; i < len -1; i++){
        for(var j = 0; j < len - 1 - i; j++){
            if(arr[j] > arr[j + 1]){
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

/*
*
* 根据DOM2级事件规定，事件流应该包括三个阶段，事件捕获阶段，处于目标阶段和事件冒泡阶段。
* */
//事件监听
function addEvent(ele, type, handle, boolean) {
    if(ele.addEventListener){ //dom2
        ele.addEventListener(type,handle, boolean);
    }else if(ele.attachEvent) { //ie
        ele.attachEvent('on' + type, handle);
    }else { //dom0
        ele['on' + type] = handle;
    }
}
//事件移除
function removeEvent(ele, type, handle, boolean) {
    if(ele.removeEventListener){
        ele.removeEventListener(type,handle,boolean); //boolen 冒泡阶段触发
    }else if(ele.detachEvent){
        ele.detachEvent('on' + type, handle);
    }else{
        ele['on' + type] = null;
    }
}
//阻止元素默认事件
function stopDefault(event){
    var ev = arguments.callee.caller.arguments[0] || event;

    if(ev && ev.preventDefault){
        // 阻止默认浏览器动作(W3C)
        ev.preventDefault();
    }else if(window.event){
        // IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
}
//事件冒泡
function cancelPropagation(event){
    var ev = arguments.callee.caller.arguments[0] || event;
    if(ev && ev.stopPropagation){
        // ff , opera
        ev.stopPropagation();
    }else if(window.event){
        //ie
        window.event.cancelBubble = true;
    }
}

//浏览器
function bowserMessage(){
    var agent = navigator.userAgent.toLowerCase();
    var sys = {};
    var s;

    (s = agent.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
    (s = agent.match(/msie ([\d.]+)/)) ? sys.ie = s[1]:
    (s = agent.match(/edge\/([\d.]+)/)) ? sys.edge = s[1]:
    (s = agent.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1]:
    (s = agent.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1]:
    (s = agent.match(/opera\/([\d.]+)/)) ? sys.opera = s[1]:
    (s = agent.match(/safari\/([\d.]+)/)) ? sys.safari = s[1]: 0;

    sys.os = function(){ //底层操作系统
        if(/windows/.test(agent)){
            return 'windows';
        } else if(/linux/.test(agent)){
            return 'linux';
        } else if(/iphone|ipod|ipad|ios/.test(agent)){
            return 'ios';
        } else if(/mac/.test(agent)){
            return 'mac';
        }
    }();

    return sys;
}
//时间是多久之前
function timeAgo(time, onlyDate){
    var arr = [[],[]]
        ,stamp = new Date().getTime() - new Date(time).getTime();

    var digit = function(num, len) {
        var str = '';
        len = len || 2;
        num = String(num);
        for(var i = num.length; i < len ; i++){
            str += '0';
        }
        return str + num;
    };

    if(stamp > 1000*60*60*24*8){ //大于八天显示日期格式
        stamp = new Date(time);
        arr[0][0] = digit(stamp.getFullYear(),4);
        arr[0][1] = digit(stamp.getMonth() + 1);
        arr[0][2] = digit(stamp.getDate());

        if(!onlyDate){ //是否只显示日期
            arr[1][0] = digit(stamp.getHours());
            arr[1][1] = digit(stamp.getMinutes());
            arr[1][2] = digit(stamp.getSeconds());
        }
        return arr[0].join('-') + ' ' + arr[1].join(':');
    }

    if(stamp > 1000*60*60*24)
        return ((stamp/1000/60/60/24) | 0) + '天前';
    else if(stamp > 1000*60*60)
        return ((stamp/1000/60/60) | 0) + '小时前';
    else if(stamp > 1000*60*2) //小于两分钟为刚刚
        return ((stamp/1000/60) | 0) + '分钟前';
    else if(stamp < 0)
        return '未来';
    else
        return '刚刚';
}

//

