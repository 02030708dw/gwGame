import { http } from ".";
const gameListAPI = (type: number) =>
  http({ url: `/gameRecords/game/${type}`, method: "GET" });
export {gameListAPI}