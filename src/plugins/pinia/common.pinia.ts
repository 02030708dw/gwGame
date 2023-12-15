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
        { label: "1D", id: 0, checked: true },
        { label: "2D", id: 1, checked: false },
        { label: "3D", id: 2, checked: false },
      ],
      TabDataYueNan: [
        { label: "1D", id: 0, checked: true },
        { label: "2D", id: 1, checked: false },
        { label: "PL2", id: 2, checked: false },
        { label: "PL3", id: 3, checked: false },
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
        { label: "头", id: 0, checked: false },
        { label: "尾", id: 1, checked: false },
      ],
      TabDataTwoStartEnd2D: [
        { label: "头", id: 0, checked: false },
        { label: "尾", id: 1, checked: false },
        { label: "头奖组选15", id: 2, checked: false },
      ],
      TabDataTwoStartEnd3D: [
        { label: "头", id: 0, checked: false },
        { label: "前三", id: 1, checked: false },
        { label: "后三", id: 2, checked: false },
        { label: "头奖组选", id: 3, checked: false },
      ],
      TabDataTwo1D2D3D: [
        { label: "头", id: 0, checked: false },
        { label: "尾", id: 1, checked: false },
      ],
      TabDataTwoYueNan1D: [
        { label: "头", id: 0, checked: false },
        { label: "尾", id: 1, checked: false },
        { label: "头尾", id: 2, checked: false },
        { label: "包组", id: 3, checked: false },
        { label: "包组7", id: 4, checked: false },
      ],
      TabDataTwo1D2D3DID: 0, //选择1D 2D  3D的id
      TabDataTwoCheckedID: 0, //1D 2D  3D下面的ID
      contryId: 1,
      H: 200,
      W: 18,
      heightH: 480,
      oneActive: "#FFB023",
      twoActive: "#5dca74",
      threeActive: "#4ABBE9",
    };
  },
  actions: {
    setTabData(n: number) {
      this.contryId = n;
      if (n == 2) {
        this.H = 100;
        this.W = 30;
        this.TabData = this.TabDataTaiGuo;
        this.TabDataTwoStartEnd[this.TabDataTwoCheckedID].checked =
          !this.TabDataTwoStartEnd[this.TabDataTwoCheckedID].checked;
        this.TabDataTwo1D2D3D = this.TabDataTwoStartEnd;
      } else {
        console.log("===2=====", n);
        this.TabData = this.TabDataAll;
        this.TabDataTwo = this.TabDataAll;
      }
    },
    //避免默认重复选中
    handletabs() {
      this.TabDataTwoStartEnd = [
        { label: "头", id: 0, checked: false },
        { label: "尾", id: 1, checked: false },
      ];
      this.TabDataTwoStartEnd2D = [
        { label: "头", id: 0, checked: false },
        { label: "尾", id: 1, checked: false },
        { label: "头奖组选15", id: 2, checked: false },
      ];
      this.TabDataTwoStartEnd3D = [
        { label: "头", id: 0, checked: false },
        { label: "前三", id: 1, checked: false },
        { label: "后三", id: 2, checked: false },
        { label: "头奖组选", id: 3, checked: false },
      ];
      this.TabDataTwo1D2D3D = [
        { label: "头", id: 0, checked: false },
        { label: "尾", id: 1, checked: false },
      ];
    },
    //当TabDataTwoCheckedID等于0时
    setTabDataTwo1D2D3D(n: number) {
      console.log("===22222222222=====", this.TabDataTwo1D2D3D);
      if (n == 0) {
        this.TabDataTwoStartEnd[this.TabDataTwoCheckedID].checked =
          !this.TabDataTwoStartEnd[this.TabDataTwoCheckedID].checked;
        this.TabDataTwo1D2D3D = this.TabDataTwoStartEnd;
      }
      if (n == 1) {
        this.TabDataTwoStartEnd2D[this.TabDataTwoCheckedID].checked =
          !this.TabDataTwoStartEnd2D[this.TabDataTwoCheckedID].checked;
        this.TabDataTwo1D2D3D = this.TabDataTwoStartEnd2D;
      }
      if (n == 2) {
        this.TabDataTwoStartEnd3D[this.TabDataTwoCheckedID].checked =
          !this.TabDataTwoStartEnd3D[this.TabDataTwoCheckedID].checked;
        this.TabDataTwo1D2D3D = this.TabDataTwoStartEnd3D;
      }
    },
    changeBoard(n: number) {
      switch (n) {
        case 0:
          this.TabDataAll = Array(10)
            .fill(0)
            .map((_, i) => ({ label: String(i), id: i }));
          break;
        case 1:
          this.TabDataAll = Array(30)
            .fill(0)
            .map((_, i) => ({ label: String(i), id: i }));
          break;
        default:
        case 2:
          this.TabDataAll = Array(30)
            .fill(0)
            .map((_, i) => ({ label: String(i), id: i }));
      }
    },
  },
  unistorage: false,
});
