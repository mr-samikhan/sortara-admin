import React from 'react'
import { COLORS } from '@vgl/constants'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Typography } from '@mui/material'

interface UploadImageButtonProps {
  title: string
  bgcolor?: string
  buttonText?: string
}

const UploadImageButton = (props: UploadImageButtonProps) => {
  const { title, buttonText, bgcolor } = props

  const imageRef = React.useRef<HTMLInputElement | null>(null)

  return (
    <React.Fragment>
      <Box>
        <Typography fontSize={18} fontWeight={700}>
          {title}
        </Typography>
        <Box
          my={1}
          fullWidth
          height={50}
          borderRadius="4px"
          variant="outlined"
          component={Button}
          border="3px solid"
          color={COLORS.primary.dark}
          borderColor={COLORS.primary.dark}
          bgcolor={bgcolor || COLORS.white}
          onClick={() => imageRef?.current?.click()}
          startIcon={
            <AddIcon
              sx={{
                color: COLORS.primary.dark,
              }}
            />
          }
        >
          {buttonText || 'Add Image'}
        </Box>
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </Box>
    </React.Fragment>
  )
}

export default UploadImageButton
