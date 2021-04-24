<template>
    <div class="statistics-container">
        <i class="left-icon-style" :class="'iconfont icon-'+statistics.iconName" :style="selectExpenseIncome == 'expense' ? '' : 'color: #4eab7f'"></i>
        <div class="content-area">
            <div class="progress-bar">
                <p>{{statistics.classifyName}} {{(parseFloat(statistics.proportion) * 100).toFixed(0)}}%</p>
                <div class="progress-box">
                    <div class="progress-box1"
                        :style="'flex: ' + (parseFloat(statistics.proportion) * 100).toFixed(0) + ';background: ' + statColor">
                    </div>
                    <div class="progress-box2"
                        :style="'flex: calc(100 - ' + (parseFloat(statistics.proportion) * 100).toFixed(0) + ')'"></div>
                </div>
            </div>
            <div class="bill-content">
                <p class="money" :style="selectExpenseIncome == 'expense' ? '' : 'color: #4eab7f'">￥{{statistics.money}}</p>
                <p class="per">{{statistics.recordCount}} 笔</p>
            </div>
            <i class="iconfont btn-right"></i>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'StatisticsItem',
        props: {
            statistics: {
                type: Object,
                default: () => ({})
            },
            statColor: {
                type: String,
                default: () => '#F9891E'
            },
            selectExpenseIncome: {
                type: String,
                default: () => ("expense")
            }
        },
        data() {
            return {

            };
        },
    }
</script>
<style scoped>
    .statistics-container {
        display: flex;
        align-items: center;
        padding: 0 .3rem;
        margin-top: .4rem;
    }

    .statistics-container .left-icon-style {
        font-size: .8rem;
        padding-right: .2rem;
        color: #ed7c71;
    }

    .content-area {
        display: flex;
        flex: 1;
        align-items: center;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e5e5e5;
    }

    .progress-bar {
        flex: 1;
        font-size: .4rem;
    }

    .progress-box {
        display: flex;
        flex: 1;
        height: .2rem;
        margin-right: .3rem;
        margin-top: .1rem;
    }

    .progress-box1 {
        flex: 64%;
        background: rgb(16, 84, 173);
        border-top-left-radius: 2em;
        border-bottom-left-radius: 2em;
    }

    .progress-box2 {
        flex: calc(100% - 64%);
        background: #f4f4f4;
        border-top-right-radius: 2em;
        border-bottom-right-radius: 2em;
    }

    .bill-content {
        display: flex;
        flex-direction: column;
        font-size: .35rem;
    }

    .bill-content .money {
        color: #ec6564;
    }

    .bill-content .per {
        color: #8c8f97;
        font-size: .33rem;
        margin-top: 2px;
        text-align: right;
    }

    .content-area i {
        padding-left: .3rem;
        font-size: .45rem;
        color: #999999;
    }
</style>