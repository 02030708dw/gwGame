import { defineStore } from "pinia";
import { configTim } from "@/plugins/TIM-plugin/configTim"
import { useSaveTimUser } from "@/plugins/TIM-plugin/loginParams.pinia";
// import { Message } from "@tencentcloud/chat";
import { TIMPayload } from "./TIM-plugin/type";
export const useTIMStore = defineStore('chat', {
	state() {
		return {
			conversationList: [],
			nowMessage: [] as unknown as TIMPayload,//当前发送的数据
			historyMessage: [],//获取历史数据
		}
	},
	TIMOptions() {
		return {
			SDKAppID: configTim.SDKAppID,
		}
	},
	getters: {
		chatLogs(state) {
			console.log("历史消息和现在消息的组合消息------", [...state.historyMessage, ...state.nowMessage])
			return [...state.historyMessage, ...state.nowMessage]
		},

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
			const storeSaveTimUser = useSaveTimUser();
			console.log("删除回话记录----------", 'C2C' + storeSaveTimUser.sendUser)

			const { data } = await this.timCore.tim?.deleteConversation('C2C' + storeSaveTimUser.sendUser)
			console.log("删除回话记录----------", data)
		},
		/**
		 * 
		 * 获取历史消息
		 */
		async getMessageHistoryList(userID : string) {
			const data = await this.timCore.tim?.getMessageList({
				conversationID: `C2C${userID}`
			})
			this.historyMessage = data.data.messageList
			//历史记录里面有个  flow（in , out）
			console.log("我是历史记录----------------->", data.data.messageList)
		},


	},
	unistorage: false
})