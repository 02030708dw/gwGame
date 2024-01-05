import {defineComponent, onMounted, PropType} from "vue";
import './index.less'

interface boardType {
    label: string
    value: number
}

export default defineComponent({
    name: 'gameBoard',
    emits: ['onCheck','onSubCheck'],
    props: {
        claType:{
          type:String,
          default:()=>'gameBoard'
        },
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
            type: Array as PropType<boardType[]>,
            default: () => []
        },
        activeData: {
            type: Array as PropType<number[]>,
            default: () => []
        },
        activeSubData: {
            type: Array as PropType<number[]>,
            default: () => []
        },
        disBtn:{
            type:Boolean,
            default:()=>true
        }
    },
    setup(props, {emit, slots}) {
        const btn = (v: number) => emit('onCheck', v)
        const btnSub = (v: number) => emit('onSubCheck', v)
        return () => <div class={props.claType} style={{"background-image": `url(${props.bg})`}}>
            <div class="title">
                {props.tit}
            </div>
            <div class="main">
                {!slots.top &&props.boardSubData.length&&<div class="top">
                    {props.boardSubData.map(it => <div
                        style={{'--color': props.activeColor}}
                        class={props.activeSubData.includes(it.value) ? 'active' : ''}
                        key={it.value} onClick={() => btnSub(it.value)}>
                        {it.label}
                    </div>)}
                </div> || slots.top?.(props.boardSubData)}
                <div class={props.disBtn?"content dis":"content"}>
                    {props.boardData.map(it => <div
                        style={{'--color': props.activeColor}}
                        class={props.activeData.includes(it.value) ? 'active' : ''}
                        key={it.value} onClick={() => btn(it.value)}>
                        {it.label}
                    </div>)}
                </div>
            </div>
        </div>
    }
})