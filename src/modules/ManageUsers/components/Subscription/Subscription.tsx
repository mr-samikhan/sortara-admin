import React from 'react'
import { Box, Typography } from '@mui/material'
import { UserAccountDetailsProps } from '../components'

interface ISubscription {
  user: UserAccountDetailsProps['user']
}

const Subscription = (props: ISubscription) => {
  const { user } = props || {}

  const Typo = ({
    title,
    fontWeight,
  }: {
    title: string
    fontWeight?: number
  }) => (
    <Typography
      variant="h1"
      fontWeight={fontWeight}
      fontSize={{ xs: '15px !important', md: '20px !important' }}
    >
      {title}
    </Typography>
  )

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h1"
          fontSize={{ xs: '15px !important', md: '20px !important' }}
        >
          Subscription
        </Typography>
        <Typography
          variant="h1"
          fontWeight={400}
          fontSize={{ xs: '15px !important', md: '20px !important' }}
        >
          {user.status ? 'Active' : 'Inactive'}
        </Typography>
      </Box>
      <Box display="flex" gap={2} alignItems="center" mt={2}>
        <Typo title="Subscription Plan" />
        <Typo title="Activated on 1/12/23" fontWeight={400} />
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Typo title="Renewal Date" />
        <Typo title="2/12/23" fontWeight={400} />
      </Box>
      <Box mt={7}></Box>
    </React.Fragment>
  )
}

export default Subscription
