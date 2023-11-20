
import { defineStore } from "pinia";
export const useCommon = defineStore("Common", {
	state() {
		return {
			TabData: [
				{ label: "0", id: 0 },
				{ label: "1", id: 1 },
				{ label: "2", id: 2 },
				{ label: "3", id: 3 },
				{ label: "4", id: 4 },
				{ label: "5", id: 5 },
				{ label: "6", id: 6 },
				{ label: "7", id: 7 },
				{ label: "8", id: 8 },
				{ label: "9", id: 9 },
			],
			 
			TabDataTaiGuo: [
				{ label: "1D", id: 0 },
				{ label: "2D", id: 1 },
				{ label: "3D", id: 2 }

			],
			TabDataTwo:[
				{ label: "0", id: 0 },
				{ label: "1", id: 1 },
				{ label: "2", id: 2 },
				{ label: "3", id: 3 },
				{ label: "4", id: 4 },
				{ label: "5", id: 5 },
				{ label: "6", id: 6 },
				{ label: "7", id: 7 },
				{ label: "8", id: 8 },
				{ label: "9", id: 9 },
			],
			TabDataTwoStartEnd:[
				{ label: "头", id: 0 },
				{ label: "尾", id: 1 },
			],
			contryId :1,
			H:200,
			W:18,
			 
			oneActive:'#FFB023',
			twoActive:'#5dca74'

		};
	},
	actions: {
		
     setTabData(n:number){
		 this.contryId =n;
		 if(n===2){
			 this.H=100
			 this.W=30
			 this.TabData = this.TabDataTaiGuo
			 this.TabDataTwo = this.TabDataTwoStartEnd
		 }
	 }

	},
	unistorage: false
})