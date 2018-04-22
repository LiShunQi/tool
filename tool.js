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

function toggleClass(ele, name) {
    if(hasClass(ele, name)){
        removeClass(ele, name);
    }else{
        addClass(ele, name);
    }
}