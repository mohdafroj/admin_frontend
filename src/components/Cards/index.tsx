import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import { colors } from '@/utils/colors';
;

export default function Cards({title, count}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={title}  sx={{backgroundColor: colors.light, color: '#fff' , padding:'10px', display:'flex', justifySelf:'center'}}/>
      <CardContent>
        <Typography sx={{display:"flex", justifyContent:"center"}} gutterBottom variant="h5" >
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}
