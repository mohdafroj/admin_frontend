import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { colors } from '@/utils/colors';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export interface CandidateCardProps {
 
  trend: 'up' | 'down';
  sx?: SxProps;
  color: string;
  title:string;
  count:number;
}

export function CandidateCard({  trend, sx,  title, count, color,  }: CandidateCardProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

  return (
    <Card sx={sx} >
      <CardContent  >
        <Stack spacing={1}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={1}>
            <Stack spacing={1}>
              <Typography color={color} sx={{fontSize:'18px'}}>
                {title}
              </Typography>
              <Typography color={color} variant="h4">{count}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: `${color}`, height: '56px', width: '56px' }}>
              <UsersIcon fontSize="26px" />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
