import { Box, Divider, Typography } from '@mui/material'
import React from 'react'



const CardTitle = ({text}: {text: string}) => {
  return (
    <>
      <Typography variant='h5' fontWeight={500} >{text}</Typography>
      <Divider sx={{ marginTop: 2 }}/>
    </>
  )
}

export default CardTitle