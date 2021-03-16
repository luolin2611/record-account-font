<template>
    <div class="year-container">
        <div class="item">
            <p style="font-size: .45rem; font-weight: 500;">{{yearItem.month}}</p>
            <p style="color: #8c8f97; font-size: .3rem;">{{yearItem.year}}</p>
        </div>
        <div class="item">
            <p>收入</p>
            <p style="color: #4eab7f;">￥{{yearItem.expense}}</p>
        </div>
        <div class="item">
            <p>支出</p>
            <p style="color: #ed7c71;">￥{{yearItem.income}}</p>
        </div>
        <div class="item">
            <p>结余</p>
            <p>￥{{yearItem.income - yearItem.expense}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'YearItem',
        props: {
            yearItem: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>
<style scoped>
    .year-container {
        margin-right: .3rem;
        margin-top: .2rem;
        display: flex;
        font-size: .4rem;
        line-height: .6rem;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e5e5e5;
    }
    .year-container .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    } 
</style>