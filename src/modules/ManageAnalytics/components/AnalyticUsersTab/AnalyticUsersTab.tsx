import React, { useState } from 'react'
import { usePagination } from '@vgl/hooks'
import { ADS_DATA, COLORS } from '@vgl/constants'
import { SearchTextField } from '@vgl/components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Ads,
  CustomModal,
  AdvertisementCard,
  ReportDetailsModal,
} from '@vgl/modules'
import {
  Box,
  Grid,
  Chip,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material'

interface IRenderTitleWithCounter {
  title: string
  counter: string | number
}

interface AnalyticUsersTabProps {
  analyticValues?: any
}

const AnalyticUsersTab = (props: AnalyticUsersTabProps) => {
  const { analyticValues } = props || {}

  const rowsPerPage = 4
  const [isReportsModal, setIsReportsModal] = useState(false)

  const { currentItems, totalPages, currentPage, setCurrentPage } =
    usePagination(ADS_DATA, rowsPerPage)

  const RenderTitleWithCounter = ({
    title,
    counter,
  }: IRenderTitleWithCounter) => {
    return (
      <Box display="flex" gap={2} alignItems="center" my={2}>
        <Typography fontSize={{ xs: 15, md: 32 }} fontWeight={500}>
          {title}
        </Typography>
        <Box
          width={150}
          height={25}
          component={Chip}
          color={COLORS.white}
          label={`Total: ${counter}`}
          bgcolor={COLORS.primary.dark}
        />
      </Box>
    )
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event)
    setCurrentPage(value - 1)
  }

  const RenderStepsUI = () => {
    switch (analyticValues.dropdownValue) {
      case 'active':
        return (
          <React.Fragment>
            <Grid item md={12} xs={12} my={2}>
              <RenderTitleWithCounter title="Free Trial Users" counter={200} />
              <Ads title="" data={ADS_DATA} hideCloneIcon={true} />
              <Box display="flex" justifyContent="center" my={4}>
                {currentItems?.length > 0 && (
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
              <RenderTitleWithCounter
                title="Monthly Memberships"
                counter={200}
              />
              <Ads title="" data={ADS_DATA} hideCloneIcon={true} />
              <Box display="flex" justifyContent="center" my={4}>
                {currentItems?.length > 0 && (
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
              <RenderTitleWithCounter
                title="Enterprise Memberships"
                counter={200}
              />
              <Ads title="" data={currentItems} hideCloneIcon={true} />
            </Grid>
            <Grid
              item
              my={4}
              md={12}
              xs={12}
              display="flex"
              justifyContent="center"
            >
              {currentItems?.length > 0 && (
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
            </Grid>
          </React.Fragment>
        )
      case 'registered':
        return (
          <Grid item md={12} my={2}>
            <RenderTitleWithCounter title="Registered Users" counter={200} />
            <Ads title="" data={ADS_DATA} hideCloneIcon={true} />
            <Box display="flex" justifyContent="center" my={4}>
              {currentItems?.length > 0 && (
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
          </Grid>
        )
      case 'deactivated':
        return (
          <Grid item md={12} my={2}>
            <RenderTitleWithCounter title="Deactivated Users" counter={200} />
            <Ads title="" data={ADS_DATA} hideCloneIcon={true} />
            <Box display="flex" justifyContent="center" my={4}>
              {currentItems?.length > 0 && (
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
          </Grid>
        )
      case 'summary':
        return (
          <Grid container spacing={2} my={2}>
            {[
              { count: 12, title: 'Submitted Safety Reports', percentage: 20 },
              { count: 12, title: 'Free Trial Memebers', percentage: 20 },
              {
                count: 0.03,
                title: 'Monthly Subscription Memberships',
                percentage: 20,
              },
              {
                count: 3,
                title: 'Enterprise Subscription Membership',
                percentage: 0.01,
              },
              {
                count: 3,
                title: 'Active Enterprise Accounts',
                percentage: 0.01,
              },
              { count: 3, title: 'Deactivated Users', percentage: 0.01 },
              { count: 3, title: 'Registered Users', percentage: 0.01 },
            ].map((item, index) => (
              <Grid item md={index % 3 === 0 ? 12 : 6}>
                <AdvertisementCard
                  key={index}
                  count={item.count}
                  title={item.title}
                  percentage={item.percentage}
                />
              </Grid>
            ))}
          </Grid>
        )
      case 'reports':
        return (
          <Grid item md={12} my={2}>
            <RenderTitleWithCounter title="Safety Reports" counter={200} />
            <Ads
              title=""
              data={ADS_DATA}
              hideCloneIcon={true}
              onRowClick={() => setIsReportsModal(true)}
            />
            <Box display="flex" justifyContent="center" my={4}>
              {currentItems?.length > 0 && (
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
            {isReportsModal && (
              <CustomModal
                open={isReportsModal}
                width={'600px !important'}
                onClose={() => setIsReportsModal(false)}
              >
                <ReportDetailsModal
                  btnClassName="bordered-btn"
                  buttonText="Unresolve Report"
                  onGoBack={() => setIsReportsModal(false)}
                  onMailIconClick={() => console.log('mail icon clicked')}
                />
              </CustomModal>
            )}
          </Grid>
        )
    }
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={6} m="auto" my={2}>
          <Box component="img" src="/assets/images/chart.svg" alt="chart" />
        </Grid>
        <SearchTextField fullWidth placeholder="Search..." sx={inputStyle} />
        <RenderStepsUI />
      </Grid>
    </React.Fragment>
  )
}

export default AnalyticUsersTab

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px !important',
  },
}
