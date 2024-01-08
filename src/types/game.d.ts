export {}
declare global {
    type GamePlay = {
        gamePlayId: string;
        gamePlayName: string;
        gamePlayCode: string;
        winAmount: number;
        betAmount: number;
    };

    type GamePlayType = {
        gamePlayList: GamePlay[];
        gamePlayTypeName: string;
        gamePlayTypeCode: string;
    };
    type GameInfo = {
        gameId: string;
        gameName: string;
        gamePlayAndTypeListRespList: GamePlayType[];
        sealingTime: string;
    };
    type AwardNum = {
        head: string;
        firstThree: string;
        countdown: string;
        end: string;
        gameCode: string;
        afterThree: string;
        lastAwardPeriod: string;
        awardPeriod:string
    };
    interface activeType {
        gamePlayId:string
        value:number
    }
}