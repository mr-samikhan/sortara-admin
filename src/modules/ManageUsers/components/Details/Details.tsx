import React from 'react'
import { UserAccountDetailsProps } from '../components'
import { Box, IconButton, Typography } from '@mui/material'

interface DetailsProps {
  isEdit: boolean
  onSave: () => void
  onCancel: () => void
  user: UserAccountDetailsProps['user']
  onEdit: (user: UserAccountDetailsProps['user']) => void
}

const Details = ({ user, onEdit, isEdit, onSave, onCancel }: DetailsProps) => {
  //render typo
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
      <Box display="flex" justifyContent="space-between">
        <Typo title="Details" />
        {isEdit && (
          <Box display="flex" gap={2}>
            <Typography
              onClick={onCancel}
              border="none"
              fontWeight={400}
              component="button"
              bgcolor="transparent"
              fontSize={'15px !important'}
            >
              Cancel
            </Typography>
            <Typography
              onClick={onSave}
              border="none"
              fontWeight={400}
              component="button"
              bgcolor="transparent"
              fontSize={'15px !important'}
            >
              Save
            </Typography>
          </Box>
        )}
        {!isEdit && (
          <IconButton onClick={() => onEdit(user)}>
            <img src="/assets/icons/edit-icon.svg" alt="edit-icon" />
          </IconButton>
        )}
      </Box>
      <Box my={2}>
        <Box display="flex" gap={2} alignItems="center">
          <Typo title="Name" />
          <Typo title={user.name} fontWeight={400} />
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <Typo title="Username" />
          <Typo title={user.username} fontWeight={400} />
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <Typo title="Email" />
          <Typo title={user.email} fontWeight={400} />
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <Typo title="Phone Number" />
          <Typo title={user.phone} fontWeight={400} />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Details
