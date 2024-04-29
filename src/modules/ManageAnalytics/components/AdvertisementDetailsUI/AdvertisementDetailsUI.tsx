import React from 'react'
import { usePagination } from '@vgl/hooks'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ADS_DATA, ADVERTISEMENT_CARD_DATA_2 } from '@vgl/constants'
import { Ads, AdvertisementSummaryUI, CustomFilterBox } from '@vgl/modules'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material'

interface IItem {
  title: string
  email: string
  phone: string
  username: string
  location: string
}

interface IRenderCard {
  title: string
  data: IItem[]
}

const AdvertisementDetailsUI = () => {
  const rowsPerPage = 1
  const { totalPages, currentItems, currentPage, setCurrentPage } =
    usePagination(ADS_DATA, rowsPerPage)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event)
    setCurrentPage(value - 1)
  }

  const RenderAdvertClicksUI = ({ title, data }: IRenderCard) => {
    return (
      <React.Fragment>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography fontSize={{ xs: 15, md: 28 }} fontWeight={500}>
              {title}
            </Typography>
            <Typography fontSize={{ xs: 15, md: 20 }} fontWeight={500}>
              Total Count: 00
            </Typography>
          </Box>
          <Box component="img" src="/assets/icons/export.svg" alt="export" />
        </Box>
        {data.map((item: IItem, index: number) => (
          <React.Fragment key={item.email}>
            <Box
              component={Paper}
              p={3}
              borderRadius="4px"
              elevation={0}
              my={2}
            >
              <Typography fontSize={24} fontWeight={500}>
                {item.title}
              </Typography>
              <Box
                gap={4}
                display="flex"
                alignItems="center"
                flexDirection={{ xs: 'column', md: 'row' }}
              >
                <Typography variant="body2" fontWeight={400}>
                  Username: {item.username}
                </Typography>
                <Typography variant="body2" fontWeight={400}>
                  Email: {item.email}
                </Typography>
                <Typography variant="body2" fontWeight={400}>
                  {item.phone}
                </Typography>
                <Typography variant="body2" fontWeight={400}>
                  Location: {item.location}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" my={4}>
              {index === ADS_DATA.length - 1 && currentItems?.length > 0 && (
                <Pagination
                  color="secondary"
                  count={totalPages}
                  page={currentPage + 1}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              )}
            </Box>
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Box component={Paper} p={4} mt={4} elevation={0} borderRadius="8px">
        <Ads title="" data={ADS_DATA.slice(0, 1)} hideCloneIcon={true} />
        <Box my={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Box display="flex" gap={4}>
              <Box display="flex" flexDirection="column">
                <Box display="flex" gap={1}>
                  <Typography variant="body2">Duration</Typography>
                  <Box
                    component="img"
                    src="/assets/icons/unselected-circle.svg"
                    alt="circle"
                  />
                </Box>
                <Typography variant="body2" fontWeight={400}>
                  Average: 0s
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box display="flex" gap={1}>
                  <Typography variant="body2">
                    Users Who Clicked on Advertisement
                  </Typography>
                  <Box
                    component="img"
                    src="/assets/icons/selected-circle.svg"
                    alt="circle"
                  />
                </Box>
                <Typography variant="body2" fontWeight={400}>
                  Total Count: 5
                </Typography>
              </Box>
            </Box>
            <Box width={{ xs: '100%', md: 300 }}>
              <CustomFilterBox
                value="Time"
                onChange={() => console.log('value')}
              />
            </Box>
          </Box>
          <Grid container my={4}>
            <Grid item md={12} xs={12} textAlign="center">
              <Box
                alt="chart"
                component="img"
                src="/assets/images/chart-2.svg"
                width={{ xs: '100%', md: 'auto' }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AdvertisementSummaryUI />

      <Box my={3} px={4}>
        <RenderAdvertClicksUI
          title="Viewers"
          data={ADVERTISEMENT_CARD_DATA_2}
        />
      </Box>
      <Box my={3} px={4}>
        <RenderAdvertClicksUI
          data={ADVERTISEMENT_CARD_DATA_2}
          title="Users Who Clicked on Advertisement"
        />
      </Box>
    </React.Fragment>
  )
}

export default AdvertisementDetailsUI
