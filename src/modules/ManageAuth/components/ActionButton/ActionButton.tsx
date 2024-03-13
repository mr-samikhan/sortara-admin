import { Button } from '@mui/material'
import { COLORS } from '@vgl/constants'

interface IActionButton {
  buttonText: string
  onClick?: () => void
}

const ActionButton = (props: IActionButton) => {
  const { onClick, buttonText } = props
  return (
    <Button
      fullWidth
      type="submit"
      sx={buttonStyle}
      onClick={onClick}
      variant="contained"
    >
      {buttonText}
    </Button>
  )
}

export default ActionButton

const buttonStyle = {
  height: 48,
  fontSize: 16,
  fontWeight: 500,
  fontFamily: 'DM Sans',
  bgcolor: COLORS.primary.dark,
  textTransform: 'capitalize',
}
