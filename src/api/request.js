import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';
import { closeLoading, showLoading } from '../utils/Utils';

// axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';


let toast = null;

/**
 * 添加请求拦截器
 * 注意： config.data.showLoading 作为判断是否显示加载框， 默认不显示
 */
axios.interceptors.request.use(config => {
  let user = store.state.user || null;
  if (user) {
    //如果是登录了，就填充登录token
    config.headers.common.Authorization = user.jwtToken;
  }

  //是否显示加载框 （默认显示）
  config.data.showLoading && (toast = showLoading())
  config.data.check_request = {
    timestamps: "20210223",
    sign: "xxxxxxx"
  }
  config.data.body = { ...config.data }
  return config;
}, function (error) {
  closeToast();
  Toast('请求网络错误')
});

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(response => {
  closeLoading(toast)
  let status = response.status
  switch (status) {
    case 200:
      let data = response && response.data;
      if (data && data.code === '0000') {
        return data
      } else {
        Toast(data.msg)
      }
      break
    case 400:
      Toast('服务器异常，请稍后再试')
      break
    case 404:

      break
    case 500:
      Toast('服务器异常，请稍后再试')
      break
  }
}, error => {
  closeLoading(toast)
  console.log(error)
})


export default axios