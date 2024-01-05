import { defineStore } from "pinia";
import { get } from "@/api";
import th from "../../static/images/th.png";
import vnd from "@/static/images/vnd.png";
import ph from "@/static/images/ph.png";
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
        console.log(it);
        // 选择图片
        let imageUrl;
        if (it.countryName === "越南") {
          imageUrl = vnd;
        } else if (it.countryName === "泰国") {
          imageUrl = th;
        } else if (it.countryName === "菲律宾") {
          imageUrl = ph;
        } else {
          imageUrl = ""; // 默认图片或者不设置
        }

        console.log(imageUrl);

        return {
          ...it, // 展开原有的所有字段
          games: it.games.filter((game: any) => game.vndArea === null), // 对games字段进行过滤
          url: `/desired/path/${it.someIdentifier}`, // 添加新的url字段
          imageUrl: imageUrl, // 添加图片URL
        };
      });
      console.log(this.gameList);
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
  },
});
export default gameListStore;
