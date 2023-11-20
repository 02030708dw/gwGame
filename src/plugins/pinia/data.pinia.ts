
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
			]

		};
	},
	actions: {


	},
	unistorage: false
})