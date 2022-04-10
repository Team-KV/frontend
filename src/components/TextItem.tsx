import { Box, Typography } from '@mui/material'
import { t } from 'i18next'
const TextItem = ({name, value}: {name: string, value:string | null | undefined}) => {
  return (
    <Box textAlign={'left'} mt={3}>
      <Typography color={'silver'} fontWeight={'bold'} fontSize={'small'}>{t(name)}:</Typography>
      <Typography>{value ? value : ''}</Typography>
    </Box>
  )
}

export default TextItem;