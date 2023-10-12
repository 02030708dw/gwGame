
import { defineStore } from "pinia";
// import {useSaveTimUser} from "./loginParams.pinia"
export const useSendGetUser = defineStore("sendGetUser", {
	state() {
		return { 
			 sendUser:"1000",//发送给谁
			// getUser:"456",//接受者
		};
	}, 
	actions: {
		// 持久化用户TIM登录信息
	 // 	saveTimUser(params : any) {
		// 	// const storeSaveTimUser =useSaveTimUser()
		// 	 this.sendUser=params.sendUserID
		// }
	},
	unistorage: false
})