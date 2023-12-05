
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
			TabDataAll: [
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
			TabDataTwo: [
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
			TabDataTwoStartEnd: [
				{ label: "头", id: 0 },
				{ label: "尾", id: 1 },
			],
			TabDataTwoStartEnd2D: [
				{ label: "头", id: 0 },
				{ label: "尾", id: 1 },
				{ label: "头奖组选15", id: 2 },
			],
			TabDataTwoStartEnd3D: [
				{ label: "头", id: 0 },
				{ label: "前三", id: 1 },
				{ label: "后三", id: 2 },
				{ label: "头奖组选", id: 3 },
			],
			TabDataTwo1D2D3D:[
				{ label: "头", id: 0 },
				{ label: "尾", id: 1 },
			],
			contryId: 1,
			H: 200,
			W: 18,
			 heightH:480 ,

			oneActive: '#FFB023',
			twoActive: '#5dca74',
			threeActive:"#4ABBE9"

		};
	},
	actions: {

		setTabData(n : number) {
			this.contryId = n;
	 
			if (n == 2) {
				this.H = 100
				this.W = 30
				this.TabData = this.TabDataTaiGuo
				this.TabDataTwo = this.TabDataTwoStartEnd
			} else {
				 console.log('===2=====', n)
				this.TabData = this.TabDataAll
				this.TabDataTwo = this.TabDataAll
			}
		},
		setTabDataTwo1D2D3D(n:number){
			if(n==0){
			 this.TabDataTwo1D2D3D = this.TabDataTwoStartEnd
			}
			if(n==1){
			 this.TabDataTwo1D2D3D = this.TabDataTwoStartEnd2D
			}
			if(n==2){
			 this.TabDataTwo1D2D3D = this.TabDataTwoStartEnd3D
			}
	 
		}

	},
	unistorage: false
})