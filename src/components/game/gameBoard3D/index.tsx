import {computed, defineComponent, nextTick, onMounted, PropType, watchEffect} from "vue";
import './index.less'
import {Badge} from "vant";
import RecordBadge from "@/components/game/gameBoard3D/recordBadge";

interface boardType {
    label: string
    value: number
}
type board3dType= {range: number, label: string, value: number, temp: number[]}
export default defineComponent({
    name: 'gameBoard3D',
    emits: ['onCheck','onSubCheck'],
    props: {
        tit:{
          type:String,
          default:()=>'Fred Hill'
        },
        bg: {
            type: String,
            required: true
        }, activeColor: {
            type: String,
            default: () => '#4ABBE9'
        },
        boardData: {
            type: Array as PropType<boardType[]>,
            required: true,
        },
        boardSubData: {
            type: Array as PropType<board3dType[]>,
            default: () => []
        },
        activeData: {
            type: Array as PropType<number[]>,
            default: () => []
        },
        activeSubData: {
            type: Array as PropType<number[]>,
            default: () => []
        }
    },
    setup(props, {emit, slots}) {
        const btn = (v: number,r:[number,number]) => emit('onCheck', v,r)
        const btnSub = (v: number) => emit('onSubCheck', v)
        const sliceNum=computed<[number,number]>(()=>{
            return [props.activeSubData[0]*100,props.activeSubData[0]*100+100]
        })
        return () => <div class='gameBoard3D' style={{"background-image": `url(${props.bg})`}}>
            <div class="title">
                {props.tit}
            </div>
            <div class="main">
                {!slots.top &&props.boardSubData.length&&<div class="top">
                    {props.boardSubData.map((it,i) => <div
                        style={{'--color': props.activeColor}}
                        class={props.activeSubData.includes(it.value) ? 'active' : ''}
                        key={it.value} onClick={() => btnSub(it.value)}>
                        {it.label}
                        <RecordBadge acData={it.temp.length}/>
                    </div>)}
                </div> || slots.top?.(props.boardSubData)}
                <div class="content">
                    {props.boardData.slice(sliceNum.value[0],sliceNum.value[1]).map(it => <div
                        style={{'--color': props.activeColor}}
                        class={props.activeData.includes(it.value) ? 'active' : ''}
                        key={it.value} onClick={() => btn(it.value,sliceNum.value)}>
                        {it.label}
                    </div>)}
                </div>
            </div>
        </div>
    }
})