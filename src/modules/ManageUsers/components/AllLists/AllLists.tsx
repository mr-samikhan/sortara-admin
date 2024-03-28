import React from 'react'
import { FONTS } from '@vgl/constants'
import { ListRow, UserCustomDropDown } from '../components'
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'

interface AllListsProps {
  data: any[]
  title: string
  onViewClick: (item: any) => void
  onRemoveClick: (item: any) => void
}

const AllLists = (props: AllListsProps) => {
  const { title, onViewClick, onRemoveClick, data } = props || {}

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <React.Fragment>
      <Grid item md={11.5} xs={12} position="relative">
        <Box my={3}>
          <Typography
            variant="h1"
            fontWeight={400}
            fontFamily={FONTS.DMSANS}
            fontSize={{ xs: '12px !important', md: '20px !important' }}
          >
            {title}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              mt={1}
              variant="h1"
              fontWeight={400}
              fontFamily={FONTS.DMSANS}
              fontSize={{ xs: '12px !important', md: '20px !important' }}
            >
              Total Count: {data?.length || 0}
            </Typography>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>
        </Box>
        <Box my={2}>
          <Paper className="list-row">
            {data.map((item, index) => (
              <ListRow
                key={index}
                listName="List Name"
                onViewClick={() => onViewClick(item)}
                onRemoveClick={() => onRemoveClick(item)}
              />
            ))}
          </Paper>
        </Box>
        {isOpen && <UserCustomDropDown onClose={() => setIsOpen(false)} />}
      </Grid>
    </React.Fragment>
  )
}

export default AllLists
