<template>
    <div class="record">
        <div class="header">
            <i class="iconfont btn-close" @click="hideModel()"></i>
            <div class="header-button">
                <p @click="sortBtn('income')" :class="{'selected-button': 'income' === selectSort}" style="border-radius: .2rem 0 0 .2rem;">流入</p>
                <p @click="sortBtn('expense')" :class="{'selected-button': 'expense' === selectSort}" style="border-radius: 0 .2rem .2rem 0;">流出</p>
            </div>
        </div>

        <div class="content">
            <div class="input-money" @click="showNumKeyboardMethod(true)">
                <p>账单金额</p>
                <p class="money-text">￥ {{money}}</p>
            </div>
            <div style="width: 100%; background: #f8f8f8; height: 6px;margin-top: .5rem;"></div>
        </div>

        <!-- 显示分类 -->
        <show-sort></show-sort>
        
        <div class="timeAndMark">
            <i class="iconfont btn-calendar"></i>
            <p>{{ '2月7日' }}</p>
            <input type="text" placeholder="请输入备注信息(最多50字)" @focus="inputFocus()" maxlength="50">
        </div>
        <!-- 底部按钮部分 -->
        <money-keyboard v-if="showNumKeyboard" @keyboardCallBackEvent="keyboardCallBack" :money="money"></money-keyboard>
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
    import { postRequest } from '@/api/api'
    import { Toast } from 'vant'
    export default {
        name: 'Record',
        components: {
            MoneyKeyboard,
            ShowSort,
        },
        data() {
            return {
                selectSort: 'income', //选中的类别
                money: '0',//输入的money
                showNumKeyboard: true, //默认显示数字键盘
            }
        },
        methods: {
            //底部分类按钮点击
            sortBtn(sort) {
                if("income"  === sort) {
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
            //
            showNumKeyboardMethod(value) {
                this.showNumKeyboard = value;
            }
        },
        filters: {
            rounding (value) {
            if(typeof value== "number"){
                return value.toFixed(2)
            }else{
                return value
            }
    }
}
    }
</script>
<style scoped>
    .record {
        position: absolute;
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
    .header i{
        margin-left: .2rem;
        font-size: .6rem;
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
        color: #ec6564;
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
    .timeAndMark i, .timeAndMark p, .timeAndMark input {
        padding-bottom: .2rem;
        border-bottom: 1px solid #e5e5e5;
    }
    
</style>