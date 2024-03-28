import React from 'react'
import { COLORS, FONTS } from '@vgl/constants'
import { Box, Chip, Grid, Typography } from '@mui/material'
import {
  Details,
  AllLists,
  Management,
  Subscription,
  SafetyReports,
} from '../components'

export interface UserAccountDetailsProps {
  onViewClick: (item: any) => void
  onRemoveClick: (item: any) => void
  user: {
    name: string
    email: string
    phone: string
    username: string
    status: boolean
  }
}

const UserAccountDetails = (props: UserAccountDetailsProps) => {
  const { user, onRemoveClick, onViewClick } = props || {}

  const Container = ({ children }: { children: React.ReactNode }) => (
    <Box
      p={2}
      display="flex"
      borderRadius="14px"
      alignItems="center"
      justifyContent="center"
      bgcolor={COLORS.white}
      height={{ xs: 'auto', md: 36 }}
    >
      {children}
    </Box>
  )

  const DetailsWrapper = ({ children }: { children: React.ReactNode }) => (
    <Box
      p={2}
      display="flex"
      bgcolor={COLORS.white}
      flexDirection="column"
      borderRadius="4px"
    >
      {children}
    </Box>
  )

  return (
    <React.Fragment>
      <Typography variant="h1">{user.name}</Typography>
      <Box display="flex" gap={3} my={2}>
        <Container>
          <Typography
            fontWeight={700}
            fontFamily={FONTS.LATO}
            fontSize={{ xs: 12, md: 20 }}
          >
            Date Joined:
          </Typography>
          <Typography
            fontWeight={400}
            fontFamily={FONTS.LATO}
            fontSize={{ xs: 12, md: 20 }}
          >
            Date
          </Typography>
        </Container>
        <Container>
          <Typography
            fontWeight={700}
            fontFamily={FONTS.LATO}
            fontSize={{ xs: 12, md: 20 }}
          >
            Last Login:
          </Typography>
          <Typography
            fontWeight={400}
            fontFamily={FONTS.LATO}
            fontSize={{ xs: 12, md: 20 }}
          >
            DATE + TIME
          </Typography>
        </Container>
        <Box>
          <Chip
            label={user.status ? 'Active' : 'In Active'}
            color="secondary"
            sx={chipStyle}
          />
        </Box>
      </Box>
      <Grid container spacing={3} maxWidth={1200}>
        <Grid item xs={12} md={6}>
          <DetailsWrapper>
            <Details user={user} onEdit={() => console.log('Edit')} />
          </DetailsWrapper>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <DetailsWrapper>
            <Management
              user={user}
              isSuspendbtn
              title="User Management"
              btnText="Delete Account"
              onDelete={() => console.log('Delete')}
              onSuspend={() => console.log('Suspend')}
            />
          </DetailsWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsWrapper>
            <Management
              user={user}
              isSuspendbtn={false}
              title="Account Security"
              btnText="Reset Password"
              onResetPassword={() => console.log('Reset Password')}
            />
          </DetailsWrapper>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <DetailsWrapper>
            <Subscription user={user} />
          </DetailsWrapper>
        </Grid>
      </Grid>
      <SafetyReports
        reportTitle="Report Title"
        reportDate="1:00 PM EST on 1/13/23"
        status="Reviewing"
        sentTo="example@example.com"
        subject="example subject"
        message={`Hey!
        <br />
        Lorem ipsum dolor sit amet consectetur. Magna nec sed elementum
        porta at. Aliquet non non amet amet. Feugiat nisl at metus
        pellentesque. Duis sed dictum egestas id.
        <br />
        <br />
        Best,
        <br />
        Name at Sortara`}
      />
      <AllLists
        data={[0, 1]}
        title="All Lists"
        onViewClick={onViewClick}
        onRemoveClick={onRemoveClick}
      />
      <AllLists
        data={[0, 1]}
        title="Items"
        onViewClick={onViewClick}
        onRemoveClick={onRemoveClick}
      />
    </React.Fragment>
  )
}

export default UserAccountDetails

const chipStyle = {
  height: '36px',
  padding: '5px 10px 5px 10px',
}
