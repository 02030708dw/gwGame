import {computed, nextTick, onMounted, Ref, ref, watch, watchEffect} from "vue";
export default function (playDataType: GamePlayType[]) {
    const playType = ref(0)
    const activeDataPlayType=ref([0])
    const playTypeData = ref<any[]>([
        { label: "1D", value: 0 },
        { label: "2D", value: 1 },
        { label: "3D", value: 2 },
    ])
    const onAddActType = (i: number) => {
        playType.value=i
        activeDataPlayType.value=[i]
    }
    const playTypeCode=computed(()=>playTypeData.value.find(it=>it.value===playType.value)!.code)
    return {
        playType,playTypeData,activeDataPlayType,playTypeCode,onAddActType
    }
}