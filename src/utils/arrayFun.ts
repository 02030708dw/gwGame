function calData(length: number, format = ['label', 'value']) {
    return Array(length).fill(0).map((_, i) => (
        {[format[0]]: String(i), [format[1]]: i}))
}

export {
    calData
}