<template>
    <div class="record-day-item">
        <div class="day-title-container">
            <p>{{dayItem.dateStr}}</p>
            <p>本日消费：{{dayItem.dayExpense.toFixed(2)}} 元</p>
        </div>
        <div class="record-item" v-for="(item, index) in dayItem.dayRecordAccountObjects" :key="index"
            @click="showRecordModify(item)">
            <i :class="'iconfont icon-'+item.icon.iconName" :style="item.classifyType == 1 ? 'color: #4eab7f' : ''"></i>
            <div class="content">
                <div>
                    <p style="font-size: .4rem;color: #2c3040;">{{item.classifyName}}</p>
                    <p>{{item.remark}}</p>
                </div>
                <p class="money" :style="item.classifyType == 1 ? 'color: #4eab7f' : ''">￥{{item.billMoney}}</p>
            </div>
        </div>

        <record-modify v-if="showModel" @closeModel="hideModel" :recordItem="recordItem"></record-modify>
    </div>
</template>
<script>
    import RecordModify from '@/components/RecordModify.vue';
    export default {
        name: 'RecordDayItem',
        props: {
            dayItem: {
                type: Object,
                default: () => ({})
            }
        },
        components: {
            RecordModify
        },
        data() {
            return {
                showModel: false, // 显示记账框
                recordItem: {}, // 点击需要修改的对象
            }
        },
        methods: {
            showRecordModify(item) {
                if (this.recordItem == item) {
                    return;
                }
                this.recordItem = item;
                this.showModel = !this.showModel;
            },
            hideModel() {
                // 1.关闭model
                this.showModel = false;
                // 2.重新请求更新数据
                this.homeInitInfo();
            },
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

    .day-title-container {
        display: flex;
        justify-content: space-between;
        padding-right: .3rem;
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
        margin-right: .6rem;
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
        font-size: .4rem;
        color: #ec6564;
        font-weight: 700;
    }
</style>