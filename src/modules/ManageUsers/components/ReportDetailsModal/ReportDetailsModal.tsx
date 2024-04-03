import React from 'react'
import { FONTS } from '@vgl/constants'
import { ReportCard, ReportContentCard } from '../components'
import {
  Box,
  Paper,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from '@mui/material'

interface ReportDetailsModalProps {
  btnClassName?: string
  onGoBack: () => void
  buttonText?: string
  onResolve: () => void
  onMailIconClick: () => void
}

const ReportDetailsModal = (props: ReportDetailsModalProps) => {
  const { onGoBack, onMailIconClick, buttonText, onResolve, btnClassName } =
    props || {}

  const [isToolTip, setIsToolTip] = React.useState(false)
  const [isToolTip2, setIsToolTip2] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null)

  return (
    <React.Fragment>
      <Box
        width="100%"
        elevation={0}
        component={Paper}
        maxHeight={isToolTip || isToolTip2 ? 800 : 700}
        overflow={isToolTip || isToolTip2 ? 'none' : 'auto'}
      >
        <IconButton onClick={onGoBack}>
          <img src="/assets/icons/back-arrow.svg" alt="arrow-back" />
        </IconButton>
        <Box
          my={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            fontWeight={400}
            fontSize={{ xs: 15, md: 24 }}
            fontFamily={FONTS.WORK_SANS}
          >
            Reporter
          </Typography>

          <Typography
            fontWeight={400}
            fontSize={{ xs: 12, md: 14 }}
            fontFamily={FONTS.WORK_SANS}
          >
            Submitted: 00/00/00 at 00:00 AM/PM
          </Typography>
        </Box>

        <ReportCard
          isAction
          isToolTip={isToolTip}
          selectedValue={selectedValue}
          onMailIconClick={onMailIconClick}
          onInfoClick={() => setIsToolTip(!isToolTip)}
          setSelectedValue={(val) => setSelectedValue(val)}
        />
        <Typography
          fontWeight={400}
          fontSize={{ xs: 15, md: 24 }}
          fontFamily={FONTS.WORK_SANS}
        >
          Report Recipient
        </Typography>
        <ReportCard
          isAction
          isToolTip={isToolTip2}
          selectedValue={selectedValue}
          onMailIconClick={onMailIconClick}
          onInfoClick={() => setIsToolTip2(!isToolTip2)}
          setSelectedValue={(val) => setSelectedValue(val)}
        />
        <Box my={2}>
          <Typography
            my={1}
            fontWeight={400}
            fontSize={{ xs: 15, md: 24 }}
            fontFamily={FONTS.WORK_SANS}
          >
            Report Reason
          </Typography>
          <TextField placeholder="Reason here..." fullWidth />
        </Box>
        <Box my={2}>
          <Typography
            fontWeight={400}
            fontSize={{ xs: 15, md: 24 }}
            fontFamily={FONTS.WORK_SANS}
          >
            Content
          </Typography>
          <Box display="flex" justifyContent="center">
            <ReportContentCard />
          </Box>
          <Box my={2}>
            <Typography
              fontWeight={400}
              fontSize={{ xs: 15, md: 24 }}
              fontFamily={FONTS.WORK_SANS}
            >
              Content Type
            </Typography>
            <TextField placeholder="List" fullWidth />
          </Box>
          <Box my={2}>
            <Typography
              fontWeight={400}
              fontSize={{ xs: 15, md: 24 }}
              fontFamily={FONTS.WORK_SANS}
            >
              Status
            </Typography>
            <TextField
              select
              fullWidth
              placeholder="List"
              SelectProps={{
                ...customStyle,
              }}
            >
              {['Unread', 'Read', 'Under Review'].map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  className="report-menuItem"
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box my={2}>
            <Typography
              my={2}
              fontWeight={400}
              textAlign="center"
              fontSize={{ xs: 14, md: 18 }}
            >
              Last updated by Aubrey Carson at 2:30PM, 1/23/23
            </Typography>
            <Box
              component={Button}
              fullWidth
              variant="contained"
              onClick={onResolve}
              className={btnClassName || 'contained-blue'}
            >
              {buttonText || 'Resovle Report'}
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default ReportDetailsModal

const customStyle: any = {
  MenuProps: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    PaperProps: {
      style: {
        marginTop: -10,
        boxShadow: 'none',
        borderRadius: '14px',
        border: '1px solid #D0D0D0',
      },
    },
  },
}
