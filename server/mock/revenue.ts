import mockjs from 'mockjs'
import type { IRevenue } from '~/types/dashboard'

export function mockRevenueList(amount: number): {
  revenueList: IRevenue[]
} {
  return mockjs.mock({
    [`revenueList|${amount}`]: [
      {
        'id|+1': 1,
        address: '@county(true)',
      },
    ],
  })
}
