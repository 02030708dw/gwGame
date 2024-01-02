function calData(length: number, format = ['label', 'value']) {
    return Array(length).fill(0).map((_, i) => (
        {[format[0]]: String(i), [format[1]]: i}))
}
function calData2D(length: number, format = ['label', 'value']) {
    return Array(length).fill(0).map((_, i) => (
        {[format[0]]: i<10?'0'+i:String(i), [format[1]]: i}))
}
function calData3D(length: number, format = ['label', 'value']) {
    return Array(length).fill(0).map((_, i) => (
        {[format[0]]: i<10?'00'+i:i>=10&&i<100?'0'+i:String(i), [format[1]]: i}))
}
export {
    calData,calData2D,calData3D
}