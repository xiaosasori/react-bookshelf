import { Link as RouterLink } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import * as colors from '@/styles/colors'

const Link = styled(RouterLink)({
  'color': colors.indigo,
  ':hover': {
    color: colors.indigoDarken10,
    textDecoration: 'underline',
  },
})

export default Link
