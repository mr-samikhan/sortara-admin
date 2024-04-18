import React from 'react'
import { COLORS } from '@vgl/constants'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, TextField, Typography } from '@mui/material'

interface UploadImageButtonProps {
  index?: number
  title: string
  adValues?: any
  options?: any[]
  bgcolor?: string
  buttonText?: string
  onClick?: () => void
  setAdValues?: (value: any) => void
}

const UploadImageButton = (props: UploadImageButtonProps) => {
  const {
    title,
    bgcolor,
    onClick,
    options,
    adValues,
    buttonText,
    setAdValues,
    index: currentIndex,
  } = props

  const { isaddButton, isRemoveButton } = adValues || {}

  const imageRef = React.useRef<HTMLInputElement | null>(null)

  const [file, setFile] = React.useState<File | null>(null)
  const [newButtonText, setNewButtonText] = React.useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFile(file || null)
    setAdValues &&
      setAdValues({
        ...adValues,
        buttons: adValues.buttons.map((button: any, index: number) =>
          index === currentIndex ? { ...button, file } : button
        ),
      })
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewButtonText(value)
  }

  const handleAddButton = () => {
    if (!newButtonText) return
    if (isaddButton && setAdValues) {
      setAdValues({
        ...adValues,
        buttons: [...adValues.buttons, { label: newButtonText }],
        isaddButton: false,
        isRemoveButton: false,
      })
      setNewButtonText('')
    }
  }

  const handleButtonClick = () => {
    if (isaddButton) {
      handleAddButton()
    } else if (buttonText === 'Add Image') {
      imageRef.current?.click()
    } else {
      onClick && onClick()
    }
  }

  const handleRemoveButton = () => {
    setAdValues &&
      setAdValues({
        ...adValues,
        buttons: adValues.buttons.filter(
          (button: any) => button.label !== newButtonText
        ),
      })
    setNewButtonText('')
  }

  return (
    <React.Fragment>
      <Box>
        <Typography fontSize={18} fontWeight={700}>
          {title}
        </Typography>
        {file !== null && (
          <Box display="flex" justifyContent="space-between" my={1}>
            <Typography variant="h4" fontWeight={400}>
              {file?.name}
            </Typography>
            <Typography
              variant="h4"
              fontWeight={400}
              color={COLORS.primary.dark}
              onClick={() => setFile(null)}
              sx={{
                cursor: 'pointer',
              }}
            >
              Remove
            </Typography>
          </Box>
        )}

        {currentIndex === options?.length && isaddButton && (
          <Box my={2}>
            <TextField
              fullWidth
              value={newButtonText}
              onChange={onInputChange}
              placeholder="Add title of button"
            />
          </Box>
        )}
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
          onClick={handleButtonClick}
          startIcon={
            <AddIcon
              sx={{
                color: COLORS.primary.dark,
              }}
            />
          }
        >
          {file !== null ? 'Replace image' : buttonText || 'Add Image'}
        </Box>
        {currentIndex === options?.length && isRemoveButton && (
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
            onClick={handleRemoveButton}
            startIcon={
              <AddIcon
                sx={{
                  color: COLORS.primary.dark,
                }}
              />
            }
          >
            Remove
          </Box>
        )}
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </Box>
    </React.Fragment>
  )
}

export default UploadImageButton
