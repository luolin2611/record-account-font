<template>
    <div class="register">
        <div class="input-area">
            <div>
                <p>用户名：</p>
                <input type="text" placeholder="请输入用户名" maxlength="20" v-model="userName">
            </div>
            <div>
                <p>手机号：</p>
                <input type="number" placeholder="请输入手机号" maxlength="11" v-model="mobile">
            </div>
            <div>
                <p>邮箱：</p>
                <input type="email" placeholder="请输入邮箱" maxlength="30" v-model="email">
            </div>
            <div>
                <p>昵称：</p>
                <input type="text" placeholder="请输入用户昵称" maxlength="10" v-model="realName">
            </div>
            <div>
                <p>个人说明：</p>
                <input type="text" placeholder="写给自己的话" maxlength="50" v-model="personalResume">
            </div>
            <div>
                <p>密码：</p>
                <input type="password" placeholder="请输入密码" maxlength="18" v-model="password">
            </div>
            <div>
                <p>确认密码：</p>
                <input type="password" placeholder="再次输入密码" maxlength="18" v-model="repassword">
            </div>
        </div>
        <div class="commit-btn">
            <p @click="register">立即注册</p>
        </div>
    </div>
</template>
<script>
    import { postRequest } from '@/api/api';
    import { Calendar, Cell } from 'vant';
    import { Toast, Dialog } from 'vant';
    export default {
        name: 'Register',
        components: {
            vanCalendar: Calendar,
            vanCell: Cell,
        },
        data() {
            return {
                userName: '',
                mobile: '',
                email: '',
                realName: '',
                personalResume: '',
                password: '',
                repassword: '',
                date: '',
                show: false
            }
        },
        methods: {
            async register() {
                // 1.校验登录
                if (!this.checkInputFiled()) {
                    return;
                }
                // 2.请求处理
                const res = await postRequest({
                    url: '/user/register',
                    param: {
                        "userName": this.userName,
                        "mobile": this.mobile,
                        "email": this.email,
                        "realName": this.realName,
                        "personalResume": this.personalResume,
                        "password": this.password
                    }
                })
                // 3.错误介绍
                if (res) {
                    if (res.code == '0000') {
                        //登录成功
                        Toast('注册成功');
                        this.$router.push('/login')
                    } else {
                        Toast(res.msg);
                    }
                }
            },
            /**
             * 检查输入框内容是否为空 
             */
            checkInputFiled() {
                if (this.userName == '') {
                    this.showAlert('请输入用户名');
                    return false;
                }
                if (this.mobile == '') {
                    this.showAlert('请输入手机号');
                    return false;
                }
                if (this.email == '') {
                    this.showAlert('请输入邮箱');
                    return false;
                }
                if (this.realName == '') {
                    this.showAlert('请输入昵称');
                    return false;
                }
                if (this.personalResume == '') {
                    this.showAlert('请输入个人说明');
                    return false;
                }
                if (this.password == '') {
                    this.showAlert('请输入密码');
                    return false;
                }
                if (this.repassword == '') {
                    this.showAlert('请再次输入密码');
                    return false;
                }
                if (this.password != this.repassword) {
                    this.showAlert('两次密码不一致');
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
    .input-area {
        margin-top: 1rem;
    }

    .input-area div {
        padding: .3rem;
        font-size: .45rem;
    }

    .input-area div input {
        border: none;
        outline: none;
        color: #000000;
        padding-left: .2rem;
        margin-top: .2rem;
        padding-bottom: .15rem;
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
    }

    .commit-btn {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 1rem;
        padding-bottom: 3rem;
    }

    .commit-btn p {
        width: 90%;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: .4rem;
        text-align: center;
        color: #fff;
        background: #ec6564;
    }
</style>