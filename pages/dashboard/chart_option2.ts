/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ECOption } from '@/utils/echarts'
import type { ChartData2 } from '~/types/chart'
import type { Res } from '~/types/resp'

const getChartOption2 = async () => {
  const res = await $fetch/** useFetch */ <Res<ChartData2>>('/api/chart/2')
  const chartOption: ECOption = {
    title: {
      text: '机器人电量统计',
    },
    tooltip: {
      trigger: 'axis', // 坐标轴触发
    },
    legend: {
      data: [],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '',
        type: 'line',
        data: [],
        lineStyle: { width: 3 },
        itemStyle: {
          // --color-1st: #3d8d7a;
          color: '#3d8d7a',
          shadowBlur: 5,
          shadowColor: '#ccc',
        },
        smooth: true,
      },
      {
        name: '',
        type: 'line',
        data: [],
        lineStyle: { width: 3 },
        itemStyle: {
          // --color-2nd: #b3d8a8;
          color: '#b3d8a8',
          shadowBlur: 5,
          shadowColor: '#ccc',
        },
        smooth: true,
      },
      {
        name: '',
        type: 'line',
        data: [],
        lineStyle: { width: 3 },
        itemStyle: {
          // --color-4th: #a3d1c6;
          color: '#a3d1c6',
          shadowBlur: 5,
          shadowColor: '#ccc',
        },
        smooth: true,
      },
    ],
  }

  ;(chartOption.legend as any).data = res.data.map(({ name }) => name)
  for (let i = 0; i < res.data.length; i++) {
    ;(chartOption.series as any)[i].name = res.data[i].name
    ;(chartOption.series as any)[i].data = res.data[i].data
  }
  return chartOption
}

export default getChartOption2
