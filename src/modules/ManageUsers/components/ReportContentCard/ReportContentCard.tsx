import { COLORS } from '@vgl/constants'
import { Box, Paper, Avatar, Typography, IconButton } from '@mui/material'

const ReportContentCard = () => {
  return (
    <Box
      p={1}
      gap={2}
      display="flex"
      width={384}
      borderRadius="14px"
      border="1px solid #D0D0D0"
    >
      <Box position="relative">
        <Box
          width={110}
          height={110}
          variant="square"
          component={Avatar}
          bgcolor={COLORS.background}
        />
        <Box
          top={0}
          right={0}
          width={34}
          height={26}
          display="flex"
          bgcolor="#FFFF"
          alignItems="center"
          position="absolute"
          justifyContent="center"
          borderRadius="0px 4px 0px 10px"
          borderLeft={'1px solid #D0D0D0'}
          borderBottom={'1px solid  #D0D0D0'}
        >
          <Box component="img" src="/assets/icons/list.svg" />
        </Box>
      </Box>
      <Box width="100%">
        <Typography fontSize={{ xs: 15, md: 18 }} fontWeight={700}>
          Name (32 Character Limit)
        </Typography>
        <Typography
          color="#595959"
          fontWeight={700}
          fontSize={{ xs: 12, md: 16 }}
        >
          Private, Public, or Shared
        </Typography>
        <Typography
          fontWeight={700}
          color="#595959"
          fontSize={{ xs: 12, md: 16 }}
        >
          No. items
        </Typography>
        <Box
          gap={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" gap={2} alignItems="center">
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton sx={{ p: 0 }}>
                <Box component="img" src="/assets/icons/black-heart.svg" />
              </IconButton>
              <Box
                width={20}
                height={20}
                display="flex"
                component={Paper}
                alignItems="center"
                justifyContent="center"
              >
                {0}
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton sx={{ p: 0 }}>
                <Box component="img" src="/assets/icons/message-black.svg" />
              </IconButton>
              <Box
                width={20}
                height={20}
                display="flex"
                component={Paper}
                alignItems="center"
                justifyContent="center"
              >
                {0}
              </Box>
            </Box>
          </Box>
          <IconButton>
            <Box component="img" src="/assets/icons/share.svg" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ReportContentCard
