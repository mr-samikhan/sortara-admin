import React from 'react'
import { IAds } from '@vgl/types'
import { COLORS, FONTS } from '@vgl/constants'
import { Box, IconButton, Paper, Typography } from '@mui/material'

interface AdsProps {
  data: IAds[]
  title?: string
  hideCloneIcon?: boolean
  onEdit?: (item: IAds) => void
  onClone?: (item: IAds) => void
  onRowClick?: (item: IAds) => void
}

const Ads = (props: AdsProps) => {
  const {
    title,
    data,
    onEdit,
    onClone,
    onRowClick,
    hideCloneIcon = false,
  } = props || {}
  return (
    <React.Fragment>
      <Box my={2}>
        <Typography fontSize={32} fontFamily={FONTS.WORK_SANS} fontWeight={600}>
          {title}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {data.map(
          (
            { title, location, priorityRanking, startDate, endDate, isLive },
            index
          ) => (
            <React.Fragment key={index}>
              <Box
                p={2}
                elevation={0}
                component={Paper}
                border={`1px solid ${COLORS.grey.main}`}
                onClick={() => onRowClick && onRowClick(data[index])}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontSize={24} fontWeight={500}>
                    {title}
                  </Typography>
                  <Box display="flex" gap={2}>
                    <IconButton onClick={() => onEdit && onEdit(data[index])}>
                      <Box component="img" src="/assets/icons/blue-edit.svg" />
                    </IconButton>
                    {!hideCloneIcon && (
                      <IconButton
                        onClick={() => onClone && onClone(data[index])}
                      >
                        <Box
                          component="img"
                          src="/assets/icons/blue-copy.svg"
                        />
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Box display="flex" gap={2}>
                  <Typography variant="body2" fontWeight={400}>
                    {location}
                  </Typography>
                  <Typography variant="body2" fontWeight={400}>
                    {priorityRanking}
                  </Typography>
                  <Typography variant="body2" fontWeight={400}>
                    {startDate} to {endDate}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2" fontWeight={400}>
                      Status:
                    </Typography>
                    <Typography variant="body2" fontWeight={400}>
                      {isLive ? 'Active' : 'Inactive'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </React.Fragment>
          )
        )}
      </Box>
    </React.Fragment>
  )
}

export default Ads
