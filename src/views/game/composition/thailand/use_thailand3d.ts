import {onMounted, Ref, ref, toRaw, watch} from "vue";
import {calData, calData3D} from "@/utils/arrayFun";
type GP=Partial<GamePlay&{label:string,value:number}>
export default function (type:string,lotteryHistory:  Map<string, Ref<{}>>,playTypeCode:Ref) {
    const boardData3D = ref(calData3D(1000))
    const boardSubData3D = ref(calData(10).map(it=>
        ({label:it.label+'00',value:it.value,temp:[] as number[]})).map(it=>({...it,range:Number(it.label)+99})))
    const boardData3DType = ref<GP[]>([
        {label:'头',value:1},
        {label:'前三',value:2},
        {label:'后三',value:3},
        {label:'头奖选组',value:4},
    ])
    const activeData3D = ref<number[]>([])
    const activeSubData3D = ref<number[]>([0])
    const activeData3DType = ref<activeType[]>([{
        value:1,gamePlayId:'1'
    }])
    const onAddActSub3D = (i: number) => {
        activeSubData3D.value=[i]
    }
    const onAddAct3D = (i: number,v:[number,number]) => {
        boardSubData3D.value.forEach(it=>{
            if (activeData3DType.value.length)
            if (it.range>=v[0]&&it.range<v[1]) {
            if (it.temp.includes(i)) it.temp.splice(it.temp.findIndex(i2=>i2===i),1)
            else it.temp=[...it.temp,i]
            }
        })
        if (activeData3D.value.includes(i)) activeData3D.value.splice(activeData3D.value.findIndex(it => it === i), 1)
        else activeData3D.value = [...activeData3D.value, i]
    }
    const onAddAct3DType = (i: any) => {
        if (activeData3DType.value.map(it=>it.value).includes(i.value)) activeData3DType.value=
            activeData3DType.value.filter(it=>it.gamePlayId!==i.gamePlayId)
        else activeData3DType.value = [...activeData3DType.value, i]
        if (!activeData3DType.value.length) {
            boardSubData3D.value.forEach(it=>{
                if (it.temp.length) it.temp=[]
            })
            activeData3D.value=[]
        }
    }
    watch(()=>[activeData3D.value,activeData3DType.value.map(it=>it.value)],(n,i)=>{
        if (i[1].length===0){
            if (activeData3D.value.length) activeData3D.value=[]
            lotteryHistory.set(type,ref([]))
        }else {
            const data=activeData3DType.value.map(it=>{
                const gPlayType=boardData3DType.value.find((it2:any)=>it2.value===it.value)
                return {
                    gamePlayCode:gPlayType!.gamePlayCode||it.value,
                    gamePlayTypeCode:playTypeCode.value,
                    // gamePlayCode:[...lotteryHistory.keys()][playTypeSetIndex.value],
                    gameType:type,
                    oneBetAmount:gPlayType!.betAmount,
                    winAmount:gPlayType!.winAmount,
                    betNums:toRaw(n[0])
                }
            })
            lotteryHistory.set(type,ref(data))
        }
    },{
        deep:true,
    })
    return {
        boardData3D,
        boardSubData3D,
        activeData3D,activeSubData3D,
        onAddAct3D,onAddActSub3D,
        activeData3DType,boardData3DType,
        onAddAct3DType
    }
}