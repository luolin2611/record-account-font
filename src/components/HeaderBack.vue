<template>
    <div class="header-back">
        <div class="title">
            <i class="iconfont btn-back" @click="$router.back()"></i>
            <div>
                <p>{{title}}</p>
            </div>
        </div>
        <div style="background-color: rgb(173, 173, 177); height: 1px;margin-top: .2rem; margin-bottom: .2rem;"></div>
    </div>
</template>
<script>
    export default {
        name: 'HeaderBack',
        props: {
            title: {
                type: String,
                default: "默认标题"
            }
        }
    }
</script>
<style scoped>
    .header-back {
        display: flex;
        flex-direction: column;
        font-size: .45rem;
        padding-top: .2rem;
    }

    .title {
        display: flex;
        margin-left: .1rem;
    }

    .title i {
        font-size: .5rem;
    }

    .title div {
        display: flex;
        flex: 1;
        justify-content: center;
    }
</style>