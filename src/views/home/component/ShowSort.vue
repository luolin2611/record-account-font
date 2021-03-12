<!-- 记账弹出框子组件 -->
<!-- @author rollin -->
<!-- @date 2021-02-06 10:13:28 -->
<template>
    <div class="show-sort">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
        </swiper>
    </div>
</template>
<script>
    export default {
        name: 'ShowSort',
        components: {
        },
        data() {
            return {
                swiperOptions: {
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    // Some Swiper option/callback...
                }
            }
        },
        methods: {},
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        mounted() {
            console.log('Current Swiper instance object', this.swiper)
            this.swiper.slideTo(1, 1000, false)
        }
    }
</script>
<style scoped>
    .swiper-slide {
        line-height: 3rem;
        font-size: .45rem;
        text-align: center;
        height: 3rem;
        flex-shrink: 0;
        background: #00ff90;
    }
</style>