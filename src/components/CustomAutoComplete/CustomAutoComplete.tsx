import * as React from 'react'
import Box from '@mui/material/Box'
import { COLORS } from '@vgl/constants'
import Popper from '@mui/material/Popper'
import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { TextField, Typography } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Autocomplete, {
  autocompleteClasses,
  AutocompleteCloseReason,
} from '@mui/material/Autocomplete'

interface CustomAutoCompleteProps {
  methods?: any
  name?: string
  title?: string | undefined
  error?: boolean | undefined
  helperText?: string | undefined
  placeholder?: string | undefined
}

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: COLORS.white,
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      fontSize: 20,
      fontWeight: 400,
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${' #eaecef'}`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}))

function PopperComponent(props: any) {
  return <StyledAutocompletePopper {...props} />
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  width: 610,
  fontSize: 13,
  borderRadius: 14,
  color: '#24292e',
  zIndex: theme.zIndex.modal,
  backgroundColor: COLORS.white,
  marginTop: '10px !important',
  marginBottom: '10px !important',
  border: `1px solid ${'#e1e4e8'}`,
  boxShadow: `0 8px 24px ${'rgba(149, 157, 165, 0.2)'}`,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  '& input': {
    height: 34,
    padding: 8,
    fontSize: 20,
    borderRadius: 50,
    border: `1px solid ${'#eaecef'}`,
    backgroundColor: COLORS.background,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#0366d6',
      boxShadow: `0px 0px 0px 3px ${'rgba(3, 102, 214, 0.3)'}`,
    },
    '&::placeholder': {
      fontWeight: 400,
      color: COLORS.black.main,
    },
  },
}))

export default function CustomAutoComplete(props: CustomAutoCompleteProps) {
  const { title, placeholder, methods, name, ...rest } = props

  const [value, setValue] = React.useState<string>('')
  const [pendingValue, setPendingValue] = React.useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setValue(pendingValue)
    if (anchorEl) {
      anchorEl.focus()
    }
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'id' : undefined

  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }}>
        <TextField
          {...rest}
          fullWidth
          value={pendingValue}
          aria-describedby={id}
          onClick={handleClick}
          placeholder={placeholder || 'Location'}
        />
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Box p={2} width="100%">
            <Typography
              variant="body2"
              textAlign="center"
              color={COLORS.primary.dark}
            >
              {title || 'Country'}
            </Typography>
            <Autocomplete
              open
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason
              ) => {
                console.log(event)
                if (reason === 'escape') {
                  handleClose()
                }
              }}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  ((event as React.KeyboardEvent).key === 'Backspace' ||
                    (event as React.KeyboardEvent).key === 'Delete') &&
                  reason === 'removeOption'
                ) {
                  return
                }
                methods.setValue(name, newValue?.label)
                setPendingValue(newValue?.label || '')
              }}
              renderTags={() => null}
              PopperComponent={PopperComponent}
              noOptionsText="No Result Found"
              renderOption={(props, option) => (
                <li
                  {...props}
                  style={{
                    border: 'none',
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      px: 2,
                      '& span': {
                        color: '#586069',
                      },
                    }}
                  >
                    {option.label}
                  </Box>
                </li>
              )}
              options={countries}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <StyledInput
                  autoFocus
                  placeholder="Search..."
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                />
              )}
            />
          </Box>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  )
}

const countries = [{ label: 'United States' }, { label: 'United Kingdom' }]
