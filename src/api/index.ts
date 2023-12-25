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
export enum UrlType {
    info,
    bet,
    init,
}
export function get<T=any>({url,data}:Request,uType:UrlType=0):Promise<Response<T>> {
    return request?.get?.(url,data,{ noAuth: true },undefined,uType)
}
export function post<T=any>({url,data}:Request,uType:UrlType=0):Promise<Response<T>> {
    return request?.post?.(url,data,{ noAuth: true },undefined,uType)
}
export function put<T=any>({url,data}:Request,uType:UrlType=0):Promise<Response<T>> {
    return request?.put?.(url,data,{ noAuth: true },undefined,uType)
}
