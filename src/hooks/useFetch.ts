import {post2} from "@/api";
import {ref, Ref} from "vue";

export default function (url: string, delay = 1000, distance: number = 5) {
    const abort = ref<boolean>(false)
    const timer=ref(123)
    const getGameAward = (data: any, callback: (...args: any) => void) => new Promise((resolve,reject) => {
            post2({url, data}).then(v => {
                timer.value = Number(v.resultSet.awardNum.countdown)
                if (abort.value) {
                    reject('abortion');
                    return;
                }
                if (timer.value - distance <= 0) {
                    callback(v)
                    setTimeout(() => getGameAward(data, callback), delay)
                } else {
                    resolve(v)
                    return;
                }
            })
        }
    )
    return {
        getGameAward, abort
    }
}
