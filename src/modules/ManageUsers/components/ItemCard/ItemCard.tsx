import { COLORS, FONTS } from '@vgl/constants'
import { Box, Chip, Divider, IconButton, Typography } from '@mui/material'

interface ItemCardProps {
  type: string
  image: string
  listName: string
  likes: string | number
  comments: string | number
}

const ItemCard = (props: ItemCardProps) => {
  const { listName, type, image, likes, comments } = props || {}
  return (
    <Box border="1px solid #D0D0D0" my={{ md: 10, xs: 0 }} p={4}>
      <Box display="flex" justifyContent="space-between">
        <Chip label={listName} sx={listChipStyle} />
        <Chip label={type} sx={typeChipStyle} />
      </Box>
      <Typography
        fontSize={{ xs: 20, md: 28 }}
        fontWeight={900}
        fontFamily={FONTS.RECOLETA}
      >
        Photoshoot idea for Leila’s Pug Junior
      </Typography>

      <Typography
        fontSize={{ xs: 12, md: 16 }}
        fontWeight={400}
        fontFamily={FONTS.DMSANS}
      >
        Junior’s 5th birthday photo
      </Typography>
      <Typography
        fontSize={{ xs: 12, md: 16 }}
        fontWeight={400}
        fontFamily={FONTS.DMSANS}
      >
        Added on March 12, 2023
      </Typography>
      <Box my={1}>
        <Box
          width="100%"
          alt="image"
          src={image}
          height={361}
          component="img"
          borderRadius="14px"
        />
      </Box>
      <Divider variant="fullWidth" />
      <Box display="flex" gap={2} p={1} alignItems="center">
        <IconButton>
          <Box component="img" src="/assets/icons/link.svg" alt="link" />
        </IconButton>
        <Typography variant="h4">http://www.link.com</Typography>
      </Box>
      <Divider variant="fullWidth" />
      <Box display="flex" gap={2} p={1} alignItems="center">
        <IconButton>
          <Box component="img" src="/assets/icons/love.svg" alt="love" />
        </IconButton>
        <Typography variant="h4">{likes} Likes</Typography>
      </Box>
      <Divider variant="fullWidth" />
      <Box display="flex" gap={2} p={1} alignItems="center">
        <IconButton>
          <Box component="img" src="/assets/icons/chat.svg" alt="chat" />
        </IconButton>
        <Typography variant="h4">{comments} Comments</Typography>
      </Box>
      <Divider variant="fullWidth" />
    </Box>
  )
}

export default ItemCard

const listChipStyle = {
  fontSize: 14,
  fontWeight: 500,
  p: '5px 16px 5px 16px',
  fontFamily: FONTS.DMSANS,
  bgcolor: COLORS.white,
}

const typeChipStyle = {
  p: '4px 7px 4px 7px',
  bgcolor: COLORS.primary.main,
  color: COLORS.white,
}
