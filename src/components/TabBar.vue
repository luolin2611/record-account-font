<template>
    <div id="tab_body">
        <ul>
            <li v-for="(tab, index) in tabs" :key="index" :class="{'active': index == selectIndex}"
                @click="goTab(index)">
                <i class="iconfont" :class="tab.icon"></i>
                <p>{{tab.title}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { Toast } from 'vant';
    export default {
        name: 'TabBar',
        props: {
            selectIndex: {
                typs: Number,
                default: 0
            }
        },
        data() {
            return {
                tabs: [
                    {
                        title: '首页',
                        icon: 'home'
                    },
                    {
                        title: '账单',
                        icon: 'bill'
                    },
                    {
                        title: '报表',
                        icon: 'report'
                    },
                    {
                        title: '我的',
                        icon: 'user'
                    }
                ],
            }
        },
        methods: {
            goTab(index) {
                if (this.selectIndex != index) {
                    let path = '';
                    switch (index) {
                        case 0:
                            path = 'Home';
                            break;
                        case 1:
                            path = 'Bill';
                            break;
                        case 2:
                            path = 'Report';
                            break;
                        case 3:
                            let user = this.getUser || null;
                            if (user) {
                                //用户已经登录
                                path = 'My';
                            } else {
                                Toast('您还未登录，请先登录');
                                //用户未登录 进入登录页面
                                path = "login";
                            }
                            break;
                    }
                    this.$router.push(path);
                }
            }
        },
        computed: {
            ...mapGetters(['getUser'])
        }
    }
</script>
<style scoped>
    #tab_body ul {
        width: 100%;
        display: flex;
        height: 1.4rem;
        background: #ffffff;
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 0.1rem;
        border-top: 1px solid #ebe8e3;
        justify-content: space-around;

    }

    #tab_body ul li {
        display: flex;
        flex-direction: column;
        text-align: center;
        flex: 1;
        color: #8c8f97;
    }

    #tab_body ul i {
        font-size: .65rem;
    }

    #tab_body ul .active {
        color: #de5f5a;
    }

    #tab_body ul p {
        font-size: 0.35rem;
    }
</style>