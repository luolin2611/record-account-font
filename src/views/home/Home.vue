<template>
    <div id="main">
        <!-- 账户信息部分 -->
        <acct-info :monthInTotal="monthInTotal" :monthOutTotal="monthOutTotal"></acct-info>
        <!-- 按钮 -->
        <div class="record-button" @click="goRecord()">
            <i class="iconfont btn-edit"></i>
            <p>记一笔</p>
        </div>
        <!-- 近三日新增账单 -->
        <div class="rechent-add">
            <div class="title">
                <p>近三日新增账单</p>
                <p class="per">{{billNum}} 笔</p>
            </div>
            <div v-if="recordDayItems.length" style="margin-top: .3rem; margin-left: .3rem;padding-bottom: 3rem;">
                <record-day-item v-for="(item, index) in recordDayItems" :key="index" :dayItem="item"></record-day-item>
            </div>
            <div class="no-date" v-else>
                <i class="iconfont bill"></i>
                <p>记录账单&nbsp;&nbsp;记录生活</p>
            </div>
        </div>
        <tab-bar :selectIndex="0"></tab-bar>
        <record v-if="showModel" @closeModel="hideModel"></record>
    </div>
</template>
<script>
    import AcctInfo from './component/AcctInfo.vue'
    import RecordDayItem from '@/components/RecordDayItem.vue'
    import TabBar from '@/components/TabBar.vue'
    import Record from './component/Record.vue'
    import { mapGetters } from 'vuex'
    import { homeInitInfo } from '@/api/api'
    import { Toast } from 'vant'

    export default {
        name: 'Home',
        components: {
            AcctInfo,
            RecordDayItem,
            Record,
            TabBar,
        },
        data() {
            return {
                showModel: false, // 显示记账框
                monthInTotal: '暂无收入',  // 收入
                monthOutTotal: '暂无支出', // 支出
                billNum: 0,
                recordDayItems: [],
            }
        },
        methods: {
            goRecord() {
                this.showModel = !this.showModel;
            },
            hideModel() {
                // 1.关闭model
                this.showModel = false;
                // 2.重新请求更新数据
                this.homeInitInfo();
            },
            showRecent() {
                this.$router.push('/home/show-recent');
            },

            /**
             * 获取首页的信息
             */
            homeInitInfo() {
                let user = this.getUser || null;
                if (user) {
                    // 用户已经登录，查询首页信息
                    homeInitInfo({
                        userId: user.userId,
                    }).then(res => {
                        if (res) {
                            if (res.code == '0000') {
                                let body = res.body;
                                this.monthInTotal = body.monthInTotal + "";
                                this.monthOutTotal = body.monthOutTotal + "";
                                this.recordDayItems = body.threedayRecordAccount;
                                this.billNum = body.billNum;
                            } else {
                                Toast(res.msg);
                            }
                        }
                    });
                }
            }

        },
        created() {
            this.homeInitInfo();
        },
        computed: {
            ...mapGetters(['getUser']),
        }
    }
</script>
<style scoped>
    #main {
        background: #ffffff;
    }

    .record-button {
        display: flex;
        justify-content: center;
        text-align: center;
        line-height: 1.2rem;
        margin: .5rem;
        background-image: linear-gradient(to right, #eb5f74, #eb6060);
        height: 1.2rem;
        border-radius: .15rem;
        color: #ffffff;
        font-size: .5rem;
    }

    .record-button p:active,
    .record-button i:active {
        background-image: none;
        opacity: .5;
    }

    .record-button i {
        padding-right: 3px;
        font-size: .4rem;
    }

    .rechent-add .title {
        display: flex;
        padding-left: .3rem;
        font-size: .45rem;
    }

    .title .per {
        color: #aeb1b6;
        padding-left: .4rem;
    }

    .no-date {
        display: flex;
        margin: .2rem;
        margin-top: .8rem;
        font-size: .45rem;
        color: #8c8f97;
        line-height: 1rem;
        text-align: center;
        justify-content: center;
    }

    .no-date i {
        font-size: .6rem;
        padding-right: .1rem;
    }
</style>