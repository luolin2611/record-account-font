<!--
 * @descritption: 列表详情
 * @author: rollin
 * @date: 2021-04-25 14:10:37
-->
<template>
    <div>
        <!-- 1.头部返回按钮 -->
        <header-back :title="headeTitle"></header-back>

        <!-- 2.中间按钮  -->
        <div class="header-button">
            <p @click="chooseSort('money')" :class="{'selected-button': 'money' === selectSort}"
                style="border-radius: .2rem 0 0 .2rem;">按金额</p>
            <p @click="chooseSort('time')" :class="{'selected-button': 'time' === selectSort}"
                style="border-radius: 0 .2rem .2rem 0;">按时间</p>
        </div>

        <!-- 3.内容显示区域 -->
        <div class="content-area">
            <div class="record-item" v-for="(item, index) in dayRecordAccountObjectList" :key="index">
                <i :class="'iconfont icon-' + item.icon.iconName"></i>
                <div class="content">
                    <div>
                        <p style="font-size: .4rem;color: #2c3040;">{{item.classifyName}}</p>
                        <p>{{item.recordTime | formatDate(item.remark)}}</p>
                    </div>
                    <p class="money">￥ {{item.billMoney}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Format } from '@/utils/Utils';
    import HeaderBack from '@/components/HeaderBack.vue';
    import { queryReportDetailsList } from '@/api/api'
    export default {
        name: 'ReportItemDetails',
        components: {
            HeaderBack,
        },
        data() {
            return {
                selectSort: 'money',//默认按照金额排序
                dayRecordAccountObjectList: [], //存放返回的List
            }
        },
        filters: {
            formatDate(timeStr, remark) {
                return Format(timeStr, 'MM月dd日 ' + remark);
            }
        },
        created() {
            this.queryReportDetailsList();
        },
        methods: {
            chooseSort(type) {
                if(this.selectSort == type) {
                    return;
                }
                this.selectSort = type;
                this.queryReportDetailsList();
            },

            /**
             * 请求详情列表
             */
            queryReportDetailsList() {
                let param = this.$route.query.param;
                queryReportDetailsList({
                    userId: param.userId,
                    type: param.type,
                    reportType: param.reportType,
                    year: param.year,
                    month: param.month, //eg: 202103
                    classifyId: param.classifyId,
                    orderByType: this.selectSort
                }).then(res => {
                    if (res) {
                        if (res.code == '0000') {
                            let body = res.body || {};
                            this.dayRecordAccountObjectList = body.dayRecordAccountObjects;
                        } else {
                            Toast(res.msg);
                        }
                    }
                });
            }
        },
        computed: {
            headeTitle() {
                return this.$route.query.classifyName + ' (' + this.$route.query.recordCount + '笔) ';
            },
        },

    }
</script>
<style scoped>
    .header-button {
        display: flex;
        font-size: .4rem;
        flex: 1;
        justify-content: center;
    }

    .header-button p {
        border: 1px solid #3f4659;
        width: 4rem;
        text-align: center;
        line-height: .8rem;
        border-radius: .2rem;
    }

    .selected-button {
        background: #3f4659;
        color: #fff;
    }

    .content-area {
        color: #8c8f97;
        font-size: .35rem;
        overflow: hidden;
        margin-top: .3rem;
        padding-left: .5rem;
        padding-right: .5rem;
    }

    .record-item {
        display: flex;
        margin-top: .3rem;
        align-items: center;
    }

    .record-item i {
        color: #ed7c71;
        font-size: .8rem;
        padding-bottom: .2rem;
    }

    .content {
        display: flex;
        flex: 1;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e5e5e5;
    }

    .content div {
        padding-left: .2rem;
        display: flex;
        flex: 1;
        flex-direction: column;
        line-height: .6rem;
    }

    .content .money {
        padding-top: .2rem;
        padding-right: .2rem;
        font-size: .4rem;
        color: #ec6564;
        font-weight: 700;
    }
</style>