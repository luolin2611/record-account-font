<template>
    <div class="statistics-container">
        <i class="iconfont icon-fork"></i>
        <div class="content-area">
            <div class="progress-bar">
                <p>过年消费 54%</p>
                <div class="progress-box">
                    <div class="progress-box1"></div>
                    <div class="progress-box2"></div>
                </div>
            </div>
            <div class="bill-content">
                <p class="money">￥2,172.60</p>
                <p class="per">16笔</p>
            </div>
            <i class="iconfont btn-right"></i>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'StatisticsItem'
    }
</script>
<style scoped>
    .statistics-container {
        display: flex;
        align-items: center;
        padding: 0 .3rem;
        margin-top: .4rem;
    }

    .statistics-container .icon-fork {
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