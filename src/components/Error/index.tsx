 import { Card, Typography } from '@mui/material'
import React from 'react'
 
 export default function Error() {
   return (
     <Card sx={{
        display:'flex',
        justifyContent:'center'
     }}>
        <Typography variant='h4' sx={{color:'#0f0f53dd'}}>Please provide a valid OTR ID</Typography>
     </Card>
   )
 }
 