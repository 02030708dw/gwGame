import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const usethreeMinute = defineStore("threeMinute", () => {
  const typeList = ref([
    { label: "2D", id: 0, checked: true },
    { label: "3D", id: 1, checked: false },
    { label: "PL2", id: 2, checked: false },
    { label: "PL3", id: 3, checked: false },
  ]);
  const methodList = ref([
    { label: "头", id: 0, checked: false, sum: 1 },
    { label: "尾", id: 1, checked: false, sum: 1 },
    { label: "头尾", id: 2, checked: false, sum: 2 },
    { label: "包组", id: 3, checked: false, sum: 18 },
    { label: "包组7", id: 4, checked: false, sum: 7 },
  ]);
  return { typeList, methodList };
});