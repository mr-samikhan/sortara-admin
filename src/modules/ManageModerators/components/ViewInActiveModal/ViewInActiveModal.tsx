import React from 'react'
import { COLORS } from '@vgl/constants'
import { Box, Link, Typography } from '@mui/material'

interface ViewInActiveModalProps {
  onClose: () => void
}

const ViewInActiveModal = (props: ViewInActiveModalProps) => {
  const { onClose } = props
  return (
    <React.Fragment>
      <Box width="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="body2" fontWeight={400}>
            In-Active Admins
          </Typography>
          <Box
            fontSize={20}
            underline="none"
            component={Link}
            fontWeight={700}
            onClick={onClose}
            color={COLORS.primary.dark}
          >
            Collapse
          </Box>
        </Box>
        <Box maxHeight={450} overflow="auto">
          {[0, 1, 2, 3].map((index) => (
            <Box
              key={index}
              mt={1}
              m="auto"
              width={352}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Box
                width={309}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box display="flex" gap={2} alignItems="center">
                  <Box
                    component="img"
                    src="/assets/images/profile-image.svg"
                    width={58}
                    height={58}
                  />
                  <Box>
                    <Typography textAlign="start" variant="body2">
                      Emily Johnson
                    </Typography>
                    <Typography
                      textAlign="start"
                      variant="body2"
                      fontWeight={400}
                      color="#4D4D4D"
                    >
                      Network Administrator
                    </Typography>
                    <Typography
                      textAlign="start"
                      fontSize={18}
                      fontWeight={400}
                    >
                      email@example.com
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                my={1}
                width="100%"
                variant="body2"
                fontWeight={400}
                textAlign="start"
              >
                Note for account termination:
              </Typography>
              <Box
                width={352}
                borderRadius="4px"
                padding="18px 20px"
                display="flex"
                alignItems="center"
                border={`1px solid ${COLORS.grey.main}`}
              >
                <Typography
                  variant="h6"
                  fontWeight={400}
                  color={COLORS.grey.dark}
                >
                  Contract ended on 12/12/2023
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default ViewInActiveModal
