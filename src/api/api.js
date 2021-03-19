import axios from './request'

/*******  Home 页面  **** */
/**
 * 用户已经登录，查询首页信息
 * 
 * @param {*} param 
 * @returns 
 */
export const homeInitInfo = param => requestMethod('homeInitInfo', '/home/homeInitInfo', param);
/**
 * 获取用户分类列表
 * 
 * @param {*} param 
 * @returns 
 */
export const queryClassify = param => requestMethod('queryClassify', '/record/queryClassify', param);
/**
 * 记账
 * 
 * @param {*} param 
 * @returns 
 */
export const addRecordAcct = param => requestMethod('addRecordAcct', '/record/addRecordAcct', param);











/********  bill 页面  ****** */
/**
 *  获取当前系统时间
 * 
 * @param {*} param 
 * @returns 
 */
export const querySysTime = param => requestMethod('querySysTime', '/bill/querySysTime', param);
/**
 *  获取账单首页顶部内容
 * 
 * @param {*} param 
 * @returns 
 */
export const queryBillInfo = param => requestMethod('queryBillInfo', '/bill/queryBillInfo', param);









/********  用户相关 页面  ****** */
/**
 * 请求登录
 * @param {} param 
 */
export const login = param => axios.post('/user/login', { ...param }).then(res => res);
/**
 * 注册
 * @param {} param 
 */
export const register = param => axios.post('/user/register', { ...param }).then(res => res);








/**
 * 带有缓存的请求方法
 * 
 * @param {请求名称} methodName 
 * @param {请求url} url 
 * @param {请求参数: 
 *      getCache - 允许从cache中获取数据，默认为允许
 *      setCache - 将本次请求服务端返回的数据进行缓存，默认为允许
 * } param 
 * @returns 
 */
const requestMethod = (methodName, url, param) => {
    //如果localStorageId 为传入，则使用methodName为key
    let localStorageId = param.localStorageId || methodName;
    //返回本地标志
    let returnLocalDataFlag = false;
    //1.判断是否需要从cache里面获取内容 （默认为true）
    let getCache = param.getCache == undefined ? true : param.getCache;
    let cacheRes = JSON.parse(localStorage.getItem(localStorageId)) || null;
    //1.1 获取更新标志
    let updateObj = JSON.parse(localStorage.getItem("updateObj"));
    if (updateObj && getCache && cacheRes) {
        const keys = Object.keys(updateObj);
        for (let key in keys) {
            if (keys[key] == localStorageId) {
                if (!updateObj[keys[key]] || !window.navigator.onLine) {
                    // 如果更新标志为false或者网络未连机    表示当前对象不需要，从缓存里面取并返回
                    returnLocalDataFlag = true;
                    break;
                }
            }
        }
    }

    if (returnLocalDataFlag) {
        // 1.2 返回本地对象
        return new Promise((resolve, reject) => {
            cacheRes && resolve(cacheRes)
            !cacheRes && reject(new Error('this storage not key!'))
        });
    } else {
        //2.根据表示判断是否需要存储本次请求 （默认为true）
        let setCache = param.setCache == undefined ? true : param.setCache;
        return axios.post(url, { ...param }).then(res => {
            if (res.code == '0000' && setCache) {
                //请求服务成功，根据标志进行缓存请求，并更新缓存状态为false.
                localStorage.setItem(localStorageId, JSON.stringify(res));
                let updateObj = JSON.parse(localStorage.getItem("updateObj")) || {};
                updateObj[localStorageId] = false;
                localStorage.setItem("updateObj", JSON.stringify(updateObj));
            }
            return res;
        })
    }
}