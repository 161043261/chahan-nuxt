import { ElAside, ElContainer, ElHeader, ElMain } from 'element-plus'
import { defineComponent } from 'vue'
import AsideMenu from '~/components/default_layout/aside/aside_menu'
import HeaderIndex from '~/components/default_layout/header/header_index'
import LayoutTab from '~/components/default_layout/layout_tab'
import bus from '~/utils/bus'

export default defineComponent(
  (props, ctx) => {
    const watermarked = ref(false)

    const tabContainerRef = useTemplateRef<InstanceType<typeof ElMain>>('tabContainerRef')
    bus.subscribe('store-scrollTop', () => {
      sessionStorage.setItem('scroll-top', tabContainerRef.value?.$el.scrollTop.toString())
      tabContainerRef.value!.$el.scrollTop = 0
    })
    bus.subscribe('set-scrollTop', () => {
      tabContainerRef.value!.$el.scrollTop = Number.parseFloat(
        sessionStorage.getItem('scroll-top')!,
      )
    })

    const { slots } = ctx
    return () => (
      <ElContainer>
        <ElAside class="!h-dvh !w-[200px] bg-white shadow-lg">
          <AsideMenu />
        </ElAside>

        <ElContainer>
          <ElHeader class="z-10 !h-[10vh] !p-0">
            <HeaderIndex
              onSwitchWatermark={(isAlive: boolean) => (watermarked.value = isAlive)}
            ></HeaderIndex>
          </ElHeader>
          <ElMain class="!h-[90vh]" ref="tabContainerRef">
            <LayoutTab watermarked={watermarked.value}>
              {{
                default: () => (slots.default ? slots.default() : <></>),
              }}
              {/* {slots.default ? slots.default() : <></>} */}
            </LayoutTab>
          </ElMain>
        </ElContainer>
      </ElContainer>
    )
  },
  { name: 'default' },
)
