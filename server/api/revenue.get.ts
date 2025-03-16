import { randNum } from '~/utils'
import { mockRevenueList } from '../mock/revenue'

export default defineEventHandler(async (/** event */) => {
  const amount = randNum(100_000, 200_000)
  const { revenueList } = mockRevenueList(amount)
  return revenueList
})
