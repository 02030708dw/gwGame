
import { defineStore } from "pinia";
export const useSaveTimUser = defineStore("saveTimUser", {
	state() {
		return {
			TIMCoreLoginParams: null
		};
	},
	actions: {
		// 持久化用户TIM登录信息
		saveTimUser(params : any) {
			this.TIMCoreLoginParams = params
		}
	},
	unistorage: true
})