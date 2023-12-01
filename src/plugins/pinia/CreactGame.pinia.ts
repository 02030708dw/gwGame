
import { defineStore } from "pinia"; 
export const useCreactGame = defineStore("creactGame", {
	state() {
		return {
           historyList:[],
		   title:"Fred Hill",
		   price:"",
		   timsNum:10, 
		};
	},
	actions: {
     saveHistoryList(item:any){
		 this.historyList = item
	 },
	 addHistoryList(){
		 let params={
			 title:this.title+(this.historyList.length+1),
			 price:this.price,
			 timsNum:this.timsNum,
			 id:this.historyList.length+1
		 }
	 	this.historyList.push(params)
	 }
	},
	unistorage: true
})
 