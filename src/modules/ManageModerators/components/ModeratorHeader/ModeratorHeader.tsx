import React from 'react'
import { COLORS } from '@vgl/constants'
import { Box, Button, Grid, Typography } from '@mui/material'

interface ModeratorHeaderProps {
  onAddNewModerator: () => void
  onViewInactiveAdmins: () => void
}

const ModeratorHeader = (props: ModeratorHeaderProps) => {
  const { onAddNewModerator, onViewInactiveAdmins } = props || {}
  return (
    <React.Fragment>
      <Grid
        container
        my={2}
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item md={9} xs={6}>
          <Button
            fullWidth
            sx={addBtnStyle}
            variant="contained"
            onClick={onAddNewModerator}
            className="contained-blue"
          >
            Add New Moderator
          </Button>
        </Grid>
        <Grid item md={3} xs={6}>
          <Box
            p={2}
            height={48}
            display="flex"
            borderRadius="4px"
            alignItems="center"
            border="1px solid #C4C4C4"
            justifyContent="space-between"
          >
            <Typography>In-Active Admins</Typography>
            <Button
              variant="text"
              sx={viewBtnStyle}
              onClick={onViewInactiveAdmins}
            >
              View
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ModeratorHeader

const addBtnStyle = {
  borderRadius: 31,
}

const viewBtnStyle = {
  fontSize: 20,
  fontWeight: 700,
  color: COLORS.primary.dark,
}
