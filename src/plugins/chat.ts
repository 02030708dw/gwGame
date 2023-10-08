import { defineStore } from "pinia";
import { configTim } from "@/plugins/TIM-plugin/configTim"
export const useTIMStore=defineStore('chat',{
	TIMOptions () {
		return {
		SDKAppID : configTim.SDKAppID,
		}
	},
	actions:{
		/**
		 * 接收订阅消息的方法
		 * @param event
        */  
		subscribeMessage(event:any){
			console.log("接收到的订阅消息",event)
		},
	}
})