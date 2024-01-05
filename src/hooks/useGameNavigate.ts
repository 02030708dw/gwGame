import {storeToRefs} from "pinia";
import gameListStore from "@/plugins/pinia/gameList";
import {disposeUrl} from "@/utils/tools";
export default function (data?:any) {
    const {getSelectData}=storeToRefs(gameListStore())
    const onGameSelect = (id:string,countryName:string) => {
        const ndata=getSelectData.value(countryName).find(it=>it.gameId===id)
        switch (countryName) {
            case '越南':
                return router('vietnameseLottery',{...data,countryName,...ndata})
            case '泰国':
                return router('thailandLottery',{...data,countryName,...ndata})
            default:
                return router('philippinesLottery',{...data,countryName,...ndata})
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