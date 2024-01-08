import request, {request2} from "@/utils/request";
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
export function get<T=any>({url,data}:Request,uType:UrlType=0,noAuth:boolean=false):Promise<Response<T>> {
    return request?.get?.(url,data,{ noAuth },undefined,uType)
}
export function post<T=any>({url,data}:Request,uType:UrlType=0,noAuth:boolean=false):Promise<Response<T>> {
    return request?.post?.(url,data,{ noAuth},undefined,uType)
}
export function post2<T=any>({url,data}:Request):Promise<Response<T>> {
    return request2(url,'POST',data) as Promise<Response<T>>
}
export function abortReq<T=any>({url}:Request):void{
    // return request2(url).abort
}
export function put<T=any>({url,data}:Request,uType:UrlType=0):Promise<Response<T>> {
    return request?.put?.(url,data,{ noAuth: true },undefined,uType)
}
