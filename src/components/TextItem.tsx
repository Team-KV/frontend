import { Box, Typography } from '@mui/material'
const TextItem = ({label, value}: {label: string, value:string | null | undefined}) => {
  return (
    <Box textAlign={'left'} mt={3}>
      <Typography color={'silver'} fontWeight={'bold'} fontSize={'small'}>{label}:</Typography>
      <Typography>{value ? value : ''}</Typography>
    </Box>
  )
}

export default TextItem;