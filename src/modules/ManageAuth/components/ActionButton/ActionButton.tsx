import { Button } from '@mui/material'
import { COLORS } from '@vgl/constants'

interface IActionButton {
  buttonText: string
  onClick?: () => void
  borderRadius?: string
}

const ActionButton = (props: IActionButton) => {
  const { onClick, buttonText, borderRadius } = props
  return (
    <Button
      fullWidth
      type="submit"
      onClick={onClick}
      variant="contained"
      sx={{ ...buttonStyle, borderRadius: borderRadius || '4px' }}
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
