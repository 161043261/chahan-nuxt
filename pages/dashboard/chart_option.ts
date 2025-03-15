/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ECOption } from '~/utils/echarts'

const getChartOption = async (chartData: any) => {
  const chartOption: ECOption = {
    legend: {
      top: 'bottom',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br />{b}:{c}',
    },
    series: [
      {
        name: '机器人营收比例',
        type: 'pie',
        // --color-4th: #a3d1c6;
        // --color-2nd: #b3d8a8;
        // --color-1st: #3d8d7a;
        color: ['#a3d1c6', '#b3d8a8', '#3d8d7a'],
        radius: ['50', '70'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 10,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
          },
        },
        data: [],
      },
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: '营收比例',
        fontSize: '16',
        fill: '#333',
      },
    },
  }
  for (let i = 0; i < chartData.data.length; i++) {
    ;(chartOption.series as any)[0].data = chartData.data
  }
  return chartOption
}

export default getChartOption
