import React from 'react'
import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { SingleModerator } from '@vgl/modules'

const ManageProfileContainer = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <React.Fragment>
      <SingleModerator user={user} />
    </React.Fragment>
  )
}

export default ManageProfileContainer
