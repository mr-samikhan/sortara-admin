import React, { useState } from 'react'
import { usePagination } from '@vgl/hooks'
import { TABLE_HEADERS } from '@vgl/constants'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  IconButton,
  Pagination,
  PaginationItem,
} from '@mui/material'
import { NoRecordFound } from '@vgl/components'

interface MuiCustomTableProps {
  data: unknown[]
  onRowClick: (row: { id: string }) => void
}

const MuiCustomTable = (props: MuiCustomTableProps) => {
  const { data, onRowClick } = props || {}

  const rowsPerPage = 8
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: 'ascending',
  })

  const sortedItems = React.useMemo(() => {
    const sortableItems = [...data]
    if (sortConfig.key !== null) {
      sortableItems.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [data, sortConfig])

  const { currentItems, totalPages, currentPage, setCurrentPage } =
    usePagination(sortedItems, rowsPerPage)

  const requestSort = (key: string) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event)
    setCurrentPage(value - 1)
  }

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableCell key={header.key}>
                {header.title}&nbsp;
                <IconButton onClick={() => requestSort(header.key)}>
                  <img src={header.icon} alt="" />
                </IconButton>
              </TableCell>
            ))}
            <TableCell
              sx={{
                border: 0,
              }}
            >
              <Typography variant="h6" color="textSecondary"></Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems?.length === 0 && (
            <TableRow>
              <TableCell colSpan={TABLE_HEADERS.length + 1}>
                <NoRecordFound data={data} />
              </TableCell>
            </TableRow>
          )}
          {currentItems?.map((user: any, index) => (
            <React.Fragment key={index}>
              <TableRow>
                {TABLE_HEADERS.map(
                  (header: { key: string; title: string; icon: string }) => (
                    <TableCell key={header.key}>{user[header.key]}</TableCell>
                  )
                )}

                <TableCell>
                  <IconButton onClick={() => onRowClick(user)}>
                    <img src="/assets/icons/chevron-right.svg" alt="" />
                  </IconButton>
                </TableCell>
              </TableRow>
              <div style={{ padding: 5 }} />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" mt={0.5}>
        {currentItems?.length > 0 && (
          <Pagination
            color="secondary"
            count={totalPages}
            page={currentPage + 1}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        )}
      </Box>
    </React.Fragment>
  )
}

export default MuiCustomTable
