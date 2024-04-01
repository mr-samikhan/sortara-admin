import React from 'react'
import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { Box, Grid, Paper, Typography } from '@mui/material'
import {
  FONTS,
  COLORS,
  TAB_VALUES,
  SORT_BY_USERS,
  SORT_BY_STATUS,
  SORT_BY_REASONS,
  SORT_BY_CONTENT,
} from '@vgl/constants'

interface filterItem {
  label: string
  value: string
}

interface filterValues {
  [key: string]: filterItem[]
}

const FilterModalUI = ({
  isContent,
  isStatus,
}: {
  isContent: boolean
  isStatus: boolean
}) => {
  const { tabValue } = useSelector((state: RootState) => state.context)

  const [filterValues, setFilterValues] = React.useState<filterValues>({
    users: [],
    content: [],
    status: [],
    reasons: [],
  })

  const onFilter = (item: filterItem, key: string) => {
    const selectedIdx = filterValues[key].indexOf(item)

    if (selectedIdx !== -1) {
      const updatedExperience = filterValues[key].filter(
        (el: filterItem) => el !== item
      )
      setFilterValues((prev) => ({ ...prev, [key]: updatedExperience }))
    } else {
      const updatedExperience = [...filterValues[key], item]
      setFilterValues((prev) => ({ ...prev, [key]: updatedExperience }))
    }
  }

  const RenderSortReasons = ({
    key_,
    title,
    array,
    onClick,
  }: {
    key_: string
    title: string
    array: filterItem[]
    onClick: (item: filterItem, key_: string) => void
  }) => {
    return (
      <>
        <Typography
          variant="h4"
          fontWeight={700}
          fontFamily={FONTS.DMSANS}
          color={COLORS.primary.dark}
        >
          {title}
        </Typography>
        {array.map((item: filterItem, index: number) => (
          <Box key={index} my={1} onClick={() => onClick(item, key_)}>
            <Typography
              fontFamily={FONTS.LATO}
              fontSize={{ xs: 15, md: 20 }}
              fontWeight={
                filterValues[key_]?.some((el) => el.value === item.value)
                  ? 700
                  : 400
              }
              sx={{
                cursor: 'pointer',
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </>
    )
  }
  return (
    <React.Fragment>
      <Box
        top={0}
        right={0}
        padding={3}
        elevation={0}
        display="flex"
        textAlign="end"
        component={Paper}
        position="absolute"
        width={{
          xs: '100%',
          sm: '100%',
          md:
            tabValue === TAB_VALUES.REPORTS
              ? '100%'
              : tabValue === TAB_VALUES.RESOLVED
              ? '655px'
              : '855px',
        }}
      >
        <Grid container spacing={2} display="flex" justifyContent="flex-end">
          <Grid
            item
            md={tabValue === TAB_VALUES.RESOLVED ? 6 : 2.5}
            xs={6}
            textAlign="center"
          >
            <RenderSortReasons
              key_="users"
              title="Sort by users"
              array={SORT_BY_USERS}
              onClick={(item) => onFilter(item, 'users')}
            />
          </Grid>
          {isContent && (
            <Grid item md={2.5} xs={6} textAlign="center">
              <RenderSortReasons
                key_="content"
                array={SORT_BY_CONTENT}
                title="Sort by content type"
                onClick={(item) => onFilter(item, 'content')}
              />
            </Grid>
          )}
          {isStatus && (
            <Grid item md={2} xs={6} textAlign="center">
              <RenderSortReasons
                key_="status"
                title="Sort by status"
                array={SORT_BY_STATUS}
                onClick={(item) => onFilter(item, 'status')}
              />
            </Grid>
          )}
          <Grid
            item
            md={tabValue === TAB_VALUES.RESOLVED ? 6 : 5}
            xs={6}
            textAlign="center"
          >
            <RenderSortReasons
              key_="reasons"
              title="Sort by reason"
              array={SORT_BY_REASONS}
              onClick={(item) => onFilter(item, 'reasons')}
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default FilterModalUI
