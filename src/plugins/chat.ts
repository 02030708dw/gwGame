import { defineStore } from "pinia";
import { configTim } from "@/plugins/TIM-plugin/configTim"
import { useSaveTimUser } from "@/plugins/TIM-plugin/loginParams.pinia";
export const useTIMStore = defineStore('chat', {
	state() {
		return {
			conversationList: []
		}
	},
	TIMOptions() {
		return {
			SDKAppID: configTim.SDKAppID,
		}
	},
	actions: {
		/**
		 * 接收 订阅消息的方法
		 * @param event
		*/
		subscribeMessage(event : any) {
			console.log("接收到的订阅消息", event)
		},
		/**
		 * 获取回话列表
		 * @param  
		 * TIM_1600006548_admin_conversationMap
		 * TIM_1600006548_admins_conversationMap
		 * 
		*/
		async getSessionList() {
			const { data: { conversationList } } = await this.timCore.tim?.getConversationList();
			this.conversationList = conversationList;
			console.log("获取会话列表的回话记录----------", this.conversationList)
		},
		/**
		 * 
		 * 删除回话记录
        **/
		async deleteSessionConversation() {
			// 	const storeSaveTimUser=useSaveTimUser()
			// console.log("删除回话记录----------", 'C2C'+storeSaveTimUser.TIMCoreLoginParams.userID)
		 
			const { data } = await this.timCore.tim?.deleteConversation('C2C冉先生21')
			console.log("删除回话记录----------", data)
		}


	}
})