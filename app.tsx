import { NuxtLayout, NuxtLoadingIndicator, NuxtPage } from '#components'

export default defineComponent(() => () => (
  <main>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
))
