import { AppLayout } from '@vgl/layout'
import { AdvertisementDetailsUI } from '@vgl/modules'

const AdvertisementContainer = () => {
  return (
    <AppLayout isSidebar isHeader navigationText=" ">
      <AdvertisementDetailsUI />
    </AppLayout>
  )
}

export default AdvertisementContainer
