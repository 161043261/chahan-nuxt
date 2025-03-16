import { Attention, Caution, CheckOne, CloseOne } from '@icon-park/vue-next'
import { defineComponent, onBeforeUnmount, ref, Transition } from 'vue'
import './toast.module.scss'

interface Props {
  message: string
  type: 'success' | 'error' | 'warning' | 'default'
  duration: number //! duration >= 500 && duration <= 2500, default 1500
}

// export default defineComponent({
//   props: ['message', 'type', 'duration'],
//   // emits
//   // expose
//   name: 'ToastIndex',
//   setup(props: Props, ctx /** { attrs, slots, emit, expose } */) {
//     console.log(props)
//     const isAlive = ref(false)
//     let timer: number | null = null

//     // 资源清理
//     onBeforeUnmount(() => {
//       if (timer) {
//         clearTimeout(timer)
//         timer = null
//       }
//     })

//     const mount = () => {
//       //! throttle
//       if (timer) {
//         return
//       }
//       isAlive.value = true
//       console.log(props.duration)
//       timer = setTimeout(() => {
//         isAlive.value = false
//         timer = null
//       }, props.duration)
//     }

//     //! tsx `expose` (sfc `defineExpose`)
//     ctx.expose({ mount, isAlive })
//     return () => (
//       <div>
//         <Transition name="fade">
//           {isAlive.value ? (
//             <div class="border-1st fixed top-[10%] left-[50%] z-100 -translate-x-[50%] rounded-lg border-[3px] p-[5px]">
//               <div class="flex items-center gap-[5px]">
//                 {((type: string) => {
//                   switch (type) {
//                     case 'success':
//                       return <CheckOne theme="filled" size="24" fill="#7ed321" />
//                     case 'error':
//                       return <CloseOne theme="filled" size="24" fill="#d0021b" />
//                     case 'warning':
//                       return <Caution theme="filled" size="24" fill="#f5a623" />
//                     default:
//                       return <Attention theme="filled" size="24" fill="#4a90e2" />
//                   }
//                 })(props.type)}
//                 <span>{props.message}</span>
//               </div>
//             </div>
//           ) : (
//             ''
//           )}
//         </Transition>
//       </div>
//     )
//   },
// })

// export default defineComponent(() => () => <></>)
export default defineComponent(
  (props: Props, ctx /** { attrs, slots, emit, expose } */) => {
    const isAlive = ref(false)
    let timer: number | null | NodeJS.Timeout = null

    // 资源清理
    onBeforeUnmount(() => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    })

    const mount = () => {
      //! throttle
      if (timer) {
        return
      }
      isAlive.value = true
      timer = setTimeout(() => {
        isAlive.value = false
        timer = null
      }, props.duration)
    }

    //! tsx `expose` (sfc `defineExpose`)
    ctx.expose({ mount, isAlive })
    return () => (
      <div>
        <Transition name="fade">
          {isAlive.value ? (
            <div class="border-1st fixed top-[10%] left-[50%] z-100 -translate-x-[50%] rounded-lg border-[3px] p-[5px]">
              <div class="flex items-center gap-[5px]">
                {
                  ((type: string) => {
                    switch (type) {
                      case 'success':
                        return <CheckOne theme="filled" size="24" fill="#7ed321" />
                      case 'error':
                        return <CloseOne theme="filled" size="24" fill="#d0021b" />
                      case 'warning':
                        return <Caution theme="filled" size="24" fill="#f5a623" />
                      default:
                        return <Attention theme="filled" size="24" fill="#4a90e2" />
                    }
                  })(props.type) /** IIFE, Immediately Invoked Function Expression */
                }
                <span>{props.message}</span>
              </div>
            </div>
          ) : (
            ''
          )}
        </Transition>
      </div>
    )
  } /** setup */,
  {
    props: ['duration', 'message', 'type'],
    // slots
    // emits
    name: 'ToastIndex',
  },
)
