<template>
    <div class="keyboard">
        <div class="row1">
            <p @click="emitToParent(1)">1</p>
            <p @click="emitToParent(2)">2</p>
            <p @click="emitToParent(3)">3</p>
            <i  @click="emitToParent('del')" class="iconfont btn-huishan" style="font-size: .6rem;"></i>
        </div>
        <div class="row1">
            <p @click="emitToParent(4)">4</p>
            <p @click="emitToParent(5)">5</p>
            <p @click="emitToParent(6)">6</p>
            <p @click="emitToParent('+')">+</p>
        </div>
        <div class="row2">
            <div class="row2-item1">
                <div>
                    <p @click="emitToParent(7)">7</p>
                    <p @click="emitToParent(8)">8</p>
                    <p @click="emitToParent(9)">9</p>
                </div>
                <div>
                    <i @click="emitToParent('currency')" class="iconfont btn-renminbi" style="border-bottom: 0px;font-size: .6rem;"></i>
                    <p @click="emitToParent(0)" style="border-bottom: 0px;">0</p>
                    <p @click="emitToParent('.')" style="border-bottom: 0px;font-size: .6rem;">.</p>
                </div>
            </div>
            <div  @click="emitToParent('confirm')" class="row2-item2" :style="showEq ? 'background: #3e4552;' : ''">
                <p>{{showEq ? '=' : '确定'}}</p>
            </div>
        </div>
        
    </div>
</template>
<script>
    export default {
        name: 'MoneyKeyboard',
        props: {
            money: {
                typs: String,
                default: '0'
            }
        },
        data() {
            return {
                showEq: false, //确定和等号按钮的切换
                parentMoney: '0'
            }
        },
        methods: {
            emitToParent(value) {
                this.processInput(value);
                this.$emit('keyboardCallBackEvent', this.parentMoney);
            },
            //处理输入内容
            processInput(value) {
                if(typeof value == 'number' || '.' == value) {
                    //数字类型处理数字 和 处理 '.' 的情况
                    let money = this.parentMoney;
                    this.setInputMoney(value);
                }
                if('del' == value) {
                    //删除按钮
                    this.deleteBtn();
                }
                if('confirm' == value) {
                    //处理确定按钮
                    this.confirmBtn();
                }
                if('+' == value) {
                    //格式化money 分一个先后顺序执行
                    this.formatMoney();
                    let index = this.parentMoney.lastIndexOf('+');
                    if(index !== -1) {
                        if((index+1) != this.parentMoney.length){
                            // + 的索引不等于 总长，说明有值，则去执行加法， 之后添加 ‘+’
                            this.calculateMoeny();
                            this.parentMoney = this.parentMoney + '+';
                            //有 “+” 此时需要显示 = 号
                            this.showEq = true;
                        }
                    } else {
                        //没有 + 追加 ‘+’ 号
                        this.parentMoney = this.parentMoney + '+';
                        //有 “+” 此时需要显示 = 号
                        this.showEq = true;
                    }
                }
            },
            setInputMoney(value) {
                let money = this.parentMoney;
                let prefix = '';
                //判断是否有 ‘+’ 如果有的话此时操作的money为+后的money
                if(money.lastIndexOf('+') != -1) {
                    prefix = money.substring(0, money.lastIndexOf('+')+1);
                    money = money.substring(money.lastIndexOf('+') + 1);
                }
                const index = money.lastIndexOf('.');
                let _money = '';
                if (index === -1 && value !== '.') { // 没有 . 情况, 并且输入的是数字
                    _money = (parseFloat(money) == 0 || money == '') ? (value + '') : (money + value + '');
                } else if (index === -1 && value === '.') {// 没有 . 情况, 并且输入的是 '.'
                    _money = money == '' ? '' : (money + '.');
                } else if (index !== -1) {// 有 . 情况, 并且输入的不是 '.'
                    if ((money.length - index) <= 2 && value !== '.') {
                        // 输入的是数字，并且小数点位两位  直接添加
                        _money = money + value + '';
                    } else {
                        //小数点已经两位了，直接退出
                        return;
                    }
                }
                this.parentMoney = prefix + _money;
            },
            deleteBtn () {
                let money = this.parentMoney;
                let a = parseFloat(money) === 0;
                if (parseFloat(money) === 0) return;
                const temp = money.substring(0, money.length - 1); //删除上一位
                let _money = temp.length == 0 ? '0' : temp;
                this.parentMoney = _money;
            },
            confirmBtn() {
                //格式化
                this.formatMoney();
                let index = this.parentMoney.lastIndexOf('+');
                if(index !== -1) {
                    if((index+1) != this.parentMoney.length){
                        // + 的索引不等于 总长，说明有值，则去执行加法
                        this.calculateMoeny();
                    }
                }
                
                if(!this.showEq){
                    //如果为确定按钮，再次点击确定按钮时，隐藏键盘
                    this.$emit('keyboardHideEvent', true);
                }

                //恢复 “=” 为 “确定”
                this.showEq = false;
            },
            //格式化 money (去掉  xx. xx.0 xx.00 xx.x0)
            formatMoney() {
                let money = this.parentMoney;
                const index = money.lastIndexOf('.');
                let _money = money;
                if (index !== -1 && money.length == (index + 1)){
                    //如果 数字 以 ‘.’ 结尾，那么点击确定的时候就要去除
                    _money = money.substring(0, money.length - 1);
                }
                if(index !== -1 && (money.length == (index + 2) || money.length == (index + 3))) {
                    // 处理 xx.0 、 xx.00 和 xx.x0 的情况
                    let last = money.substring(index+1);
                    let lastStr = money.substring(money.length-1);
                    if('0' == last || '00' == last) {
                        // xx.0 、 xx.00
                        _money = money.substring(0, index);
                    } else if('0' == lastStr){
                        // xx.x0
                        _money = money.substring(0, money.length-1);
                    }
                }
                this.parentMoney = _money;
            },
            //计算 + 的money
            calculateMoeny() {
                let res = 0;
                let money = this.parentMoney;
                let moneyArr = money.split('+');
                if(moneyArr.length == 2 && moneyArr[1] != '' && moneyArr[1].length > 0) {
                    res = (parseFloat(moneyArr[0]) * 10000 + parseFloat(moneyArr[1]) * 10000) / 10000;
                }
                this.parentMoney = res + '';
            }
        },
        watch: {
            money(value) {
                this.parentMoney = value;
            }
        }
    }
</script>
<style scoped>
    .keyboard {
        background: #3e4552;
        color: #ffffff;
        font-size: .6rem;
        line-height: .8rem;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding-bottom: .6rem;
    }
    .row1 {
        display: flex;
        text-align: center;
        width: 100%;
    }
    .row1 p, .row1 i {
        flex: 1;
        padding: .3rem 0;
        border-right: 1px solid #353946;
        border-bottom: 1px solid #353946;
    }
    .row2 {
        display: flex;
        text-align: center;
        width: 100%;
    }
    .row2-item1 {
        display: flex;
        flex-direction: column;
        flex: 3;
    }
    .row2-item1 div {
        display: flex;
    }
    .row2-item1 div p, .row2-item1 div i {
        flex: 1;
        padding: .2rem;
        border-right: 1px solid #353946;
        border-bottom: 1px solid #353946;
    }
    .row2-item2 {
        flex: 1;
    }
    .row2-item2 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .5rem;
        background: #ed7274;
    }
    .keyboard p:active,.keyboard i:active {
        opacity: .1;
    }
</style>