import Box from '@mui/material/Box'
import { CHART_DATA, COLORS } from '@vgl/constants'
import { BarChart } from '@mui/x-charts/BarChart'

export default function CustomChart() {
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        height={300}
        sx={chartStyle}
        dataset={CHART_DATA}
        series={[{ dataKey: 'seoul' }]}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        // topAxis={{
        //   position: 'top',
        // }}
      />
    </Box>
  )
}

const chartStyle = {
  '& .MuiBarElement-root': {
    fill: COLORS.primary.main,
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
}
