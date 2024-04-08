import { COLORS } from '@vgl/constants'
import { Switch, SwitchProps, styled } from '@mui/material'

interface CustomSwitchButtonProps {
  defaultChecked?: boolean
}

const CustomSwitchButton = (props: CustomSwitchButtonProps) => {
  const { defaultChecked } = props

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 35,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: COLORS.success,
          opacity: 1,
          border: 0,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 15,
      height: 15,
    },
    '& .MuiSwitch-track': {
      borderRadius: 50 / 2,
      backgroundColor: 'black',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }))
  return <IOSSwitch defaultChecked={defaultChecked} />
}

export default CustomSwitchButton
