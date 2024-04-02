import { COLORS, FONTS } from '@vgl/constants'
import { Box, Avatar, Typography, IconButton } from '@mui/material'

interface ReportCardProps {
  isToolTip?: boolean
  onInfoClick: () => void
  onMailIconClick?: () => void
  selectedValue: string | null
  setSelectedValue: (val: string) => void
}

const ReportCard = (props: ReportCardProps) => {
  const {
    isToolTip,
    onInfoClick,
    selectedValue,
    onMailIconClick,
    setSelectedValue,
  } = props || {}

  const RenderInfoToolTip = () => {
    return (
      <Box position="absolute" top={20} left={70} zIndex={1}>
        <Box
          p={2}
          width={233}
          borderRadius="14px"
          bgcolor={COLORS.white}
          border="1px solid #D0D0D0"
        >
          {['View Kelsey’s Profile', 'Suspend Kelsey'].map((option) => (
            <Typography
              my={1}
              textAlign="center"
              fontSize={{ xs: 15, md: 20 }}
              onClick={() => setSelectedValue(option)}
              fontWeight={selectedValue === option ? 700 : 400}
            >
              {option}
            </Typography>
          ))}
        </Box>
      </Box>
    )
  }
  return (
    <Box display="flex" alignItems="center" gap={2} my={2} position="relative">
      <Box>
        <Box
          width={53}
          height={53}
          component={Avatar}
          src="/assets/images/user.svg"
        />
      </Box>
      <Box>
        <Typography
          fontWeight={400}
          fontSize={{ xs: 18, md: 20 }}
          fontFamily={FONTS.DMSANS}
        >
          Kelsey Bett
        </Typography>
        <Typography
          fontWeight={400}
          fontSize={{ xs: 12, md: 16 }}
          fontFamily={FONTS.DMSANS}
        >
          @callingkelsy
        </Typography>
      </Box>
      <Box>
        <Box display="flex" gap={2}>
          <Typography
            fontWeight={700}
            fontSize={{ xs: 12, md: 14 }}
            fontFamily={FONTS.DMSANS}
          >
            Email Address:
          </Typography>
          <Typography
            fontWeight={300}
            fontSize={{ xs: 12, md: 14 }}
            fontFamily={FONTS.DMSANS}
          >
            example@email.com
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Typography
            fontWeight={700}
            fontSize={{ xs: 12, md: 14 }}
            fontFamily={FONTS.DMSANS}
          >
            Phone Number:
          </Typography>
          <Typography
            fontWeight={300}
            fontSize={{ xs: 12, md: 14 }}
            fontFamily={FONTS.DMSANS}
          >
            +1 000-000-0000
          </Typography>
        </Box>
      </Box>
      <Box position="relative">
        {isToolTip && <RenderInfoToolTip />}
        <IconButton onClick={onMailIconClick}>
          <Box component="img" src="/assets/icons/mail.svg" />
        </IconButton>
        <IconButton onClick={onInfoClick}>
          <Box component="img" src="/assets/icons/info.svg" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ReportCard
