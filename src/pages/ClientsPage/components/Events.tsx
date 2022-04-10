import { Card } from '@mui/material'
import CardTitle from 'components/CardTitle'
import { t } from 'i18next'
import React from 'react'

const Events = () => {
  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('events')}/>
    </Card>
  )
}

export default Events