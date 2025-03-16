<script lang="tsx" setup>
import toast from '~/utils/toast'
import { useUserState } from '~/composables/useUser.state'
import { useChart } from '~/composables/useChart'
import getChartOption from './chart_option'
import getChartOption2 from './chart_option2'
import getChartOption3 from './chart_option3'
import type { IRevenue, ITimeLine } from '~/types/dashboard'
import { commaSep } from '~/utils/comma_sep'

const userState = useUserState()
const { menu } = userState
const chartRef = ref<HTMLDivElement | null>(null)
const chartRef2 = ref<HTMLDivElement | null>(null)
const chartRef3 = ref<HTMLDivElement | null>(null)
const updateChart = useChart(chartRef, getChartOption)
const updateChart2 = useChart(chartRef2, getChartOption2)
const updateChart3 = useChart(chartRef3, getChartOption3)

const renderFunc = (props: { item: IRevenue; idx: number }) => {
  return (
    <div
      class={['flex']}
      style={{
        backgroundColor: `${props.idx % 2 === 0 ? '#e8f9ff' : '#fff'}`,
      }}
    >
      <div class="w-[20%] text-center">{`${commaSep(props.item.revenue ?? 0)}`}</div>
      <div class="w-[80%] truncate">{`${props.item.address}`}</div>
    </div>
  )
}

const timelineList = reactive<ITimeLine[]>([
  /** { timestamp: Date.now(), message: '测试' } */
])

const formatter = (timestamp: number) => {
  const date = new Date(timestamp)
  const hh = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}
</script>

<template>
  <main>
    <ElRow :gutter="20">
      <ElCol :span="18">
        <!--! 150px, 150px -->
        <ElCard class="h-[150px] !rounded-3xl">
          <template #header>
            <h1 class="text-[20px]">快捷方式</h1>
          </template>
          <div class="flex justify-center gap-[60px]">
            <!-- <RecursiveChild v-for="item of menuList" :key="item.url" :item="item"/> -->
          </div>
        </ElCard>

        <!--! 20px + 500px, 670px -->
        <ElCard class="mt-[20px] h-[500px] !rounded-3xl">
          <template #header>
            <div class="flex items-center gap-[10px]">
              <h1 class="text-[20px]">炒饭机器人统计</h1>
              <Refresh
                theme="outline"
                size="24"
                fill="#333"
                :stroke-width="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 0 }"
                @click="handleClick(0, [updateChart, updateChart2])"
              />
            </div>
          </template>
          <ElRow>
            <ElCol :span="8">
              <div ref="chartRef" class="h-[400px] w-[100%]" />
            </ElCol>
            <ElCol :span="16">
              <div ref="chartRef2" class="h-[400px] w-[100%]" />
            </ElCol>
          </ElRow>
        </ElCard>

        <!--! 20px + 508px, 1198px -->
        <ElCard class="mt-[20px] !rounded-3xl">
          <template #header>
            <div class="flex items-center gap-[10px]">
              <h1 class="text-[20px]">营收排行榜, 数据量 {{ virtualListSize }}</h1>
              <Refresh
                theme="outline"
                size="24"
                fill="#333"
                :stroke-width="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 2 }"
                @click="handleClick(2, [() => virtualListRef?.updateLargeList()])"
              />
            </div>
          </template>
          <Suspense>
            <template #default>
              <VirtualList
                :item-height="50"
                :render-func="renderFunc"
                :height="400"
                :get-large-list="getRevenueList"
                ref="virtualListRef"
              />
            </template>
            <template #fallback />
          </Suspense>
        </ElCard>
      </ElCol>

      <ElCol :span="6">
        <!--! 370px, 370px-->
        <ElCard class="h-[370px] !rounded-3xl">
          <template #header>
            <div class="flex items-center gap-[10px]">
              <h1 class="text-[20px]">机器人五边形数据</h1>
              <Refresh
                theme="outline"
                size="24"
                fill="#333"
                :stroke-width="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 1 }"
                @click="handleClick(1, [updateChart3])"
              />
            </div>
          </template>
          <div ref="chartRef3" class="h-[240px] w-[100%]" />
        </ElCard>

        <!--! 20px + 808px, 1198px -->
        <ElCard class="mt-[20px] h-[500px] !rounded-3xl">
          <ElTimeline class="overflow-auto">
            <ElTimelineItem
              v-for="timeline of timelineList"
              center
              :timestamp="formatter(timeline.timestamp)"
              :key="timeline.timestamp"
            >
              <ElCard class="!rounded-xl">
                {{ timeline.message }}
              </ElCard>
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
    </ElRow>
  </main>
</template>

<style></style>
