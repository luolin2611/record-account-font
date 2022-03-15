<template>
    <div class="login-container">
        <div class="title-area">
            <div>
                <img src="@/assets/img/ic_launcher.png" />
                <p class="title">网易·有钱</p>
                <p class="subtitle">专业记账管钱软件</p>
            </div>
        </div>

        <div class="input-area">
            <div>
                <i class="iconfont icon-user"></i>
                <input type="text" placeholder="请输入用户名/手机号/邮箱" maxlength="30" v-model="account" />
            </div>
            <div>
                <i class="iconfont icon-password"></i>
                <input type="password" placeholder="请输入密码" maxlength="18" v-model="password" />
            </div>
        </div>

        <div class="login-btn">
            <p @click="login">登录</p>
        </div>

        <div class="other-btn">
            <p @click="() => {$router.push('/register')}">注册有钱</p>
            <span></span>
            <p @click="showAlert('如果忘记密码，可以联系开发者重置密码，开发人员微信：luolin2611；该功能以后会完善。')">忘记密码</p>
        </div>
    </div>
</template>
<script>
    import { login } from '@/api/api';
    import { Toast, Dialog } from 'vant';
    import { mapMutations } from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                account: 'rollin',
                password: '123456'
            }
        },
        methods: {
            //set store方法放在methods方法
            ...mapMutations(['setUser']),
            // async await 没有监听异常，所以此处需要捕获异常的话可以使用try-catach
            login() {
                // async login() {
                // 1.校验登录
                if (!this.checkInputFiled()) {
                    return;
                }
                // 2.请求处理
                login({
                    account: this.account,
                    password: this.password,
                    showLoading: true
                }).then(res => {
                    //3.错误介绍
                    if (res) {
                        if (res.code == '0000') {
                            //登录成功
                            this.setUser(res.body);
                            localStorage.setItem("updateObj", '{}');

                            // let cc = {};

                            // for (const key in object) {
                            //     if (Object.hasOwnProperty.call(object, key)) {
                            //         const element = object[key];
                            //         bb[key] = false;
                            //     }
                            // };



                            this.$router.push('/my');
                        } else {
                            Toast(res.msg);
                        }
                    }
                });

                // 2.请求处理
                // const res = await login({
                //     "account": this.account,
                //     "password": this.password
                // });

                // //3.错误介绍
                // if (res) {
                //     if (res.code == '0000') {
                //         //登录成功
                //         this.setUser(res.body);
                //         this.$router.push('/my');
                //     } else {
                //         Toast(res.msg);
                //     }
                // }
            },

            checkInputFiled() {
                if (this.account == '') {
                    this.showAlert('请输入用户名');
                    return false;
                }
                if (this.password == '') {
                    this.showAlert('请输入密码');
                    return false;
                }
                return true;
            },

            showAlert(msg) {
                Dialog.alert({
                    message: msg,
                }).then(() => {
                    // on close
                });
            },
        }
    }
</script>
<style scoped>
    .title-area {
        display: flex;
        justify-content: center;
    }

    .title-area div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .5rem;
    }

    .title-area img {
        width: 2.2rem;
        height: 2.2rem;
        margin: .5rem;
        border-radius: 20%;
    }

    .title-area .title {
        font-size: .45rem;
    }

    .title-area .subtitle {
        font-size: .3rem;
    }

    .input-area {
        margin-top: 1rem;
    }

    .input-area div {
        display: flex;
        align-items: center;
        margin: .4rem .3rem;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e5e5e5;
        color: #999999;
        font-size: .45rem;
    }

    .input-area div input {
        display: flex;
        flex: 1;
        border: none;
        outline: none;
        padding-left: .4rem;
        color: #000000;
    }

    .login-btn {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 1rem;
    }

    .login-btn p {
        width: 90%;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: .4rem;
        text-align: center;
        color: #fff;
        background: #ec6564;
    }

    .other-btn {
        display: flex;
        justify-content: center;
        font-size: .45rem;
        color: #8c8f97;
        margin-top: .6rem;
    }

    .other-btn span {
        background: #e5e5e5;
        width: 1px;
        height: .5rem;
        margin: 0 .8rem;
    }
</style>