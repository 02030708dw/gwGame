
import { defineStore } from "pinia";
import { fetchUserInfo } from '@/api/user'
export const useLogin = defineStore("login", {
	state() {
		return {

		};
	},
	actions: {

		loginCode(phoneNum : any) {
			fetchUserInfo({ phoneNum })
				.then((res : any) => {
					if (res.code == 200) {
						uni.showToast({
							icon: "none",
							title: "验证码发送成功"
						})

					}

				})
				.catch((err : any) => console.log(err))

		}
	},
	unistorage: false
})