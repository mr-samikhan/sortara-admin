import { COLORS } from '@vgl/constants'
import { MenuItem, Select } from '@mui/material'

interface IOptions {
  label: string
  value: string
}

interface CustomSelectProps {
  options: IOptions[]
  onChange: (value: string) => void
}

const CustomSelect = (props: CustomSelectProps) => {
  const { options, onChange } = props
  return (
    <Select
      sx={selectStyle}
      defaultValue={options[0].value}
      onChange={(e) => onChange(e.target.value)}
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

const selectStyle = {
  height: 30,
  '& .MuiSvgIcon-root': {
    left: 300,
    bottom: 10,
    fontSize: 40,
    alignSelf: 'center',
    color: COLORS.black.main,
  },
  '& .MuiOutlinedInput-input': {
    fontSize: 24,
    fontWeight: 700,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}
