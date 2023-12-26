import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const usethreeMinute = defineStore("threeMinute", () => {
  const typeList = ref([
    { label: "2D", id: 0, checked: true },
    { label: "3D", id: 1, checked: false },
    { label: "PL2", id: 2, checked: false },
    { label: "PL3", id: 3, checked: false },
  ]);
  const methodList2D = ref([
    { label: "头", id: 0, checked: false, sum: 1 },
    { label: "尾", id: 1, checked: false, sum: 1 },
    { label: "头尾", id: 2, checked: false, sum: 2 },
    { label: "包组", id: 3, checked: false, sum: 18 },
    { label: "包组7", id: 4, checked: false, sum: 7 },
  ]);
  const num2Date = () => {
    // 2D里的按键数据
    let arr = [];
    for (var i = 0; i < 100; i++) {
      i < 10 ? arr.push("0" + i) : arr.push("" + i);
    }
    return arr;
  };
  const methodList3D = ref([
    { label: "头", id: 0, checked: false, sum: 1 },
    { label: "尾", id: 1, checked: false, sum: 1 },
    { label: "头尾", id: 2, checked: false, sum: 2 },
    { label: "包组", id: 3, checked: false, sum: 18 },
    { label: "包组7", id: 4, checked: false, sum: 7 },
  ]);
  const num3Date=computed(()=>{
    let arr=[]
    for (var i = 0; i < 1000; i++) {
      if (i < 10) {
        arr.push("00" + i);
      } else if (i < 100) {
        arr.push("0" + i);
      } else {
        arr.push("" + i);
      }
    }
    return arr
  })

  return { typeList, methodList2D, methodList3D ,num2Date};
});
