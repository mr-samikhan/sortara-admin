import React from 'react'
import { AppLayout } from '@vgl/layout'
import { CreateAdForm, useAds } from '@vgl/modules'

const CreateAdContainer = () => {
  const { methods, onSubmit } = useAds()
  return (
    <React.Fragment>
      <AppLayout>
        <CreateAdForm methods={methods} onSubmit={onSubmit} />
      </AppLayout>
    </React.Fragment>
  )
}

export default CreateAdContainer
