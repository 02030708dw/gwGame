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
		bscribeMessage(event : any) {
			console.log("接收到的订阅消息", event)
		},
		/**
		 * 获取会话列表
		 * @param  
		*/
		async getConversationList() {
			const { data: {conversationList} } = await this.timCore.tim?.getConversationList();
			this.conversationList = conversationList;
			console.log("获取会话列表----------", this.conversationList)
		}
	}
})