import {Ref, ref, toRaw, watch} from "vue";
import {calData} from "@/utils/arrayFun";
export default function (type:string,lotteryHistory:  Map<string, Ref<{}>>,playTypeSetIndex:Ref) {
    const boardData1DType = ref([
        {label:'头',value:1},
        {label:'尾',value:2},
    ])
    const boardData1D = ref(calData(10))
    const activeData1D = ref<number[]>([])
    const activeData1DType = ref<number[]>([1])
    const onAddAct1DType = (i: number) => {
        /*if (activeData1DType.value.includes(i)) activeData1DType.value=[]
        else activeData1DType.value=[i]*/
        if (activeData1DType.value.includes(i)) activeData1DType.value.splice(activeData1DType.value.findIndex(it => it === i), 1)
        else activeData1DType.value = [...activeData1DType.value, i]
    }
    const onAddAct1D = (i: number) => {
        if (activeData1D.value.includes(i)) activeData1D.value.splice(activeData1D.value.findIndex(it => it === i), 1)
        else activeData1D.value = [...activeData1D.value, i]
    }
    watch(()=>[activeData1D.value,activeData1DType.value],(n,i)=>{
        if (i[1].length===0){
            activeData1D.value=[]
            lotteryHistory.set(type,ref([]))
        }else {
            const data=activeData1DType.value.map(it=>({
                gamePlayCode:it,
                gamePlayTypeCode:[...lotteryHistory.keys()][playTypeSetIndex.value],
                oneBetAmount:1,
                betNums:toRaw(n[0])
            }))
            lotteryHistory.set(type,ref(data))
        }
    },{
        deep:true
    })
    return {
        boardData1D,
        activeData1D,
        boardData1DType,
        activeData1DType,
        onAddAct1D,
        onAddAct1DType
    }
}