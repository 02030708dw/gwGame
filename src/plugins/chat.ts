import { defineStore } from "pinia";
import { configTim } from "@/plugins/TIM-plugin/configTim"
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
			const { data  } = await this.timCore.tim?.getConversationList();
			console.log("获取会话列表的回话记录------data----", data)
			const { data: { conversationList } } = await this.timCore.tim?.getConversationList();
			this.conversationList = conversationList;
			
			 			 
			console.log("获取会话列表的回话记录----------", this.conversationList)
		}
	}
})