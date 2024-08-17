import Login from '@/components/Login'
import { GetServerSideProps } from 'next';
// import { setCookie } from 'cookies-next';
import React from 'react'
import { cookies } from 'next/headers';
import { Box } from '@mui/material';
function LoginPage() {
  return (
    <Box component={'div'} sx={{paddingTop:'30px'}}>
      <Login />
    </Box>
  );
};

export default LoginPage;
