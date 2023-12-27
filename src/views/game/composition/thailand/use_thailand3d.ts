import {onMounted, ref} from "vue";
import {calData} from "@/utils/arrayFun";
export default function () {
    const boardData3D = ref(calData(100))
    const boardSubData3D = ref(calData(10).map(it=>({label:it.label+'00',value:Number(it.value+'000')})))
    const boardData3DType = ref([
        {label:'头',value:1},
        {label:'前三',value:2},
        {label:'后三',value:3},
        {label:'头奖选组',value:4},
    ])
    const activeData3D = ref<number[]>([])
    const activeSubData3D = ref<number[]>([])
    const activeData3DType = ref<number[]>([1])
    const onAddActSub3D = (i: number) => {
        if (activeSubData3D.value.includes(i)) activeSubData3D.value=[]
        else activeSubData3D.value=[i]
    }
    const onAddAct3D = (i: number) => {
        if (activeData3D.value.includes(i)) activeData3D.value.splice(activeData3D.value.findIndex(it => it === i), 1)
        else activeData3D.value = [...activeData3D.value, i]
    }
    const onAddAct3DType = (i: number) => {
        if (activeData3DType.value.includes(i)) activeData3DType.value.splice(activeData3DType.value.findIndex(it => it === i), 1)
        else activeData3DType.value = [...activeData3DType.value, i]
    }
    return {
        boardData3D,
        boardSubData3D,
        activeData3D,activeSubData3D,
        onAddAct3D,onAddActSub3D,
        activeData3DType,boardData3DType,
        onAddAct3DType
    }
}