import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 56px)',
}))

export default StyledBox
