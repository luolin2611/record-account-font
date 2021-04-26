<template>
    <div class="header-back">
        <i class="iconfont btn-back" @click="$router.back()"></i>
        <div>
            <p>{{title}}</p>
        </div>
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
        line-height: 1rem;
        font-size: .45rem;
        padding: .2rem;
    }

    .header-back i {
        font-size: .6rem;
    }

    .header-back div {
        display: flex;
        flex: 1;
        justify-content: center;
    }
</style>