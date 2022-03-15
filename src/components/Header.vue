<!-- 账单 和 报表 的标题部分 -->
<!-- @author rollin -->
<!-- @date 2021-02-08 14:31:12 -->
<template>
    <div class="bill-header">
        <p class="title">{{title}}</p>
        <!-- 1.选择条件 -->
        <div class="conditions">
            <!-- 左侧时间选择 -->
            <div class="time" v-if="selectSortBtn == 0" @click="showTimePicker">
                <p class="year">{{currentYear}}年</p>
                <i class="iconfont arrows-down"></i>
                <div class="split-line"></div>
                <p>{{currentMonth}} 月</p>
            </div>
            <div class="time" v-if="selectSortBtn == 1" @click="showTimePicker">
                <p>{{currentYear}}年</p>
                <i class="iconfont arrows-down"></i>
            </div>
            <!-- 右侧筛选按钮 -->
            <div class="screening">
                <p>|</p>
                <p class="filter-text">筛选</p>
                <i class="iconfont filter"></i>
            </div>
        </div>
        <!-- 2.弹出框显示内容 -->
        <div class="select-model" v-if="isShowTimePicker">
            <div class="buttons">
                <p @click="sortBtn(0)" style="border-radius: .2rem 0 0 .2rem;"
                    :class="{'selected-button': selectSortBtn == 0}">月账单</p>
                <p @click="sortBtn(1)" style="border-left: 0px; border-right: 0px;"
                    :class="{'selected-button': selectSortBtn == 1}">年账单</p>
                <p @click="sortBtn(2)" style="border-radius: 0 .2rem .2rem 0;"
                    :class="{'selected-button': selectSortBtn == 2}">自定义</p>
            </div>
            <div class="show-date-area">
                <i v-show="selectSortBtn == '1'" class="iconfont btn-back"></i>
                <div class="date-list-area">
                    <!-- 显示月账单选项 -->
                    <template v-if="selectSortBtn == '0'">
                        <div class="month-area" v-for="(item, index) in dataArr" :key="index"
                            @click="selectDateBtn(item, 'month')">
                            <p :style="(serveDate.month >= item && item != currentMonth) ? 'color: #000' : ''"
                                :class="item == currentMonth ? 'month-day-p-seleced' : ''">
                                {{item}}
                            </p>
                        </div>
                    </template>
                    <!-- 显示年账单选项 -->
                    <template v-if="selectSortBtn == '1'">
                        <div class="year-area" v-for="(item, index) in dataArr" :key="index"
                            @click="selectDateBtn(item, 'year')"
                            :style="item == currentYear ? 'background: #2f2f5b;color: #fff; border-radius: .2rem;':''">
                            <p>
                                {{item}}
                            </p>
                        </div>
                    </template>
                </div>
                <i v-show="selectSortBtn == '1'" class="iconfont btn-right"></i>
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
                type: String,
                default: '标题'
            },
            serveDate: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                isShowTimePicker: false,
                selectSortBtn: 0,//选中的button 0-月账单,1-年账单,2-自定义
                monthArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],//十二个月数字
                yearArr: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032],
                currentMonth: 0,//当前选中的月份
                monthSelectYear: 0, //当前选中月份所在的年份当中
                currentYear: 0, //用户选择的当前年
            }
        },
        methods: {
            showTimePicker() {
                this.isShowTimePicker = !this.isShowTimePicker;
            },
            //选择顶部类型的菜单按钮：月账单 年账单 自定义
            sortBtn(value) {
                if (this.selectSortBtn == value) {
                    return;
                }
                this.selectSortBtn = value;
                if (value == 0) {
                    // 通知父组件变更为月账单
                    this.$emit('chileToParentSelectDate', {
                        type: 'month',
                        month: this.currentMonth,
                        year: this.monthSelectYear
                    });
                }
                if (value == 1) {
                    // 通知父组件变更为年账单
                    this.$emit('chileToParentSelectDate', {
                        type: 'year',
                        year: this.currentYear,
                    });
                }
                if (value == 2) {

                }
            },

            /**
             * 选择每个日期子元素
             */
            selectDateBtn(value, type) {
                //选择月的按钮
                if (type == 'month' && value <= this.serveDate.month) {
                    //点击当前选择的月份，使其失效
                    if (this.currentMonth == value) {
                        return;
                    }
                    this.currentMonth = value;
                    //通知父组件类型及时间更改
                    this.$emit('chileToParentSelectDate', {
                        type: 'month',
                        month: this.currentMonth,
                        year: this.monthSelectYear
                    });
                }
                //选择年的按钮
                if (type == 'year') {
                    //点击当前选择的年份，使其失效
                    if (this.currentYear == value) {
                        return;
                    }
                    this.currentYear = value;
                    //通知父组件类型及时间更改
                    this.$emit('chileToParentSelectDate', {
                        type: 'year',
                        year: value,
                    });
                }
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
        },
        watch: {
            //第一次进入的时候触发 -- 监听服务端返回最新的时间
            serveDate(newVal, oldVal) {
                //初始化选择月部分的账单
                this.currentMonth = newVal.month;
                this.monthSelectYear = newVal.year;
                //初始化年部分的账单
                this.currentYear = newVal.year;
            }
        },
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
        width: 100%;
        height: 4.3rem;
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

    .date-list-area {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        justify-content: center;
    }

    .date-list-area .month-area {
        flex: 1 1 calc(1 / 6 * 100%);
        display: flex;
        justify-content: center;
        margin-top: .5rem;
        font-size: .4rem;
        color: #ccc;
    }

    .date-list-area .month-area p {
        display: inline-block;
        border-radius: 50%;
        width: .6rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
    }

    .month-day-p-seleced {
        background: #2f2f5b;
        color: #fff;
    }

    .date-list-area .year-area {
        flex: 1 1 calc(1 / 6 * 100%);
        display: flex;
        justify-content: center;
        margin-top: .4rem;
        font-size: .4rem;
        color: #000;
    }

    .date-list-area .year-area p {
        display: inline-block;
        height: .7rem;
        line-height: .7rem;
        text-align: center;
    }

    .year-p-seleced {
        color: #fff;
    }


    .conditions .screening {
        display: flex;
        font-size: .45rem;
        align-items: center;
    }

    .conditions .screening .iconfont {
        font-size: .4rem;
    }

    .conditions .screening .filter-text {
        padding: 0 .15rem;
    }
</style>