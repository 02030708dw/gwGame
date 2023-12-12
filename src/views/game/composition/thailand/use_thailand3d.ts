import {onMounted, ref} from "vue";
import {calData} from "@/utils/arrayFun";
export default function () {
    const boardData3D = ref(calData(30))
    const boardSubData3D = ref(calData(10).map(it=>({label:it.label+'00',value:Number(it.value+'000')})))
    const activeData3D = ref<number[]>([])
    const activeSubData3D = ref<number[]>([])
    const onAddActSub3D = (i: number) => {
        if (activeSubData3D.value.includes(i)) activeSubData3D.value=[]
        else activeSubData3D.value=[i]
    }
    const onAddAct3D = (i: number) => {
        if (activeData3D.value.includes(i)) activeData3D.value.splice(activeData3D.value.findIndex(it => it === i), 1)
        else activeData3D.value = [...activeData3D.value, i]
    }
    return {
        boardData3D,
        boardSubData3D,
        activeData3D,activeSubData3D,
        onAddAct3D,onAddActSub3D
    }
}