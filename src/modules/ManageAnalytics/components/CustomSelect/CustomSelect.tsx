import { COLORS } from '@vgl/constants'
import { MenuItem, Select } from '@mui/material'

interface IOptions {
  label: string
  value: string
}

interface CustomSelectProps {
  options: IOptions[]
}

const CustomSelect = (props: CustomSelectProps) => {
  const { options } = props
  return (
    <Select
      sx={{
        height: 30,
        '& .MuiSvgIcon-root': {
          color: COLORS.black.main,
          bottom: 10,
          left: 300,
          fontSize: 40,
          alignSelf: 'center',
        },
        '& .MuiOutlinedInput-input': {
          fontWeight: 700,
          fontSize: 24,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      defaultValue={options[0].value}
    >
      {options.map((item) => (
        <MenuItem
          key={item.label}
          value={item.value}
          className="analytics-dropdown"
        >
          {item.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CustomSelect
