export const recurseArr = (newArr) => {
  return newArr.map((item) => {
    if (item.length === 2) {
      return item.reverse()
    } else {
      return recurseArr(item)
    }
  })
}
