<!-- 记账弹出框子组件 -->
<!-- @author rollin -->
<!-- @date 2021-02-06 10:13:28 -->
<template>
    <div class="show-sort">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(data, index) in classifyList" :key="index">
                <div v-for="(item, inx) in data" :key="inx" @click="selectIconBtn(item,index,inx)">
                    <i :class="'iconfont icon-' + item.icon.iconName"
                        :style="(index == select[0] && inx == select[1]) ? currentColor : ''"></i>
                    <p>{{item.classifyName}}</p>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { queryClassify } from '@/api/api'
    import { Toast } from 'vant'
    export default {
        name: 'ShowSort',
        props: {
            selectSort: {
                type: String,
                default: 'income'
            }
        },
        components: {
        },
        data() {
            return {
                swiperOptions: {
                    loop: false,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    // Some Swiper option/callback...
                },
                select: [0, 0],
                selectClassify: {},
                classifyList: [],
            }
        },
        methods: {
            /**
             * 获取用户分类列表 (后台会判定UserId 是否为 ‘’ 来进行请求不同的图标)
             */
            queryClassify() {
                let user = this.getUser || null;
                let userId = '';
                if (user) {
                    // 用户已经登录，查询首页信息
                    userId = user.userId
                }
                queryClassify({
                    userId: userId,
                    type: this.selectSort == 'income' ? '0' : '1',
                    localStorageId: this.selectSort == 'income' ? 'queryClassify-income' : 'queryClassify-expense'
                }).then(res => {
                    if (res) {
                        if (res.code == '0000') {
                            this.classifyList = res.body.classifyList || [];
                            this.selectClassify = this.classifyList[0][0];
                            this.$emit('showSortSelectClassifyCallBack', this.selectClassify);
                        } else {
                            Toast(res.msg);
                        }
                    }
                });
            },
            /**
             * 点击图标按钮
             */
            selectIconBtn(item, firstIndex, secondIndex) {
                if (this.select != [firstIndex, secondIndex]) {
                    this.select = [firstIndex, secondIndex];
                    this.selectClassify = this.classifyList[firstIndex][secondIndex];
                    this.$emit('showSortSelectClassifyCallBack', this.selectClassify);
                }
            }
        },
        watch: {
            selectSort(newVal, oldVal) {
                //用户点击了顶部的按钮  重新更新图标
                if (newVal != oldVal) {
                    this.select = [0, 0];
                    this.queryClassify();
                }
            }
        },
        computed: {
            ...mapGetters(['getUser']),
            swiper() {
                return this.$refs.mySwiper.$swiper
            },
            currentColor() {
                return { 'color': this.selectSort == 'income' ? '#ed7773' : '#4eab7f' }
            }
        },
        mounted() {
            console.log('Current Swiper instance object', this.swiper)
            // this.swiper.slideTo(1, 1000, false)
        },
        created() {
            this.queryClassify();
        },
    }
</script>
<style scoped>
    .swiper-slide {
        display: flex;
        padding: .3rem 0;
        text-align: center;
        height: 4rem;
        flex-wrap: wrap;
    }

    .swiper-slide div {
        display: flex;
        flex-direction: column;
        flex: 0 0 calc(1 / 5 * 100%);
        height: 50%;
    }

    .swiper-slide div i {
        font-size: .7rem;
        color: #aeb1b6;
    }

    .swiper-slide div p {
        font-size: .35rem;
        color: #2a2c2e;
    }
</style>