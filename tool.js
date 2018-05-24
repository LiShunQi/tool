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
//统计字符串中字母出现最多的一个
function count(str) {
    if(!str) return '';
    var obj = {};
    var value,count = 1;
    for(var i = 0; i < str.length; i++) {
        var v = str.charAt(i);

        if(!obj[v]){
            obj[v] = 1;
        }else{
            obj[v] += 1;
        }

        if(obj[v] > count){
            count = obj[v];
            value = v;
        }
    }

    return {value:value, count: count};
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
//快速排序
function quickSort(arr){
    var len = arr.length
        ,index
        ,centerValue
        ,left = []
        ,right = [];

    if(len <= 1) return arr;

    index = Math.floor(len/2);

    centerValue = arr.splice(index, 1);
    len -= 1;

    for(var i = 0; i < len; i++){
        if(arr[i] > centerValue){
            right.push(arr[i]);
        }else{
            left.push(arr[i]);
        }
    }

    return quickSort(left).concat(centerValue, quickSort(right));
}
//选择排序
function selectSort(arr) {
    var len = arr.length
        ,temp;

    for(var i = 0; i < len -1; i++){
        for(var j = i + 1; j < len; j++){
            if(arr[i] > arr[j]){
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}
//插入排序
function insertionSort(array) {
    console.time('插入排序耗时：');
    for (var i = 1; i < array.length; i++) {
        var key = array[i];
        var j = i - 1;
        while ( array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    console.timeEnd('插入排序耗时：');
    return array;
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

//倒计时
function countdown(endTime, serverTime, callback){
    var type = typeof serverTime === 'function'
        ,end = new Date(endTime).getTime()
        ,now = new Date((!serverTime || type) ? new Date().getTime() : serverTime).getTime()
        ,count = end - now
        ,time = [
            Math.floor(count/(1000*60*60*24)), //天
            Math.floor(count/(1000*60*60))  % 24, //时
            Math.floor(count/(1000*60))  % 60, //分
            Math.floor(count/(1000)) % 60 //秒
        ];

    // console.log(time);
    if(type) callback = serverTime;

    var timer = setTimeout(function() {
        countdown(endTime, now + 1000, callback);
    }, 1000);

    callback && callback(count > 0 ? time : [0,0,0,0], serverTime, timer);

    if(count < 0) clearTimeout(timer);
    return timer;
}
//字符简化 xxxyydcc to 3x2yd2c
function sampleStr(str) {
    var new_str = ''
        ,count = 1
        ,str_arr = str.split('')
        ,same = str_arr[0];

    for(var i = 1; i < str_arr.length; i++){
        // var temp = '';
        if(str_arr[i] === same){
            count++;
            if(i === str_arr.length - 1){
                count === 1 ? new_str += same : new_str += (count + same);
            }
        }else{
            count === 1 ? new_str += same : new_str += (count + same);
            same = str_arr[i];
            count = 1;
            if(i === str_arr.length - 1){
                count === 1 ? new_str += same : new_str += (count + same);
            }
        }
    }
    return new_str;
}

//原生ajax封装
function ajax(option){
    var xhr;
    option = option || {};
    option.type = (option.type || 'get').toUpperCase();
    option.dataType = (option.dataType || 'json');

    var paramform = function(data){
        var arr = [];
        data = data || {};
        for(var name in data){
            if(data.hasOwnProperty(name)){
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
        }
        return arr.join('&');
    };
    var params = paramform(option.data);

    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
                option.success && option.success(xhr.responeText,xhr.responeXML);
            }else {
                option.error && option.error(xhr.status);
            }
        }
    };

    if(option.type === 'GET'){
        xhr.open('GET', option.url + '?' + params, true);
        xhr.send(null);
    }else if(option.type === 'POST'){
        xhr.open('POST', option.url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
}
//判断是否是数组
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';
}
//获取数组中的最值
function minOrmax(arr, type){
    type = type || 'min';

    if(type === 'min')
        return Math.min.apply(Math, arr);
    else if(type === 'max')
        return Math.max.apply(Math, arr);
}
//获取窗口高度
function pageHeight(){
    return document.documentElement.clientHeight || document.body.clientHeight;
}
//获取窗口宽度
function pageWidth() {
    return document.documentElement.clientWidth || document.body.clientWidth;
}
//判断页面滚动高度
function scrollHeight(){
    return document.documentElement.scrollTop || document.body.scrollTop;
}
//返回页面顶部
function backTop(time){
    var height,timer;

    timer = setInterval(function() {
        height = document.documentElement.scrollTop || document.body.scrollTop;
        if(height <= 0) clearInterval(timer);

        if(document.body.scrollTop){
            document.body.scrollTop = height - 10;
        }else{
            document.documentElement.scrollTop = height - 10;
        }
    }, time);
}
// 判断变量类型
function isType(type){
    type = type[0].toUpperCase() + type.substring(1);

    return function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
}
//元素距离文档的距离
function offset(ele){
    var pos = {
        left: 0,
        top: 0
    };

    while(ele){
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
    }

    return pos;
}
//设置页面滚动的距离
function setScrollTop(value){
    window.scrollTo(0, value);
    return value;
}
//深拷贝
function deepClone(obj) {
    var type, copy;
    type = typeof obj;

    if(type !== 'object') return obj;

    if(obj instanceof Array){
        copy = [];
        for(var i = 0; i < obj.length; i++){
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }else{
        copy = {};
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                copy[key] = deepClone(obj[key]);
            }
        }
        return copy;
    }
}
//随机数
function randomNum(start, end){
    return Math.floor(start + Math.random()* (end - start));
}
//随机色
function randomColor(rgb){
    var color;
    if(rgb){
        color = rgb + '(' + Math.floor(Math.random()*256) + ',' +
            Math.floor(Math.random()*256) + ',' +
            Math.floor(Math.random()*256) + ')';
    }else{
        color = '#' + ('00000' + (Math.random() * 0x1000000).toString(16)).slice(-6);
    }
    return color;
}
/**
 *
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}
/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}
/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}
/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

//判读对象是否为空
function isEmptyObject1(obj){
    if(JSON.stringify(obj) === '{}'){
        return true;
    }
    return false;
}
function isEmptyObject2(obj) {
    for(var key in obj){
        return false;
    }
    return true;
}
function isEmptyObject3(obj){
    var arr = Object.getOwnPropertyNames(obj); //Object.keys (ES5)返回可枚举的属性，及不可枚举的属性
    if(!arr.length)
        return true;
    else
        return false;
}
function isEmptyObject4(obj) {
    var arr = Object.keys(obj); //Object.keys (ES5)返回可枚举的属性
    if(!arr.length)
        return true;
    else
        return false;
}
//链式方法
function add(num) {
    var count = num;
    var _b = function(l){
        count += l;
        return _b;
    };
    _b.valueOf = function () {
        return count;
    };
    return _b;
}

function add2() {
    var args = [].slice.call(arguments);

    var fn = function () {
        var arg_fn = [].slice.call(arguments);
        return add2.apply(null, args.concat(arg_fn));
    };

    fn.valueOf = function () {
        return args.reduce(function(prev, next) {
            return prev * next;
        })
    };

    return fn;
}

//去除字符串前后空格
String.prototype._trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+/g, '');
};

//函数防抖
function debounce(fn,delay) {
    var timer;

    return function () {
        var context = this,
            arg = arguments;

        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.call(context, arg);
        },delay || 100);
    }
}

//函数节流
function throttle(fn, delay) {
    var timer
        ,start = 0
        ,now = 0;

    return function () {
        var context = this
            ,arg = arguments;

        now = new Date().getTime();
        if(!start) start = now;

        if(now - start >= delay) {
            fn.call(context, arg);
            start = new Date().getTime();
        }else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.call(context, arg);
            },delay || 100);
        }
    }
}

