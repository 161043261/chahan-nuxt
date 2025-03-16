/* eslint-disable @typescript-eslint/no-explicit-any */

import { ROBOT_STATES } from '@/constants'
import type { ECOption } from '@/utils/echarts'
import type { ChartData3 } from '~/types/chart'
import type { Resp } from '~/types/resp'

const getChartOption3 = async () => {
  const { data: chartData } = await useFetch<Resp<ChartData3>>('/api/chart/3')
  const chartOption: ECOption = {
    radar: {
      shape: 'circle',
      indicator: ROBOT_STATES.map((state) => ({ name: state, max: 100 })),
    },
    series: [
      {
        name: '机器人运行状态',
        type: 'radar',
        // --color-1st: #3d8d7a;
        color: '#3d8d7a',
        data: [
          {
            value: [],
            name: '机器人运行状态',
          },
        ],
      },
    ],
  }

  ;(chartOption.series as any)[0].data[0].value = chartData.value?.data
  return chartOption
}

export default getChartOption3
