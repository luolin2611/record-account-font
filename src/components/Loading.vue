<template>
    <div v-show="show" class="loading-container">
        <i class="iconfont icon-load-loading"></i>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'loading',
        props: {
            showLoading: {
                typs: Boolean,
                default: false
            }
        },
        data() {
            return {
                show: false
            }
        },
        computed: {
            ...mapGetters(['getShowLoading'])
        },
        watch: {
            showLoading (val) {
                this.show = val
            },
            getShowLoading (val) {
                this.show = val
            }
        },
        created () {
            this.show = this.showLoading
        }
    }
</script>
<style scoped>
    .loading-container i {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 1rem;
        transform: translate(-50%, -50%);
        animation: loading-component 2s linear infinite;
    }

    @keyframes loading-component {
        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>