<template>
    <div class="record-day-item">
        <div>
            <p>{{dayItem.dateStr}}</p>
        </div>
        <div class="record-item" v-for="(item, index) in dayItem.dayRecordAccountObjects" :key="index">
            <i class="iconfont icon-fork"></i>
            <div class="content">
                <div>
                    <p style="font-size: .4rem;color: #2c3040;">{{item.classifyName}}</p>
                    <p>{{item.remark}}</p>
                </div>
                <p class="money">￥{{item.billMoney}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'RecordDayItem',
        props: {
            dayItem: {
                type: Object,
                default: () => ({})
            }
        },
    }
</script>
<style scoped>
    .record-day-item {
        color: #8c8f97;
        font-size: .35rem;
        overflow: hidden;
        margin-top: .3rem;
    }
    .record-item {
        display: flex;
        margin-top: .3rem;
        align-items: center;
    }
    .record-item i {
        color: #ed7c71;
        font-size: .8rem;
    }
    .content {
        margin-right: .6rem;
        display: flex;
        flex: 1;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e5e5e5;
    }
    .content div{
        padding-left: .2rem;
        display: flex;
        flex: 1;
        flex-direction: column;
        line-height: .6rem;
    }
    .content .money {
        font-size: .4rem;
        color: #ec6564;
        font-weight: 700;
    }
    
</style>