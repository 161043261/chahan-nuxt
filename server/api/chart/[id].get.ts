import type { ChartData, ChartData2, ChartData3, ChartData4 } from '~/types/chart'
import { randArr, randNum } from '~/utils'

export default defineEventHandler(async (event) => {
  const chartId = Number.parseInt(event.context.params?.id ?? '')
  if (!Number.isInteger(chartId) || chartId <= 0 || chartId > 4) {
    throw createError({ message: 'chartId 错误' })
  }

  // 1 2 3 4
  switch (chartId) {
    case 1:
      return [
        { name: '炒饭A', value: randNum(1, 100) },
        { name: '炒饭B', value: randNum(1, 100) },
        { name: '炒饭C', value: randNum(1, 100) },
      ] as ChartData

    case 2:
      return [
        { name: '充电量', value: randArr(1, 100, 9) },
        { name: '充电时长', value: randArr(1, 100, 9) },
        { name: '充电功率', value: randArr(1, 100, 9) },
      ] as ChartData2

    case 3:
      return randArr(1, 100, 5) as ChartData3

    case 4:
      return [
        { name: '出租', value: randArr(1, 100, 12) },
        { name: '出售', value: randArr(1, 100, 12) },
      ] as ChartData4
  }
})
