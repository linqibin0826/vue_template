// 根据当前时间获取 是上午还是下午还是晚上
export const getDayPeriod = () => {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 12) {
    return '上午'
  } else if (hour >= 12 && hour < 18) {
    return '下午'
  } else {
    return '晚上'
  }
}
