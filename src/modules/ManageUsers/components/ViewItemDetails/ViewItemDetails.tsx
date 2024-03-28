import React from 'react'
import { Grid } from '@mui/material'
import { COLORS } from '@vgl/constants'
import { CommentsAndReactions, ItemCard } from '../components'

interface ViewItemDetailsProps {
  data: any
}

const ViewItemDetails = (props: ViewItemDetailsProps) => {
  const { data } = props || {}
  console.log(data)

  return (
    <React.Fragment>
      <Grid container bgcolor={COLORS.background} p={{ xs: 2, md: 0 }}>
        <Grid item md={4}></Grid>
        <Grid item md={3} xs={12}>
          <ItemCard
            likes={2}
            comments={5}
            type="Private"
            listName="List Name"
            image="/assets/images/dog.svg"
          />
        </Grid>
        <Grid item md={3}>
          <CommentsAndReactions />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ViewItemDetails
