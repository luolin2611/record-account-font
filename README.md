# record-account

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 使用插件
https://github.com/surmon-china/vue-awesome-swiper

### 遇到问题
1.在首页的时候，跳转到其它界面，首页父组件内容报错，因为先销毁子组件，再销毁父组件。

2.处理精度问题：
    res = (parseFloat(moneyArr[0]) * 10000 + parseFloat(moneyArr[1]) * 10000) / 10000;

3.输入框圆角问题，在全局样式rest.css 中 input下输入border-radius



### 框架说明
1.缓存数据策略： 请求数据时，会根据传入的三个参数（getCache，setCache，showLoading）进行判断相应的缓存策略；
    1.1 getCache 类型：boolean  说明：默认为true,从缓存中获取。
    1.2 setCache 类型：boolean  说明：默认为true,存储到缓存中。
    1.3 showLoading 类型：boolean  说明：默认为false,为true时显示加载框。
    1.5 localStorageId 类型：string  说明：如果传入则以该字符串作为缓存内容的key，否则为请求方法为key。

2.在登录的时候存储一个是否需要更新接口的标志(updateObj)，默认为{}, 如果为true时，此时访问的接口就需要为重新更新数据。
    2.1 如何请求服务时，调用set时，自动添加当前的 {localStorageId: false},表示当前key可以不需要重新加载数据了。
    2.2 当重新登录后需要重置该对象为{}
    2.3 当记账后成功后，还对象也会被重置。
    2.4 localStorageId除了为false的情况，其它情况均需要重新加载数据。