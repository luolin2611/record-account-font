<!-- 记账弹出框子组件 -->
<!-- @author rollin -->
<!-- @date 2021-02-06 10:13:28 -->
<template>
    <div class="show-sort">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(data, index) in iconList" :key="index">
                <div v-for="(item, inx) in data" :key="inx">
                    <i :class="'iconfont icon-' + item.iconName" :style="(index == select[0] && inx == select[1]) ? 'color: #ec6564' : ''"></i>
                    <p>{{item.iconNameCn}}</p>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { postRequest } from '@/api/api'
    import { Toast } from 'vant'
    export default {
        name: 'ShowSort',
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
                select: [0, 3],
                iconList: [],
                arr: [
                    [
                        {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }
                    ],
                    [
                        {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }, {
                            icon_name: 'icon-fork',
                            name: '餐饮'
                        }
                    ]
                ]
            }
        },
        methods: {
            /**
             * 获取用户图标 (后台会判定UserId 是否为 ‘’ 来进行请求不同的图标)
             */
            async queryAllIcon() {
                let user = this.getUser || null;
                let userId = '';
                if (user) {
                    // 用户已经登录，查询首页信息
                    userId = user.userId
                }
                let res = await postRequest({
                    url: '/record/queryAllIcon',
                    param: {
                        userId: userId
                    }
                }) || null;
                if (res) {
                    if (res.code == '0000') {
                        this.iconList = res.body.iconList || [];
                    } else {
                        Toast(res.msg);
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['getUser']),
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        mounted() {
            console.log('Current Swiper instance object', this.swiper)
            // this.swiper.slideTo(1, 1000, false)
        },
        created() {
            this.queryAllIcon();
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
        flex: 0 0 calc(1 / 6 * 100%);
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