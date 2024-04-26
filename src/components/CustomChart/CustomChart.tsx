import Box from '@mui/material/Box'
import { BarChart } from '@mui/x-charts/BarChart'

export default function CustomChart() {
  const dataset = [
    {
      seoul: 21,
      day: 'Mon',
    },
    {
      seoul: 99,
      day: 'Tue',
    },
    {
      seoul: 28,
      day: 'Wed',
    },
    {
      seoul: 28,
      day: 'Thur',
    },
    {
      seoul: 28,
      day: 'Fri',
    },
    {
      seoul: 28,
      day: 'Sat',
    },
    {
      seoul: 28,
      day: 'Sun',
    },
  ]
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        sx={{
          '& .MuiBarElement-root': {
            fill: 'black',
          },

          '& .MuiChartsAxis-line': {
            display: 'none',
          },
          '& .MuiChartsAxis-tick': {
            display: 'none',
          },
          '& .MuiChartsAxis-root': {
            '&.MuiChartsAxis-directionY': {
              display: 'none',
            },
          },
        }}
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        height={300}
        series={[{ dataKey: 'seoul' }]}
        topAxis={{
          position: 'top',
        }}
      />
    </Box>
  )
}
