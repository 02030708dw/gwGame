import {Ref, ref, toRaw, watch} from "vue";
import {calData, calData2D} from "@/utils/arrayFun";
export default function (type:string,lotteryHistory:  Map<string, Ref<{}>>,playTypeCode:Ref,lock:Ref) {
    const boardData2D = ref(calData2D(100))
    const boardData2DType = ref<any[]>([
        {label:'头',value:1},
        {label:'尾',value:2},
        {label:'头奖选组15',value:3},
    ])
    const activeData2D = ref<number[]>([])
    const activeData2DType = ref<number[]>([])
    const onAddAct2D = (i: number) => {
        if (lock.value) return
        if (activeData2D.value.includes(i)) activeData2D.value.splice(activeData2D.value.findIndex(it => it === i), 1)
        else activeData2D.value = [...activeData2D.value, i]
    }
    const onAddAct2DType = (i: number) => {
        if (activeData2DType.value.includes(i)) activeData2DType.value.splice(activeData2DType.value.findIndex(it => it === i), 1)
        else activeData2DType.value = [...activeData2DType.value, i]
    }
    watch(()=>[activeData2D.value,activeData2DType.value],(n,i)=>{
        if (i[1].length===0){
            if (activeData2D.value.length) activeData2D.value=[]
            lotteryHistory.set(type,ref([]))
        }else {
            const data=activeData2DType.value.map(it=>{
                const gPlayType=boardData2DType.value.find(it2=>it2.value===it)
                return {
                    gamePlayCode:gPlayType!.gamePlayCode||it,
                    gamePlayTypeCode:playTypeCode.value,
                    // gamePlayCode:[...lotteryHistory.keys()][playTypeSetIndex.value],
                    gameType:type,
                    oneBetAmount:gPlayType.betAmount,
                    winAmount:gPlayType!.winAmount,
                    betNums:toRaw(n[0])
                }
            })
            lotteryHistory.set(type,ref(data))
        }
    },{
        deep:true
    })
    return {
        boardData2D,
        activeData2D,
        onAddAct2D,
        activeData2DType,
        boardData2DType,
        onAddAct2DType
    }
}