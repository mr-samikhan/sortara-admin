import { Button } from '@mui/material'
import { COLORS } from '@vgl/constants'

interface IActionButton {
  color?: string
  bgcolor?: string
  buttonText: string
  disabled?: boolean
  onClick?: () => void
  isLoading?: boolean
  borderRadius?: string
}

const ActionButton = (props: IActionButton) => {
  const {
    color,
    onClick,
    bgcolor,
    disabled,
    isLoading,
    buttonText,
    borderRadius,
  } = props
  return (
    <Button
      fullWidth
      type="submit"
      onClick={onClick}
      variant="contained"
      disabled={isLoading || disabled}
      sx={{
        ...buttonStyle,
        color: color || 'white',
        borderRadius: borderRadius || '4px',
        bgcolor: bgcolor || COLORS.primary.dark,
      }}
    >
      {isLoading ? 'Loading...' : buttonText}
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
