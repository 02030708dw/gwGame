import request from "@/utils/request";
interface Request{
    url:string,
    data?:any
}
interface Response<T>{
    resCode:string,
    resDesc:string
    resultSet:T
}
export function get<T=any>({url,data}:Request):Promise<Response<T>> {
    return request?.get?.(url,data,{ noAuth: true })
}
export function post<T=any>({url,data}:Request):Promise<Response<T>> {
    return request?.post?.(url,data,{ noAuth: true })
}
export function put<T=any>({url,data}:Request):Promise<Response<T>> {
    return request?.put?.(url,data,{ noAuth: true })
}
