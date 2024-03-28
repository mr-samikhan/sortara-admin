import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ON_LIST_CHANGE, RootState } from '@vgl/stores'
import { COLORS, FONTS, USER_DROPDOWN_OPTIONS } from '@vgl/constants'

interface UserCustomDropDownProps {
  onClick?: () => void
  onClose?: () => void
}

const UserCustomDropDown = (props: UserCustomDropDownProps) => {
  const { onClick, onClose } = props || {}

  const dispatch = useDispatch()

  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

  const { listValue } = useSelector((state: RootState) => state.context)

  //close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const onSelectValue = (index: number) => {
    setSelectedIndex(index)
    onClick && onClick()
    dispatch(ON_LIST_CHANGE(USER_DROPDOWN_OPTIONS[index].value))
    console.log(listValue)
  }
  return (
    <React.Fragment>
      <Paper className="user-dropdown" ref={dropdownRef}>
        {USER_DROPDOWN_OPTIONS.map((option, index) => (
          <Box
            mt={1}
            width={166}
            key={index}
            borderRadius="14px"
            onClick={() => onSelectValue(index)}
            bgcolor={index === selectedIndex ? COLORS.magenta : ''}
            sx={{
              cursor: 'pointer',
            }}
          >
            <Typography
              textAlign="center"
              fontSize={{ xs: 14, md: 20 }}
              fontWeight={index === selectedIndex ? 700 : 400}
              fontFamily={index === selectedIndex ? FONTS.LATO : FONTS.DMSANS}
            >
              {option.label}
            </Typography>
          </Box>
        ))}
      </Paper>
    </React.Fragment>
  )
}

export default UserCustomDropDown
