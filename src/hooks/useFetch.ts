import {post2} from "@/api";
import {ref, Ref} from "vue";

export default function (url: string, delay = 1000, distance: number = 5) {
    const abort = ref<boolean>(false)
    const getGameAward = (data: any, callback: (...args: any) => void) => new Promise((resolve,reject) =>
        post2({url, data}).then(v => {
            const time=Number(v.resultSet.awardNum.countdown)
                if (abort.value) {
                    reject('abortion');
                    return;
                }
                console.log(time,time-distance)
                if (time-distance <= 0) {
                    callback(v)
                    console.log(v)
                    setTimeout(() => getGameAward(data, callback), delay)
                }else {
                    console.log(v)
                    resolve(v)
                    return;
                }
            })
    )
    return {
        getGameAward, abort
    }
}
