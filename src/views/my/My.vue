<template>
	<div class="my-container">
		<div class="head-img">
			<img src="../../assets/img/head_img.png" />
			<div>
				<p class="title">{{getUser && getUser.realName || ''}}</p>
				<p class="subtitle">{{getUser && getUser.personalResume || ''}}</p>
			</div>
		</div>
		<div style="background: #f8f8f8; width: 100%; height: .2rem;margin-top: 1rem;"></div>
		<div class="func-area">
			<div @click="() => this.$router.push('/billexport')">
				<p>记账账单导出</p>
				<i class="iconfont btn-right"></i>
			</div>
			<div>
				<p>记账账单导入</p>
				<i class="iconfont btn-right"></i>
			</div>
			<div>
				<p>修改登录密码</p>
				<i class="iconfont btn-right"></i>
			</div>
			<div>
				<p>我的理财</p>
				<i class="iconfont btn-right"></i>
			</div>
			<div>
				<p>Bug反馈</p>
				<i class="iconfont btn-right"></i>
			</div>
		</div>

		<div @click="logout()" class="logout-btn">
			<p>退出登录</p>
		</div>

		<tab-bar :selectIndex="3"></tab-bar>
	</div>
</template>
<script>
	import TabBar from '@/components/TabBar.vue'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: 'My',
		components: {
			TabBar,
		},
		computed: {
			...mapGetters(['getUser']),
		},
		data() {
			return {

			}
		},
		methods: {
			...mapMutations(['setUser']),
			logout() {
				// 1.删除存储的用户信息
				this.setUser(null);
				localStorage.clear();
				// 2.跳转到登录页面
				this.$router.push('/login');
			},
			checkLoginState() {
				let user = this.getUser || null;
				if (!user) {
					//用户未登录 进入登录页面
					this.$router.push('/login');
				}
			}
		},
		created() {
			this.checkLoginState();
		},
	}
</script>
<style scoped>
	.head-img {
		display: flex;
		align-items: center;
		margin-top: 1rem;
		margin-left: .3rem;
	}

	.head-img img {
		width: 2rem;
		height: 2rem;
		margin-right: .3rem;
		border-radius: 50%;
	}

	.head-img .title {
		font-size: .5rem;
	}

	.head-img .subtitle {
		color: #8c8f98;
		font-size: .4rem;
		margin-top: .1rem;
	}

	.func-area div {
		display: flex;
		font-size: .45rem;
		align-items: center;
		margin: .3rem;
		padding: .3rem 0;
		border-bottom: 1px solid #e5e5e5;
	}

	.func-area div p {
		margin-left: .3rem;
		display: flex;
		flex: 1;
	}

	.logout-btn {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 1rem;
	}

	.logout-btn p {
		width: 90%;
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: .4rem;
		text-align: center;
		color: #fff;
		background: #ec6564;
	}
</style>
