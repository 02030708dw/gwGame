import {ref} from "vue";
import {calData} from "@/utils/arrayFun";
export default function () {
    const boardData2D = ref(calData(30))
    const activeData2D = ref<number[]>([])
    const onAddAct2D = (i: number) => {
        if (activeData2D.value.includes(i)) activeData2D.value.splice(activeData2D.value.findIndex(it => it === i), 1)
        else activeData2D.value = [...activeData2D.value, i]
    }
    return {
        boardData2D,
        activeData2D,
        onAddAct2D,
    }
}