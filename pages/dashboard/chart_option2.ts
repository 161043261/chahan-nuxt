/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ECOption } from '@/utils/echarts'

const getChartOption2 = async (chartData: any) => {
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

  ;(chartOption.legend as any).data = chartData.data.map(({ name }) => name)
  for (let i = 0; i < chartData.data.length; i++) {
    ;(chartOption.series as any)[i].name = chartData.data[i].name
    ;(chartOption.series as any)[i].data = chartData.data[i].value
  }
  return chartOption
}

export default getChartOption2
