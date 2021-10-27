export const recurseArr = (newArr) => {
  return newArr.map((item) => {
    if (item.length === 2) {
      return [item[1], item[0]]
    } else {
      return recurseArr(item)
    }
  })
}
