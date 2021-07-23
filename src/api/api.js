import axios from './request'



//本地的时候放开
let prefix = '';
//发布的时候放开
// let prefix = '/record-account';


/*******  Home 页面  **** */
/**
 * 用户已经登录，查询首页信息
 * 
 * @param {*} param 
 * @returns 
 */
export const homeInitInfo = param => requestMethod('homeInitInfo', prefix + '/home/homeInitInfo', param);
/**
 * 获取用户分类列表
 * 
 * @param {*} param 
 * @returns 
 */
export const queryClassify = param => requestMethod('queryClassify', prefix + '/record/queryClassify', param);
/**
 * 记账
 * 
 * @param {*} param 
 * @returns 
 */
export const addRecordAcct = param => requestMethod('addRecordAcct', prefix + '/record/addRecordAcct', param);











/********  bill 页面  ****** */
/**
 *  获取当前系统时间
 * 
 * @param {*} param 
 * @returns 
 */
export const querySysTime = param => requestMethod('querySysTime', prefix + '/bill/querySysTime', param);
/**
 *  获取账单首页顶部内容
 * 
 * @param {*} param 
 * @returns 
 */
export const queryBillInfo = param => requestMethod('queryBillInfo', prefix + '/bill/queryBillInfo', param);
/**
 *  查询 月支出/月收入 列表
 * 
 * @param {*} param 
 * @returns 
 */
export const queryMonthIncomeExpenseList = param => requestMethod('queryMonthIncomeExpenseList', prefix + '/bill/queryMonthIncomeExpenseList', param);
/**
 *  查询 月支出/月收入 列表
 * 
 * @param {*} param 
 * @returns 
 */
export const queryYearBrokeLineList = param => requestMethod('queryYearBrokeLineList', prefix + '/bill/queryYearBrokeLineList', param);










/********  report 页面  ****** */
/**
 *  获取报表信息
 * 
 * @param {*} param 
 * @returns 
 */
export const queryReportInfo = param => requestMethod('queryReportInfo', prefix + '/report/queryReportInfo', param);
// 请求详情列表
export const queryReportDetailsList = param => requestMethod('queryReportDetailsList', prefix + '/report/queryReportDetailsList', param);









/********  用户相关 页面  ****** */
/**
 * 请求登录
 * @param {} param 
 */
export const login = param => axios.post(prefix + '/user/login', { ...param }).then(res => res);
/**
 * 注册
 * @param {} param 
 */
export const register = param => axios.post(prefix + '/user/register', { ...param }).then(res => res);








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
    /******************************************************** */
    /***********************  注意的地方 ********************** */
    //时间 2021-04-01 16:17:12 暂时废弃缓存机制，因为存在许多bug
    param.setCache = false;
    param.getCache = false;
    param.showLoading = param.showLoading == undefined ? true : param.showLoading;
    /******************************************************** */
    /******************************************************** */




    //如果localStorageId 未传入，则使用methodName为key
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
                if (!updateObj[keys[key]]) {
                    // 表示不需要更新，直接返回缓存对象
                    returnLocalDataFlag = true;
                    break;
                }
            }
        }
    }
    // 情况一、根据返回对象标志进行判断是否需要访问网络；情况二、网络未连接从缓存里面取并返回
    if (returnLocalDataFlag || !window.navigator.onLine) {
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