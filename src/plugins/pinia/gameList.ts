import { defineStore } from "pinia";
import { get } from "@/api";
interface GameList {
  games: any[];
  countryName: string;
}
const gameListStore = defineStore("gameListStore", {
  persist: true,
  state: () => {
    return {
      gameList: [] as GameList[],
      balance: 0 as number,
    };
  },
  actions: {
    async getList() {
      let r = await get({
        url: "/gameRecords/game",
      });
      this.gameList = r.resultSet.map((it: any) => {
        return {
          ...it, // 展开原有的所有字段
          games: it.games.filter((game: any) => game.vndArea === null), // 对games字段进行过滤
        };
      });
    },
    async getBalance() {
      let r = await get({
        url: "/memberWallet",
      });
      this.balance = Number(r.resultSet.balance);
    },
  },
  getters: {
    getSelectData: (state) => (name: string) =>
      state.gameList.find((it) => it.countryName === name)!.games,
    getBalanceF: (state) =>
      new Intl.NumberFormat("en-US").format(state.balance),
/*    allocateGameList:(state)=>(an:any[])=>
        state.gameList.forEach(it=>{
          it.img
        })*/
  },
});
export default gameListStore;
