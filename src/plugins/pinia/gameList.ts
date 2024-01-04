import {defineStore} from "pinia";
import {get} from "@/api";
interface GameList {
    games:any[],
    countryName:string
}
const gameListStore = defineStore('gameListStore',{
    state:()=>{
        return {
            gameList:[] as GameList[]
        }
    },
    actions:{
        async getList(){
            let r=await get({
                url:'/gameRecords/game'
            })
            this.gameList=r.resultSet.map((it:any)=>({...it,games:it.games.filter((it:any)=>it.vndArea===null)}))
            console.log(this.gameList)
        }
    },
    getters:{
        getSelectData:state=> (name:string)=>
            state.gameList.find(it=>it.countryName===name)!.games
    }
})
export default gameListStore