import { defineComponent } from 'vue'

export default defineComponent(
  (props, ctx) => {
    const { slots } = ctx
    return () => (
      <div>
        <h1>默认布局的页眉</h1>
        {slots.default ? slots.default() : <></>}
      </div>
    )
  },
  { name: 'default' },
)
