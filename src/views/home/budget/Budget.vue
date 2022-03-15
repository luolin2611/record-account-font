<!-- 预算  -->
<!-- author rollin  -->
<!-- date 2021-08-28 10:54:53  -->
<template>
    <div class="budget">
        <header-back title="本月预算"></header-back>
        <!-- 内容部分 -->
        <div style="padding: .3rem;">
            <!-- 月预算 -->
            <div>
                <div class="title-box">
                    <div class="title-division">
                    </div>
                    <span>月预算</span>
                </div>
            </div>

            <!-- 分类预算 -->
            <div>
                <div class="title-box">
                    <div class="title-division">
                    </div>
                    <span>月预算</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeaderBack from '@/components/HeaderBack.vue'
    export default {
        name: 'ShowRecentThreeBill',
        components: {
            HeaderBack
        }
    }
</script>
<style scoped>
    .budget {
        font-size: .45rem;
    }

    /* 标题分割线 */
    .title-box {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .title-division {
        background-color: bisque;
        width: .15rem;
        height: .5rem;
        margin-right: .15rem;
    }
</style>