import {ref} from "vue";
import {calData} from "@/utils/arrayFun";
export default function () {
    const boardData1DType = ref([
        {label:'头',value:1},
        {label:'尾',value:2},
    ])
    const boardData1D = ref(calData(10))
    const activeData1D = ref<number[]>([])
    const activeData1DType = ref<number[]>([])
    const onAddAct1D = (i: number) => {
        if (activeData1D.value.includes(i)) activeData1D.value.splice(activeData1D.value.findIndex(it => it === i), 1)
        else activeData1D.value = [...activeData1D.value, i]
    }
    return {
        boardData1D,
        activeData1D,
        boardData1DType,
        activeData1DType,
        onAddAct1D,
    }
}