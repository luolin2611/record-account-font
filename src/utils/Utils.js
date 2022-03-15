import { Toast } from "vant";

/**
 * 定义Format方法  dateTime--后台传输过来的Date类型  fmt--你要转换的格式
 * 返回的是对应fmt时间格式的字符串
 * 
 * @ author: rollin
 * @ date: 2021-04-26 16:09:26
 */
export function Format(datetime, fmt) {
    if (parseInt(datetime) == datetime) {
        if (datetime.length == 10) {
            datetime = parseInt(datetime) * 1000;
        } else if (datetime.length == 13) {
            datetime = parseInt(datetime);
        }
    }
    datetime = new Date(datetime);
    var o = {
        "M+": datetime.getMonth() + 1,                 //月份
        "d+": datetime.getDate(),                    //日
        "h+": datetime.getHours(),                   //小时
        "m+": datetime.getMinutes(),                 //分
        "s+": datetime.getSeconds(),                 //秒
        "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
        "S": datetime.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 保留两位小数
 * 
 * @param {处理的值} vaule 
 */
let toFixedTwoDecimals = (vaule) => {
    return vaule.toFixed(2);
}

/**
 * 显示加载框
 * 
 * @param {*} msg 提示消息
 * @param {*} duration 持续时间
 * @param {*} options 自定义optons
 * @returns 
 */
function showLoading(msg = '加载中...', options) {
    let opts = {
        duration: 0,
        forbidClick: true,
        message: msg,
        ...options
    }
    return Toast.loading(opts)
}

/**
 * 关闭toast
 * 
 * @param {Toast} toast 吐司对象
 */
function closeLoading(toast = null) {
    if (toast != null) {
        toast.clear();
    }
}

/**
 * 清空对象
 * 
 * @param {object} 对象文件  
 */
function clearObj(object = null) {
	if(!object) {
		let keys = Reflect.ownKeys(object)
		keys.forEach(key => {
			object[key] = ''
		})
	}
	return object
}

export {
    toFixedTwoDecimals,
    showLoading,
    closeLoading,
	clearObj
}