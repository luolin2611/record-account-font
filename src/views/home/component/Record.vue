<template>
    <div class="record">
        <div class="header">
            <i class="iconfont btn-close" @click="hideModel()"></i>
            <div class="header-button">
                <p @click="sortBtn('income')" :class="{'selected-button': 'income' === selectSort}"
                    style="border-radius: .2rem 0 0 .2rem;">流出</p>
                <p @click="sortBtn('expense')" :class="{'selected-button': 'expense' === selectSort}"
                    style="border-radius: 0 .2rem .2rem 0;">流入</p>
            </div>
        </div>

        <div class="content">
            <div class="input-money" @click="showNumKeyboardMethod(true)">
                <p>账单金额</p>
                <p class="money-text" :style="selectSort == 'income' ? 'color:#ed7773' : 'color:#4eab7f' ">￥ {{money}}
                </p>
            </div>
            <div style="width: 100%; background: #f8f8f8; height: 6px;margin-top: .5rem;"></div>
        </div>

        <!-- 显示分类 -->
        <show-sort :selectSort="selectSort" @showSortSelectClassifyCallBack="selectClassifyMethod"></show-sort>

        <div class="timeAndMark">
            <i class="iconfont btn-calendar"></i>
            <p @click="chooseDate">{{showSelectDate}}</p>
            <input type="text" placeholder="请输入备注信息(最多50字)" @focus="inputFocus()" maxlength="50" v-model="remark">
        </div>
        <!-- 键盘按钮部分 -->
        <money-keyboard v-if="showNumKeyboard" @keyboardCallBackEvent="keyboardCallBack"
            @keyboardHideEvent="showNumKeyboard = false" :money="money" />
        <!-- 底部按钮部分 -->
        <div class="bottom-btns" v-if="!showNumKeyboard">
            <p class="record-again-btn" @click="recordAcctBtn('again')">再记一笔</p>
            <p class="save-btn" @click="recordAcctBtn('save')">保存</p>
        </div>


        <van-calendar v-model="showDate" @confirm="confirmDate" :min-date="minDate" :max-date="maxDate"
            :color="selectSort == 'income' ? '#ed7773' : '#4eab7f'" />

    </div>
</template>
<script>
    /**
     * 记账弹出框
     * @author rollin
     * @date 2021-02-06 10:10:36
    */
    import MoneyKeyboard from '@/components/MoneyKeyboard.vue'
    import ShowSort from './ShowSort.vue'
    import { mapGetters } from 'vuex'
    import { querySysTime, addRecordAcct } from '@/api/api'
    import { Toast, Calendar } from 'vant'
    export default {
        name: 'Record',
        components: {
            MoneyKeyboard,
            ShowSort,
            VanCalendar: Calendar,
        },
        data() {
            return {
                selectSort: 'income', //选中的类别
                money: '0',//输入的money
                remark: '',//输入备注
                showNumKeyboard: true, //默认显示数字键盘
                showDate: false, //显示选择日期
                minDate: new Date(),
                maxDate: new Date(),
                serverDate: {},//存放系统时间
                showSelectDate: '', //存放显示时间字符串  ‘今天’、‘3月18’
                selectDateObj: new Date(),//选择时间对象
                selectClassify: {},
            }
        },
        methods: {
            //底部分类按钮点击
            sortBtn(sort) {
                if ("income" === sort) {
                    this.selectSort = 'income';
                } else {
                    this.selectSort = 'expense';
                }
            },
            //关闭model
            hideModel() {
                this.$emit('closeModel', false);
            },
            //接受键盘传入的值
            keyboardCallBack(value) {
                this.money = value;
            },
            //输入备注框获取焦点
            inputFocus() {
                //输入框获取焦点 关闭自定义的数字键盘 
                this.showNumKeyboardMethod(false);
            },
            //关闭数字键盘方法
            showNumKeyboardMethod(value) {
                this.showNumKeyboard = value;
            },
            /**
             * 选择classify
             */
            selectClassifyMethod(classify) {
                this.selectClassify = classify;
            },
            //选择日期
            chooseDate() {
                this.showDate = !this.showDate;
            },
            /**
             * 确定日期
             */
            confirmDate(date) {
                // 将当前的时分秒赋值给选择的时间的时分秒
                var currentDate = new Date();
                date.setHours(currentDate.getHours());
                date.setMinutes(currentDate.getMinutes());
                date.setSeconds(currentDate.getSeconds());
                this.selectDateObj = date;
                if (date.getFullYear() == this.serverDate.year) {
                    if (
                        ((date.getMonth() + 1) == this.serverDate.month) &&
                        (date.getDate() == this.serverDate.day)) {
                        this.showSelectDate = '今天';
                    } else {
                        //当年 3月18日
                        this.showSelectDate = `${date.getMonth() + 1}月${date.getDate()}日`;
                    }
                } else {
                    //非当年 2020年3月18日
                    this.showSelectDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                }
                this.showDate = false;
            },
            /**
             * 获取服务器时间
             */
            querySysTime() {
                querySysTime({
                    getCache: false,
                    setCache: true
                }).then(res => {
                    if (res) {
                        if (res.code == '0000') {
                            let body = res.body;
                            this.serverDate = body;
                            this.maxDate = new Date(body.date);
                            //指定可以修改的时间为半年
                            this.minDate = new Date(body.date - 365 / 2 * 24 * 60 * 60 * 1000);
                            this.showSelectDate = `今天`;
                        } else {
                            Toast(res.msg);
                        }
                    }
                });
            },

            /**
             * again - 再记一笔
             * save - 保存
             */
            recordAcctBtn(type) {
                let user = this.getUser || null;
                if (!user) {
                    Toast('请先登录');
                    return
                }
                if (this.money == '0' || this.money == 0) {
                    Toast('请输入金额');
                    return;
                }
                addRecordAcct({
                    classifyId: this.selectClassify.classifyId,
                    billMoney: this.money,
                    classifyName: this.selectClassify.classifyName,
                    classifyType: this.selectClassify.type,
                    userId: user.userId,
                    remark: this.remark,
                    getCache: false,
                    setCache: false,
                    showLoading: true,
                    recordTimeStr: this.$moment(this.selectDateObj).format('YYYYMMDDHHmmss')
                }).then(res => {
                    if (res.code == '0000') {
                        //记账成功
                        // 1.恢复输入内容
                        this.money = '0';
                        this.remark = '';
                        // 2.更改更新内容项： homeInitInfo，queryBillInfo
                        let updateObj = JSON.parse(localStorage.getItem("updateObj")) || {};
                        updateObj.homeInitInfo = true;
                        updateObj.queryBillInfo = true;
                        localStorage.setItem("updateObj", JSON.stringify(updateObj));
                        if ('save' == type) {
                            //关闭model
                            this.hideModel();
                        }
                    } else {
                        Toast(res.msg);
                    }
                });
            },
        },
        filters: {
            rounding(value) {
                if (typeof value == "number") {
                    return value.toFixed(2)
                } else {
                    return value
                }
            }
        },
        computed: {
            ...mapGetters(['getUser']),
        },
        created() {
            this.querySysTime();
        },
    }
</script>
<style scoped>
    .record {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 2;
    }

    .header {
        display: flex;
        margin-top: .4rem;
        align-items: center;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e5e5e5;
    }

    .header i {
        margin-left: .2rem;
        font-size: .4rem;
        padding: 0 .2rem;
    }

    .header-button {
        display: flex;
        font-size: .45rem;
        flex: 1;
        justify-content: center;
    }

    .header-button p {
        border: 1px solid #3f4659;
        width: 3rem;
        text-align: center;
        line-height: .8rem;
        border-radius: .2rem;
    }

    .selected-button {
        background: #3f4659;
        color: #fff;
    }

    .input-money {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .45rem;
        margin-top: .5rem;
        padding: 0 .5rem;
    }

    .money-text {
        color: #ed7773;
        font-size: .6rem;
        font-weight: 800;
    }

    .timeAndMark {
        display: flex;
        height: .9rem;
        align-items: flex-end;
        font-size: .4rem;
        margin: 0 .3rem;
    }

    .timeAndMark i {
        color: #8c8f97;
        padding-right: .3rem;
    }

    .timeAndMark input {
        margin-left: .4rem;
        border: none;
        outline: none;
        font-size: .4rem;
        flex: 1;
        margin-right: .4rem;
    }

    .timeAndMark i,
    .timeAndMark p,
    .timeAndMark input {
        padding-bottom: .2rem;
        border-bottom: 1px solid #e5e5e5;
    }

    .bottom-btns {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        padding: 0 .3rem;
        padding-bottom: 1rem;
        font-size: .4rem;
    }

    .record-again-btn {
        flex: 1;
        text-align: center;
        line-height: 1rem;
        border: 1px solid #ed7773;
        color: #ed7773;
        margin-right: .15rem;
    }

    .save-btn {
        flex: 1;
        text-align: center;
        line-height: 1rem;
        background: #ed7773;
        color: #fff;
        margin-left: .15rem;
    }
</style>