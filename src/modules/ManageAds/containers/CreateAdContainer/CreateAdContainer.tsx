import React from 'react'
import { AppLayout } from '@vgl/layout'
import { CreateAdForm, CustomModal, LiveModal, useAds } from '@vgl/modules'

const CreateAdContainer = () => {
  const { methods, onSubmit, onModalToggle, adValues, onDeleteAd } = useAds()
  const { isDelete, isLive } = adValues || {}
  return (
    <React.Fragment>
      <AppLayout>
        <CreateAdForm
          methods={methods}
          onSubmit={onSubmit}
          onDeletePress={onModalToggle}
          onLivePress={() => onModalToggle('isLive', true)}
        />
        {isDelete && (
          <CustomModal
            open={isDelete}
            title="Delete ad"
            confirmText="Yes, delete"
            onConfirm={() => onDeleteAd()}
            onClose={() => onModalToggle('isDelete', false)}
            description="Are you sure you want to delete this ad?"
          />
        )}
        {isLive && (
          <CustomModal
            open={isLive}
            onClose={() => onModalToggle('isLive', false)}
          >
            <LiveModal
              onClose={() => onModalToggle('isLive', false)}
              onConfirm={() => onModalToggle('isLive', false)}
            />
          </CustomModal>
        )}
      </AppLayout>
    </React.Fragment>
  )
}

export default CreateAdContainer
