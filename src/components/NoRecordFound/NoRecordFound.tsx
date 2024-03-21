import { Typography } from '@mui/material'

interface NoRecordFoundProps {
  data: unknown[]
}
const NoRecordFound = ({ data }: NoRecordFoundProps) => {
  return (
    <Typography variant="h6" color="error" textAlign="center">
      {data?.length === 0 ? 'No Record Found' : ''}
    </Typography>
  )
}

export default NoRecordFound
