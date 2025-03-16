import type { ChartData, ChartData2, ChartData3 } from '~/types/chart'
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
        { name: '炒饭A', data: randNum(1, 100) },
        { name: '炒饭B', data: randNum(1, 100) },
        { name: '炒饭C', data: randNum(1, 100) },
      ] as ChartData

    case 2:
      return [
        { name: '充电量', data: randArr(1, 100, 9) },
        { name: '充电时长', data: randArr(1, 100, 9) },
        { name: '充电功率', data: randArr(1, 100, 9) },
      ] as ChartData2

    case 3:
      return randArr(1, 100, 5) as ChartData3
  }
})
