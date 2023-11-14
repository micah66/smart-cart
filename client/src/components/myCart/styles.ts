import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'auto',
}))

export default StyledBox
