import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';

// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.common['Authorization'] = 'aaaaaa';
axios.defaults.headers.post['Content-Type'] = 'application/json';


let toast = null;

/**
 * 添加请求拦截器
 * 注意： config.data.showLoading 作为判断是否显示加载框， 默认不显示
 */
axios.interceptors.request.use(function (config) {
  let user = store.state.user || null;
  if (user) {
    //如果是登录了，就填充登录token
    config.headers.common.Authorization = user.jwtToken;
  }

  //是否显示加载框 （默认显示）
  config.data.showLoading && (toast = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: "加载中..."
  }))
  // 在发送请求之前做些什么
  console.log('请求参数：', config.data);
  config.data.check_request = {
    timestamps: "20210223",
    sign: "xxxxxxx"
  }
  config.data.body = { ...config.data }
  return config;
}, function (error) {
  closeToast();
  // 对请求错误做些什么
  return Promise.reject(error);
});

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return new Promise((resolve, reject) => {
    console.log('响应数据：', response.data);
    closeToast();
    if (!response) {
      reject(new Error('this request is failed'))
    } else if (response.status === 404) {
      reject(new Error('this request is not found'))
    } else {
      resolve(response.data)
    }
  })
}, function (error) {
  closeToast();
  Toast('服务器异常，请稍后再试');
  console.log('响应数据：', error);
  // 对响应错误做点什么
  return Promise.reject(error);
});

/**
 * 关闭toast
 */
function closeToast() {
  if (toast != null) {
    toast.clear();
  }
}

export default axios