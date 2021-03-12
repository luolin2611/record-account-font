<!-- 账单 和 报表 的标题部分 -->
<!-- @author rollin -->
<!-- @date 2021-02-08 14:31:12 -->
<template>
    <div class="bill-header">
        <p class="title">{{title}}</p>
        <div class="conditions">
            <div class="time">
                <p class="year" @click="showTimePicker">2021年</p>
                <i class="iconfont arrows-down"></i>
                <div class="split-line"></div>
                <p>{{currentMonth}} 月</p>
            </div>
            <div class="screening">
                <p>|</p>
                <p class="filter-text">筛选</p>
                <i class="iconfont filter"></i>
            </div>
        </div>
        <div class="select-model" v-if="isShowTimePicker">
            <div class="buttons">
                <p @click="sortBtn(0)" style="border-radius: .2rem 0 0 .2rem;" :class="{'selected-button': selectSortBtn == 0}">月账单</p>
                <p @click="sortBtn(1)" style="border-left: 0px; border-right: 0px;" :class="{'selected-button': selectSortBtn == 1}">年账单</p>
                <p @click="sortBtn(2)" style="border-radius: 0 .2rem .2rem 0;" :class="{'selected-button': selectSortBtn == 2}">自定义</p>
            </div>
            <div class="show-date-area">
                <i class="iconfont btn-back"></i>
                <div class="month-day">
                    <div v-for="(item, index) in dataArr" :key="index" @click="selectDateBtn(item)">
                        <p :class="item == currentMonth ? 'month-day-p-seleced' : ''">
                            {{item}}
                        </p>    
                    </div>
                </div>
                <i class="iconfont btn-right"></i>
            </div>
        </div>
        <div class="mask" v-if="isShowTimePicker" @click="showTimePicker()"></div>

    </div>
</template>
<script>
    export default {
        name: 'BillHeader',
        props: {
            title: {
                typs: String,
                default: '标题'
            }
        },
        data() {
            return {
                isShowTimePicker:false,
                selectSortBtn: 0,//选中的button 0-月账单,1-年账单,2-自定义
                monthArr: [1,2,3,4,5,6,7,8,9,10,11,12],//十二个月数字
                yearArr: [2018,2019,2020,2021],
                currentMonth: 2,//当前选中的月份
            }
        },
        methods: {
            showTimePicker() {
                this.isShowTimePicker = !this.isShowTimePicker;
            },
            sortBtn(value) {
                this.selectSortBtn = value;
            },
            selectDateBtn(value) {
                this.currentMonth = value;
            }
        },
        computed: {
            dataArr() {
                let arr = [];
                if (this.selectSortBtn == 0) {
                    arr = this.monthArr;
                }
                if (this.selectSortBtn == 1) {
                    arr = this.yearArr;
                }
                return arr;
            }
        }
    }
</script>
<style scoped>
    .bill-header {
        background-image: linear-gradient(to bottom, #2f2f5b, #34375d);
        height: 3.5rem;
    }
    .bill-header .title {
        text-align: center;
        font-size: .5rem;
        color: #fff;
        padding-top: .3rem;
    }
    .conditions {
        display: flex;
        margin-top: .5rem;
        font-size: .45rem;
        color: #fff;
        padding: 0 .3rem;
    }
    .conditions .time {
        display: flex;
        align-items: center;
        flex: 1;
    }
    .time .year {
        font-weight: 600;
    }
    .time i {
        padding: 0 .1rem;
    }
    .split-line {
        height: .45rem;
        width: 1px;
        background: #fff;
        margin: 0 .2rem;
    }
    .select-model {
        background: #ffffff;
        width:100%;
        height: 5rem;
        padding: .3rem;
        margin-top: .1rem;
        position: fixed;
        z-index: 4;
    }
    .mask {
        background: rgba(0, 0, 0, .6); 
        position: fixed; 
        top: 3rem;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 3;
    }
    .buttons {
        display: flex;
        font-size: .4rem;
        flex: 1;
        justify-content: center;
    }
    .buttons p {
        border: 1px solid #3f4659;
        width: 3rem;
        text-align: center;
        line-height: .8rem;
    }
    .selected-button {
        background: #3f4659;
        color: #fff;
    }
    .show-date-area {
        display: flex;
        align-items: center;
        height: 2rem;
        margin-top: .5rem;
    }
    .month-day {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        justify-content: center;
    }
    .month-day div {
        flex: 1 1 calc(1 / 6 * 100%);
        display: flex;
        justify-content: center;
        margin-top: .5rem;
        font-size: .5rem;
        color: #ccc;
    }
    .month-day div p{
        display: inline-block;
        border-radius: 50%; 
        width: .9rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
    }
    .month-day-p-seleced {
        background: #2f2f5b;
    }


    .conditions .screening {
        display: flex;
        font-size: .45rem;
        align-items: center;
    }
    .conditions .screening .iconfont{
        font-size: .4rem;
    }
    .conditions .screening .filter-text{
        padding: 0 .15rem;
    }

</style>