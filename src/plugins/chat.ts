import { defineStore } from "pinia";

export const useTIMStore=defineStore('chat',{
	TIMOptions () {
		return {
		SDKAppID : 1321003123
		}
	}
})