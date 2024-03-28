import React from 'react'
import { FONTS } from '@vgl/constants'
import { Avatar, Box, Divider, Paper, Typography } from '@mui/material'

interface CommentsAndReactionsProps {}

const CommentsAndReactions = (props: CommentsAndReactionsProps) => {
  const {} = props || {}

  return (
    <React.Fragment>
      <Box my={{ md: 10, xs: 0 }} p={4}>
        <Typography
          fontWeight={900}
          fontFamily={FONTS.RECOLETA}
          fontSize={{ md: 28, xs: 20 }}
        >
          Reactions
        </Typography>
        <Box display="flex" gap={3} my={2}>
          <Paper className="reactions">❤️ 1</Paper>
          <Paper className="reactions">💕 4</Paper>
        </Box>
        {[0, 1].map((index) => (
          <React.Fragment key={index}>
            <Box
              display="flex"
              justifyContent="space-between"
              my={2}
              alignItems="center"
            >
              <Box display="flex" gap={4} alignItems="center">
                <Box
                  alt="user"
                  width={53}
                  height={53}
                  component="img"
                  src="/assets/images/user.svg"
                />
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    Jane L.
                  </Typography>
                  <Typography variant="h4">@theogjane</Typography>
                </Box>
              </Box>
              <Box>
                <Paper className="reactions">{index === 0 ? '💌' : '💕'}</Paper>
              </Box>
            </Box>
          </React.Fragment>
        ))}
        <Box mt={4}>
          <Typography
            fontSize={{ md: 28, xs: 20 }}
            fontFamily={FONTS.RECOLETA}
            fontWeight={900}
          >
            Comments
          </Typography>
          {[0, 1, 2].map((index) => (
            <React.Fragment key={index}>
              <Box
                my={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" gap={2}>
                  <Avatar
                    src="/assets/images/user.svg"
                    sx={{ width: 30, height: 30 }}
                  />
                  <Box>
                    <Typography variant="h4" fontFamily={FONTS.DMSANS}>
                      Samuel L.
                    </Typography>
                    <Typography variant="h4" fontFamily={FONTS.DMSANS}>
                      1:00 PM
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" gap={2}>
                  <Typography variant="h4" fontFamily={FONTS.DMSANS}>
                    1 Like
                  </Typography>
                  <Box
                    alt="heart"
                    width={24}
                    height={24}
                    component="img"
                    src="/assets/icons/love.svg"
                  />
                </Box>
              </Box>
              <Typography my={1} variant="h4" fontFamily={FONTS.DMSANS}>
                Lorem ipsum dolor sit amet consect. Sed adipiscing
              </Typography>
              {index === 2 && (
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Divider sx={{ width: 50 }} />
                  <Typography variant="h4" ml={2}>
                    2 replies
                  </Typography>
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default CommentsAndReactions
