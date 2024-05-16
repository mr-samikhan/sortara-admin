import React from 'react'
import { COLORS } from '@vgl/constants'
import { IModerators } from '@vgl/types'
import { NoRecordFound } from '@vgl/components'
import { Box, Link, Typography } from '@mui/material'

interface ViewInActiveModalProps {
  onClose: () => void
  data: IModerators[] | undefined
}

const ViewInActiveModal = (props: ViewInActiveModalProps) => {
  const { onClose, data } = props
  return (
    <React.Fragment>
      <Box width="100%">
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
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
          <NoRecordFound data={data} />
          {data?.map((item, index) => (
            <Box
              mt={1}
              m="auto"
              width={352}
              key={index}
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
                      {item.name}
                    </Typography>
                    <Typography
                      textAlign="start"
                      variant="body2"
                      fontWeight={400}
                      color="#4D4D4D"
                    >
                      {item.role}
                    </Typography>
                    <Typography
                      textAlign="start"
                      fontSize={18}
                      fontWeight={400}
                    >
                      {item.email}
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
              {/* <Typography
                width="100%"
                variant="body2"
                fontWeight={400}
                textAlign="start"
              >
                {item.reason}
              </Typography> */}
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
                  {item.reason}
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
