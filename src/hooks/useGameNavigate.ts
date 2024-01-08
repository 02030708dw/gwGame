import {storeToRefs} from "pinia";
import gameListStore from "@/plugins/pinia/gameList";
import {disposeUrl} from "@/utils/tools";
import {Ref} from "vue";
export default function (status:Ref<boolean>) {
    const {getSelectData}=storeToRefs(gameListStore())
    const onGameSelect = (id:string,countryName:string) => {
        status.value=true
        const ndata=getSelectData.value(countryName).find(it=>it.gameId===id)
        switch (countryName) {
            case '越南':
                return router('vietnameseLottery',{countryName,...ndata})
            case '泰国':
                return router('thailandLottery',{countryName,...ndata})
            default:
                return router('philippinesLottery',{countryName,...ndata})
        }
    };
    const router = (url:string,data:any) => {
        uni.redirectTo({
            url: `/views/game/${disposeUrl(url,data)}`,
            // animationType: "pop-in",
            // animationDuration: 300,
        });
    }
    return {
        onGameSelect
    }
}