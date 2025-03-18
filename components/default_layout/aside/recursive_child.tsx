import './recursive_child.scss'

import { defineComponent, h } from 'vue'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import type { IMenuItem } from '~/types/user'
import { name2icon } from '~/utils/icons'
import { useTabState } from '~/composables/use_tab.state'

interface IProps {
  item: IMenuItem
}

const RecursiveChild = defineComponent({
  name: 'RecursiveChild',
  props: ['item'],

  setup(props: IProps) {
    const tabState = useTabState()
    const { addTab } = tabState

    const handleClick = (item: IMenuItem) => {
      const { name, icon, url } = item
      addTab(name, icon, url)
    }

    return () => (
      <div class="child-container">
        {props.item.children ? (
          <ElSubMenu index={props.item.name}>
            {{
              title: () => (
                <div>
                  <ElIcon>{h(name2icon.get(props.item.icon)!)}</ElIcon>
                  <span>{props.item.name}</span>
                </div>
              ),

              default: () => {
                return props.item.children!.map((child) => (
                  <RecursiveChild key={child.url} item={child}></RecursiveChild>
                ))
              },
            }}
          </ElSubMenu>
        ) : props.item.url !== '/order/detail' ? (
          <ElMenuItem
            index={props.item.url}
            onClick={() => handleClick(props.item)}
            class="duration-500"
          >
            <ElIcon>{h(name2icon.get(props.item.icon)!)}</ElIcon>
            <span>{props.item.name}</span>
          </ElMenuItem>
        ) : <></>}
      </div>
    )
  },
})

export default RecursiveChild
