import {defineComponent, onMounted, PropType} from "vue";
import './index.less'
interface boardType {
    label: string
    value: number
}
export default defineComponent({
    name: 'gameBoardPlay',
    emits: ['onCheck'],
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
            default: () => 'rgb(93, 202, 116)'
        },
        boardData: {
            type: Array as PropType<boardType[]>,
            required: true,
        },
        activeData: {
            type: Array as PropType<activeType[]>,
            default: () => []
        },
    },
    setup(props, {emit, slots}) {
        const btn = (v: any) => emit('onCheck', v)
        return () => <div class='gameBoardType' style={{"background-image": `url(${props.bg})`}}>
            <div class="title">
                {props.tit}
            </div>
            <div class="main">
                <div class="content">
                    {props.boardData.map(it => <div
                        style={{'--color': props.activeColor}}
                        class={props.activeData.map(it=>it.value).includes(it.value) ? 'active' : ''}
                        key={it.value} onClick={() => btn(it)}>
                        {it.label}
                    </div>)}
                </div>
            </div>
        </div>
    }
})