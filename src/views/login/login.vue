<template>
	<view class="">
		<view class="bacAlipay">
			<view class="logo-style">
				<image src="../../static/images/other/Group2200.png" mode=""></image>
			</view>
			<view class="logo-style-title">
				{{ $t('locale.auto') }}
			</view>

			<u-form :model="form" ref="uForm">
				<u-form-item :label-style="labelStyle">
					<u-input class="inputLogin" maxlength="11" v-model="form.phoneNum" placeholder="请输入手机号" border="none" />
				</u-form-item>
				<view class="labelStyleDirver"> </view>
				<u-form-item :label-style="labelStyle">
					<view class="disrow">
						<u-input class="inputLogin" placeholder="请输入验证码" v-model="form.code" type="text"
							border="none"></u-input>
						<view class="" @click="getSmsCode('mobilelogin')">
							<button class="btnbtn" :class="codeBtn.codeStatus ? 'btn' : 'btn2'" :disabled="codeBtn.codeStatus"
								type="text" size="default">{{ codeBtn.codeText
								}}</button>
						</view>
					</view>
				</u-form-item>
				<view class="labelStyleDirver"> </view>

			</u-form>
			<view @click="submit" class="submitAlipay">登录</view>
		</view>
		<view class="fixbottom">
			<image class="redio-style" @click="handleRedio" :src="checkRedio ? active1 : active2" mode=""></image>
			<view class="color9" @click="handleRedio">您已阅读并同意 </view>
			<view class="color1" @click="handleSetting"> 《小小管家用户协议》《隐私政策》</view>
		</view>
	</view>
</template>


<script setup lang="ts">
import { ref } from "vue";

import { useLogin } from "@/plugins/pinia/login.pinia";
// api
import { ruquestSmsLogin, fetchUserInfo, ruquestGetUserInfo } from '@/api/user'
// pinia
import { useUserInfo } from '@/store/userInfo'

const active2 = '../../static/images/other/r2.png';
const active1 = '../../static/images/other/r1.png';
const storeLogin = useLogin();
const userInfo = useUserInfo()
const checkRedio = ref(false)
console.log(userInfo.Token)
const codeBtn = ref({
	codeTime: 60,
	codeText: "获取验证码",
	codeStatus: false
})
const form = ref<any>({
	phoneNum: '18888888888',
	code: '333'
})
const labelStyle = ref({
	fontWeight: "bold",
	fontSize: "14px",
	borderBottom: '1px solid red',
	display: "flex",
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between'
})


const handleSetting = () => {
	uni.navigateTo({
		url: "/views/login/localeSetting"
	})
}

const handleRedio = () => {
	checkRedio.value = !checkRedio.value
}
// 获取短信验证码
const getSmsCode = (type: any) => {
	const that = this;
	if (!verifyPhoneNumber(form.value.phoneNum)) {
		return
	}

	storeLogin.loginCode(form.value.phoneNum);
	const data = {
		phoneNum: form.value.phoneNum
	}
	fetchUserInfo(data).then((res: any) => {
		getPhonecode();
	})
	// that.$http(
	// 	'common.smsSend', {
	// 		mobile: that.form.name,
	// 		event: type
	// 	},
	// 	'获取验证码中...'
	// ).then(res => {
	// 	if (res.code === 1) {
	// 		that.getPhonecode();
	// 		that.$u.toast('验证码已发送，请注意查收短信');
	// 	} else {
	// 		that.$u.toast(res.msg);
	// 	}
	// });

}
const getPhonecode = () => {
	if (form.value.phoneNum && !codeBtn.value.codeStatus) {
		codeBtn.value.codeStatus = true
		let timerId = setInterval(() => {
			let codetime = codeBtn.value.codeTime
			codetime--
			codeBtn.value.codeTime = codetime
			codeBtn.value.codeText = `重新获取（${codetime}）`
			if (codetime < 1) {
				clearInterval(timerId)
				codeBtn.value.codeText = "重新获取"
				codeBtn.value.codeTime = 60
				codeBtn.value.codeStatus = false
			}
		}, 1000)
	}
}
// 验证手机验证码函数
const verifyPhoneNumber = (number: string) => {
	if (!form.value.phoneNum) {
		uni.showToast({
			icon: 'none',
			title: "请输入手机号"
		})
		return
	}
	let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
	if (!reg.test(number)) {
		uni.showToast({
			icon: 'error',
			title: "手机号不正确"
		})
		return
	}
	return reg.test(number)
}

const submit = () => {
	if (!verifyPhoneNumber(form.value.phoneNum)) {
		return
	}

	if (!form.value.code) {
		uni.showToast({
			icon: 'none',
			title: "请输入验证码"
		})
		return;
	}
	const data = {
		phoneNum: form.value.phoneNum,
		code: form.value.code
	}
	ruquestSmsLogin(data).then((res: any) => {
		userInfo.setUserToken(res.result)
		uni.showToast({
			icon: 'none',
			title: res.message
		})
		ruquestGetUserInfo().then((res: any) => {
			console.log('这是请求的用户数据', res)
			userInfo.setUserData(res.user)
			// uni.navigateTo({
			// 	// url: "/views/pages/calendar"
			// 	// 日报
			// 	// url:'/views/Staging/log/index'
			// })
			uni.switchTab({
				// 工作台
				url: '/views/pages/workBase'
			})
		}).catch(() => {
			uni.showToast({
				icon: "error",
				title: '登录失败请重试'
			})
		})
	})
}
</script>

<style scoped lang="scss">
@import "./css/login.scss";
</style>