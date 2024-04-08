import React from 'react'
import { COLORS } from '@vgl/constants'
import { useBreakPoints } from '@vgl/hooks'
import { ModeratorTooltip } from '../components'
import {
  Box,
  Chip,
  Grid,
  Paper,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material'

export interface ModeratorCard {
  name: string
  role: string
  email: string
  status: string
  userImage: string
}

interface ModeratorCardProps {
  data: ModeratorCard[]
  onInfoClick?: () => void
  onSingleItem: (id: string) => void
  onUpdateDetails: (item: ModeratorCard) => void
  onResetPassword: (item: ModeratorCard) => void
}

const ModeratorCard = (props: ModeratorCardProps) => {
  const { data, onResetPassword, onUpdateDetails, onSingleItem } = props || {}

  const { mobileMode } = useBreakPoints()
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)

  const handleIconButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.stopPropagation()
    if (selectedIndex === index) {
      setSelectedIndex(null)
    } else {
      setSelectedIndex(index)
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={3} my={1}>
        {data.map((item, index) => (
          <Grid item md={3} xs={6} sm={6}>
            <Box
              elevation={0}
              display="flex"
              component={Paper}
              position="relative"
              alignItems="center"
              borderRadius="10px"
              flexDirection="column"
              onClick={() => onSingleItem(item.name)}
              padding={{ xs: '5px', md: '10px' }}
              border={`1px solid ${COLORS.grey.main}`}
            >
              <Box position="absolute" right={2}>
                <IconButton onClick={(e) => handleIconButtonClick(e, index)}>
                  <Box component="img" src="/assets/icons/info.svg" />
                </IconButton>
              </Box>
              {selectedIndex === index && (
                <Box position="absolute" right={10} top={50} zIndex={1}>
                  <ModeratorTooltip
                    onUpdateDetails={() => {
                      onUpdateDetails(item)
                      setSelectedIndex(null)
                    }}
                    onResetPassword={() => {
                      onResetPassword(item)
                      setSelectedIndex(null)
                    }}
                  />
                </Box>
              )}
              <Box
                my={1}
                width={120}
                height={120}
                component={Avatar}
                src={item.userImage}
              />
              <Typography variant={mobileMode ? 'body1' : 'body2'}>
                {item.name}
              </Typography>
              <Typography variant={mobileMode ? 'body1' : 'body2'}>
                {item.role}
              </Typography>
              <Typography
                my={1}
                fontWeight={400}
                variant={mobileMode ? 'body1' : 'body2'}
              >
                {item.email}
              </Typography>
              <Box
                my={1}
                p="5px 10px"
                component={Chip}
                fontWeight={400}
                borderRadius="4px"
                label={item.status}
                fontSize={{ xs: 15, md: 20 }}
                bgcolor={
                  item.status === 'Active' ? 'success.main' : COLORS.warning
                }
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

export default ModeratorCard
