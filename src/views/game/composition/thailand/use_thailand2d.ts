import {ref} from "vue";
import {calData} from "@/utils/arrayFun";
export default function () {
    const boardData2D = ref(calData(30))
    const boardData2DType = ref([
        {label:'头',value:1},
        {label:'尾',value:2},
        {label:'头奖选组15',value:3},
    ])
    const activeData2D = ref<number[]>([])
    const activeData2DType = ref<number[]>([1])
    const onAddAct2D = (i: number) => {
        if (activeData2D.value.includes(i)) activeData2D.value.splice(activeData2D.value.findIndex(it => it === i), 1)
        else activeData2D.value = [...activeData2D.value, i]
    }
    const onAddAct2DType = (i: number) => {
        if (activeData2DType.value.includes(i)) activeData2DType.value.splice(activeData2DType.value.findIndex(it => it === i), 1)
        else activeData2DType.value = [...activeData2DType.value, i]
    }
    return {
        boardData2D,
        activeData2D,
        onAddAct2D,
        activeData2DType,
        boardData2DType,
        onAddAct2DType
    }
}