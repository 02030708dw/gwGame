const filterNum = (v:any) => {
  return v.replace(/[^\d]/g, '')
}
export {
  filterNum
}