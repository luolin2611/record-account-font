<!-- 首页子组件 -> 账户信息 -->
<!-- author rollin  -->
<!-- date 2021-02-06 10:11:43  -->
<template>
    <div class="main">
        <img src="../../../assets/img/R.png" />
        <p style="margin-top: 1rem;">本月支出 (元)</p>
        <div class="expense">
            <p>￥{{ showSecret ? monthOutTotal : '******'}}</p>
            <i class="iconfont" :class="eye" @click="changeShowSecret()"></i>
        </div>
        <div class="income">
            <div>
                <p>本月收入</p>
                <p class="money">{{showSecret ? monthInTotal : '******'}}</p>
            </div>
            <div>
                <p>预算剩余</p>
                <p class="money" @click="toBudget">{{showSecret ? budget : '******'}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AcctInfo',
        props: {
            monthInTotal: {
                type: String,
                default: '暂无收入'
            },
            monthOutTotal: {
                type: String,
                default: '暂无支出'
            },
            budget: {
                type: String,
                default: '暂无预算'
            }
        },
        data() {
            return {
                eye: 'eye-open',
                showSecret: true,//默认为打开
            }
        },
        methods: {
            changeShowSecret() {
                this.showSecret = !this.showSecret;
                this.eye = this.showSecret ? 'eye-open' : 'eye-close';
            },
            toBudget() {
                this.$router.push('/home/budget')
            }
        }
    }
</script>
<style scoped>
    .main {
        background: url('../../../assets/img/home_background.jpg') 100% 100% no-repeat;
        width: 100%;
        color: #ffffff;
        padding: .6rem .3rem;
        font-size: 0.4rem;
        color: #bfc0ca;
    }

    .main img {
        position: absolute;
        top: .5rem;
        right: .8rem;
        width: 20%;
    }

    .expense {
        margin-top: .45rem;
        display: flex;
        justify-content: space-between;
    }

    .expense p {
        font-size: .8rem;
        color: #fefefe;
    }

    .expense i {
        color: #bfc0ca;
        padding: 0 .1rem;
        margin-right: .2rem;
    }

    .eye-open {
        font-size: .45rem;
    }
    
    .eye-close {
        font-size: .3rem;
    }

    .income {
        margin-top: .45rem;
        display: flex;
        justify-content: space-between;
    }

    .income div {
        display: flex;
        align-items: center;
    }

    .money {
        color: #fefefe;
        font-size: .45rem;
        padding-left: .3rem;
        line-height: .5rem;
        padding-right: .5rem;
    }
</style>